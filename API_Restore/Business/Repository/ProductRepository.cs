using API_Restore.Business.Repository.IRepository;
using API_Restore.Data;
using API_Restore.ModelDTOs;
using API_Restore.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API_Restore.Business.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _dbContext;
        private readonly IMapper _mapper;

        public ProductRepository(StoreContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ProductDTO>> GetAll()
        {
            return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>
                (await _dbContext.Products.ToListAsync());
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
    }
}
