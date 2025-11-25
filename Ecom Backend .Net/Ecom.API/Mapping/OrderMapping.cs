using AutoMapper;
using Ecom.Core.DTO;
using Ecom.Core.Entities;
using Ecom.Core.Entities.Order;

namespace Ecom.API.Mapping
{
    public class OrderMapping : Profile
    {
        public OrderMapping()
        {
            CreateMap<ShippingAddress, ShipAddressDTO>().ReverseMap();
            CreateMap<Orders, OrderToReturnDTO>()
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.SubTotal + src.deliveryMethod.Price))
                .ForMember(dest => dest.deliveryMethod, opt => opt.MapFrom(src => src.deliveryMethod.Name))
                .ForMember(dest => dest.status, opt => opt.MapFrom(src => src.status.ToString())).ReverseMap();
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
            CreateMap<ShippingAddress, Address>().ReverseMap();
            CreateMap<ShipAddressDTO, Address>().ReverseMap();


        }
    }
}
