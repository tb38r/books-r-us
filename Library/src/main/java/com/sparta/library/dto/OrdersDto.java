package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class OrdersDto {
    private LocalDateTime timeOfPurchase;
    private Integer orderId;
    private BookDTO book;
    private int quantityInBasket;
}
