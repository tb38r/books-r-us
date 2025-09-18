package com.sparta.library.mappers;


import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.model.OrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrdersMapper {
    OrderItem toOrder(CreateOrderDto createOrdersDto);
    OrdersDto toOrdersDto(OrderItem orders);
}
