using API_Restore.ModelDTOs;

namespace API_Restore.Business.Repository.IRepository
{
    public interface IProductRepository
    {
        public Task<IEnumerable<ProductDTO>> GetAll();
        public Task<ProductDTO> GetById(int id);
    }
}
