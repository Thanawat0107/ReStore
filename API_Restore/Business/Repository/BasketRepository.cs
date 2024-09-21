using API_Restore.Business.Repository.IRepository;
using API_Restore.Data;
using API_Restore.ModelDTOs;
using API_Restore.Models;
using AutoMapper;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API_Restore.Business.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StoreContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IMapper _mapper;
        public BasketRepository(StoreContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }
        // ดึงข้อมูลตะกร้าปัจจุบัน
    //    public async Task<BasketDTO> Get()
    //    {
    //        return await Find();
    //    }
    //    // สร้างตะกร้าใหม่
    //    public async Task<BasketDTO> Add()
    //    {
    //        var buyerId = Guid.NewGuid().ToString();
    //        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
    //        _httpContextAccessor.HttpContext.Response.Cookies.Append("buyerId", buyerId, cookieOptions);

    //        var basket = new Basket { BuyerId = buyerId };
    //        _context.Baskets.Add(basket);

    //        var result = await _context.SaveChangesAsync();

    //        if (result > 0)
    //        {
    //            return _mapper.Map<Basket, BasketDTO>(basket);
    //        }

    //        return null;
    //    }

    //    public Task<BasketDTO> Delete(int productId, int quantity)
    //    {
    //        throw new NotImplementedException();
    //    }
            
    //    public async Task<BasketDTO> Find()
    //    {
    //        var buyerId = _httpContextAccessor.HttpContext.Request.Cookies["buyerId"];

    //        if (string.IsNullOrEmpty(buyerId))
    //        {
    //            return null;
    //        }

    //        var obj = await _context.Baskets
    //            .Include(b => b.BasketItems)
    //            .ThenInclude(p => p.Product)
    //            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);

    //        return _mapper.Map<Basket, BasketDTO>(obj);
    //    }

    //    public async Task<ProductDTO> GetProduct(int productId)
    //    {
    //        var product = await _context.Products.FindAsync(productId);
    //        return product == null ? null : _mapper.Map<Product, ProductDTO>(product);
    //    }

    //    public async Task<bool> AddItem(ProductDTO product, int quantity)
    //    {
    //        var products = _mapper.Map<ProductDTO, Product>(product);
    //        var basket = await Find();

    //        if (basket == null) return false;

    //        var existingItem = basket.BasketItems.FirstOrDefault(item => item.ProductId == product.Id);
    //        if (existingItem == null)
    //        {
    //            basket.BasketItems.Add(new BasketItemDTO { Product = products, Quantity = quantity });
    //        }
    //        else
    //        {
    //            existingItem.Quantity += quantity;
    //        }

    //        var result = await _context.SaveChangesAsync();
    //        return result > 0;
    //    }

    //    public async Task<bool> DeleteItem(int productId, int quantity)
    //    {
    //        var basket = await Find();

    //        if (basket == null)
    //        {
    //            return false;
    //        }

    //        var item = basket.BasketItems.FirstOrDefault(i => i.ProductId == productId);
    //        if (item == null)
    //        {
    //            return false;
    //        }

    //        item.Quantity -= quantity;
    //        if (item.Quantity <= 0)
    //        {
    //            basket.BasketItems.Remove(item);
    //        }

    //        var result = await _context.SaveChangesAsync();
    //        return result > 0;
    //    }
    }
}
