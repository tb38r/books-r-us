package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrdersDto {
    private Integer id;
    private LocalDateTime timeOfPurchase;
    private double totalPrice;
    private Integer userId;
}
