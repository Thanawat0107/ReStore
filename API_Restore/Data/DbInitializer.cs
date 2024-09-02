using API_Restore.Models;

namespace API_Restore.Data
{
    public static class DbInitializer
    {
        public static void Initializer(StoreContext context)
        {
            if (context.Products.Any()) return;

            var path = "/images/products";

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Eco-Friendly Skateboard",
                    Description = "Made from recycled materials, this skateboard is perfect for the environmentally conscious rider.",
                    Price = 22000,
                    PictureUrl = $"{path}/EcoBoard-Boards1.jpg",
                    Brand = "EcoBoard",
                    Type = "Boards",
                    QuantityInStock = 150
                },
                new Product
                {
                    Name = "Bamboo Cruiser Board",
                    Description = "Smooth riding with a sleek bamboo finish, ideal for city cruising.",
                    Price = 18000,
                    PictureUrl = $"{path}/BambooBoard-Boards2.jpg",
                    Brand = "BambooBoard",
                    Type = "Boards",
                    QuantityInStock = 120
                },
                new Product
                {
                    Name = "Alpine Snowboard",
                    Description = "Designed for the toughest slopes, offering unparalleled control and speed.",
                    Price = 25000,
                    PictureUrl = $"{path}/AlpineSports-Boards3.jpg",
                    Brand = "AlpineSports",
                    Type = "Boards",
                    QuantityInStock = 80
                },
                new Product
                {
                    Name = "Urban Snapback Hat",
                    Description = "Stay stylish and cool with this versatile snapback, perfect for any urban setting.",
                    Price = 3000,
                    PictureUrl = $"{path}/UrbanWear-Hats1.jpg", 
                    Brand = "UrbanWear",
                    Type = "Hats",
                    QuantityInStock = 200
                },
                new Product
                {
                    Name = "Wool Beanie",
                    Description = "Keep warm in the winter with this comfortable wool beanie, available in multiple colors.",
                    Price = 5000,
                    PictureUrl = $"{path}/WinterStyle-Hats2.jpg",
                    Brand = "WinterStyle",
                    Type = "Hats",
                    QuantityInStock = 180
                },
                new Product
                {
                    Name = "Leather Gloves",
                    Description = "Premium leather gloves offering warmth and style, perfect for cold weather.",
                    Price = 8000,
                    PictureUrl = $"{path}/LuxGloves-Gloves1.jpg",
                    Brand = "LuxGloves",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Classic Hiking Boots",
                    Description = "Durable and comfortable, these boots are made for long hikes and outdoor adventures.",
                    Price = 30000,
                    PictureUrl = $"{path}/TrailMaster-Boots1.jpg",
                    Brand = "TrailMaster",
                    Type = "Boots",
                    QuantityInStock = 75
                },
                new Product
                {
                    Name = "Waterproof Trekking Boots",
                    Description = "Perfect for wet conditions, these waterproof boots ensure dry and safe trekking.",
                    Price = 32000,
                    PictureUrl = $"{path}/OutdoorPro-Boots2.jpg",
                    Brand = "OutdoorPro",
                    Type = "Boots",
                    QuantityInStock = 90
                },
                new Product
                {
                    Name = "Vintage Leather Backpack",
                    Description = "A stylish vintage leather backpack, perfect for everyday use or travel.",
                    Price = 15000,
                    PictureUrl = $"{path}/VintagePack-Accessories1.jpg",
                    Brand = "VintagePack",
                    Type = "Accessories",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Canvas Messenger Bag",
                    Description = "Durable and spacious, this canvas messenger bag is great for work or school.",
                    Price = 13000,
                    PictureUrl = $"{path}/UrbanGear-Accessories2.jpg",
                    Brand = "UrbanGear",
                    Type = "Accessories",
                    QuantityInStock = 60
                }
            };

            foreach (var item in products)
            {
                context.Products.Add(item);
            }

            context.SaveChanges();
        }
    }
}
