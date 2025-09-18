package com.sparta.library.dto;

import lombok.Data;

@Data
public class AddBookDto {
    private String title;
    private int quantity;
    private String genre;
    private double price;
    private AddAuthorDto author;
}
