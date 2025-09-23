package com.sparta.library.dto;

import lombok.Data;

@Data
public class BookDTO {
    private int id;
    private String title;
    private String author;
    private int quantity;
    private String genre;
    private double price;

}
