package com.sparta.library.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CreateOrderDto {
    private int bookId;
    private int userId;
    private int quantity;
}
