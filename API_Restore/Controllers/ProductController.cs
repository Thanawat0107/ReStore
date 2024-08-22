using API_Restore.Data;
using API_Restore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Restore.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ProductController : BaseApiController
    {
        private readonly StoreContext _db;
        public ProductController(StoreContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            return Ok(await _db.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            return Ok(await _db.Products.FirstOrDefaultAsync(x => x.Id == id));
        }

    }
}
