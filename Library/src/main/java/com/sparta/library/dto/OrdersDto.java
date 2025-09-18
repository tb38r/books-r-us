package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class OrdersDto {
    private LocalDateTime timeOfPurchase;
    private double totalPrice;
    private Integer userId;
    private List<BookDTO> books = new ArrayList<>();
}
