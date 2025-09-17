package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateOrderDto {
    private LocalDateTime timeOfPurchase;
    private int UserId;
    private int BookId;
    private int quantity;
}
