using API_Restore.ModelDTOs;
using API_Restore.Models;
using AutoMapper;

namespace API_Restore.Business.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
            //CreateMap<Basket, BasketDTO>().ReverseMap();
            //CreateMap<BasketItem, BasketItemDTO>().ReverseMap();
        }
    }
}
