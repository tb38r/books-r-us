package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateOrderDto {
    private LocalDateTime timeOfPurchase;
    private int UserId;
    private List<BookDTO> books = new ArrayList<BookDTO>();
}
