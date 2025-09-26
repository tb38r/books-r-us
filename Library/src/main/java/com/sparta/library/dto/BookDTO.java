package com.sparta.library.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO {
    private int id;
    private String title;
    private String author;
    private int quantity;
    private String genre;
    private double price;
    private String olid;
    private String coverUrl;
}
