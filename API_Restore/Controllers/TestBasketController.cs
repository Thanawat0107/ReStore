using API_Restore.Business.Repository.IRepository;
using API_Restore.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Restore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestBasketController : ControllerBase
    {
        private readonly IBasketRepository _basket;
        public TestBasketController(IBasketRepository basket)
        {
            _basket = basket;
        }

        //[HttpGet]
        //public async Task<IActionResult> Get() 
        //{
        //    var basket = await _basket.Get();
        //    if (basket == null) return NotFound();

        //    return Ok(basket);
        //}

        //[HttpPost] 
        //public async Task<IActionResult> Add(int productId, int quantity)
        //{
        //    var basket = _basket.Get();
        //    if (basket == null) 
        //    {
        //        basket = _basket.Add();
        //    }

        //    var product = await _basket.GetProduct(productId);

        //    if (product == null) return NotFound();

        //    _basket
        //}
    }
}
