using AutoMapper;
using Ecom.Core.DTO;
using Ecom.Core.Entities.Order;
using Ecom.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> create(OrderDTO orderDTO)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var result = await _orderService.CreateOrdersAsync(orderDTO, email!);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> getOrders()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var orders = await _orderService.GetAllOrdersForUserAsync(email!);

            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDTO>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getOrderById(int id)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var order = await _orderService.GetOrderByIdAsync(id,email!);
            return Ok(_mapper.Map<OrderToReturnDTO>(order));
        }

        [HttpGet("delivary")]
        public async Task<ActionResult> getDelivery()
        {
       
            var Delivery = await _orderService.GetDeliveryMethodAsync();
            return Ok(Delivery);
        }


    }
}
