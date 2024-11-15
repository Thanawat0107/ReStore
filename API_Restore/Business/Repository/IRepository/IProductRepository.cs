using API_Restore.Business.RequestHelpers;
using API_Restore.ModelDTOs;

namespace API_Restore.Business.Repository.IRepository
{
    public interface IProductRepository
    {
        public Task<PageList<ProductDTO>> GetAll(ProductParams param);
        public Task<ProductDTO> GetById(int id);
        public Task<object> GetFilters();
    }
}
