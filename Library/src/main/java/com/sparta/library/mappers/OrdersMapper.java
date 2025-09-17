package com.sparta.library.mappers;


import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.model.Orders;

public interface OrdersMapper {
    Orders toOrder(CreateOrderDto createOrdersDto);
    OrdersDto toOrdersDto(Orders orders);
}
