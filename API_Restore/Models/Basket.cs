namespace API_Restore.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> BasketItems { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (BasketItems.All(item => item.ProductId != product.Id))
            {
                BasketItems.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = BasketItems.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity) 
        {
            var item = BasketItems.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) BasketItems.Remove(item);

        }
    }
}
