package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrdersDto {
    private LocalDateTime timeOfPurchase;
    private double totalPrice;
    private Integer userId;
    private List<BookDTO> books = new ArrayList<BookDTO>();
}
