using API_Restore.Models;

namespace API_Restore.ModelDTOs
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDTO> BasketItems { get; set; }

    }
}
