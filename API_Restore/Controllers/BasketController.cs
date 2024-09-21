using API_Restore.Data;
using API_Restore.ModelDTOs;
using API_Restore.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Restore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        public BasketController(StoreContext storeContext)
        { 
            _storeContext = storeContext;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return Ok(MapBasketToDto(basket));
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();

            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null) return NotFound();

            basket.AddItem(product, quantity);
                
            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        }

        //Method
        private async Task<Basket> RetrieveBasket()
        {
            var buyerId = Request.Cookies["buyerId"];

            if (string.IsNullOrEmpty(buyerId))
            {
                return null;
            }

            return await _storeContext.Baskets
                  .Include(b => b.BasketItems)
                  .ThenInclude(p => p.Product)
                  .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        //Method
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookOptions);
            var basket = new Basket { BuyerId = buyerId };
            _storeContext.Baskets.Add(basket);

            return basket;
        }

        //Method
        private BasketDTO MapBasketToDto(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                BasketItems = basket.BasketItems.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }
    }
}
