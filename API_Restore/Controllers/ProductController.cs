using API_Restore.Business.Repository.IRepository;
using API_Restore.Business.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace API_Restore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] ProductParams? param)
        {
            return Ok(await _productRepository.GetAll(param));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _productRepository.GetById(id);

            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters() 
        {
            return Ok(await _productRepository.GetFilters());
        }
    }
}
