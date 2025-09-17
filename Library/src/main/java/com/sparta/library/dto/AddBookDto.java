package com.sparta.library.dto;

import lombok.Data;

@Data
public class AddBookDto {
    private String bookName;
    private int quantity;
    private String genre;
    private double price;
    private AddAuthorDto author;
}
