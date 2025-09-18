package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CreateOrderDto {
    private LocalDateTime timeOfPurchase;
    private int UserId;
    private List<BookDTO> books = new ArrayList<>();
}
