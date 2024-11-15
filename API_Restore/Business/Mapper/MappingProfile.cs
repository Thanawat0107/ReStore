using API_Restore.Business.RequestHelpers;
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

            // Mapping ระหว่าง PageList<Product> และ PageList<ProductDTO>
            CreateMap(typeof(PageList<>), typeof(PageList<>))
                .ConvertUsing(typeof(PageListConverter<,>)); // ใช้ Converter ในการจัดการ generic types
        }

        public class PageListConverter<TSource, TDestination> : ITypeConverter<PageList<TSource>, PageList<TDestination>>
        {
            public PageList<TDestination> Convert(PageList<TSource> source, PageList<TDestination> destination, ResolutionContext context)
            {
                // Map ระหว่าง PageList items
                var mappedItems = context.Mapper.Map<List<TDestination>>(source);

                // สร้าง PageList ใหม่พร้อมข้อมูลที่ถูก map แล้ว
                return new PageList<TDestination>(mappedItems, source.MetaData.TotalCount, source.MetaData.CurrentPage, source.MetaData.PageSize);
            }
        }
    }
}
