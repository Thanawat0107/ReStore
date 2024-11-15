using API_Restore.Business.Extensions;
using API_Restore.Business.Repository.IRepository;
using API_Restore.Business.RequestHelpers;
using API_Restore.Data;
using API_Restore.ModelDTOs;
using API_Restore.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API_Restore.Business.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor; // เพิ่ม IHttpContextAccessor

        public ProductRepository(StoreContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor; // กำหนดค่า IHttpContextAccessor
        }
        public async Task<PageList<ProductDTO>> GetAll(ProductParams param)
        {
            var query = _dbContext.Products
                .Sort(param.OrderBy)
                .Search(param.SearchTerm)
                .Filter(param.Brands, param.Types)
                .AsQueryable(); // สร้าง query จาก Products

            var products = await PageList<Product>.ToPagedList(
                query, param.PageNumber, param.PageSize); // ดึงข้อมูลจากฐานข้อมูลหลังจากเรียงลำดับแล้ว

            // เพิ่ม header สำหรับ pagination
            var response = _httpContextAccessor.HttpContext.Response; // เข้าถึง HttpContext
            response.AddPaginationHeader(products.MetaData);

            return _mapper.Map<PageList<Product>, PageList<ProductDTO>>(products);
        }

        public async Task<ProductDTO> GetById(int id)
        {
            var obj = await _dbContext.Products.FirstOrDefaultAsync (p => p.Id == id);
            if (obj != null)
            {
                return _mapper.Map<Product, ProductDTO>(obj);
            }
            return null;
        }

        public async Task<object> GetFilters()
        {
            var brands = await _dbContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _dbContext.Products.Select(p => p.Type).Distinct().ToListAsync();

            return new { brands, types };
        }
    }
}
