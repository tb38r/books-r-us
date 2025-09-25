package com.sparta.library.dto;

import io.swagger.v3.oas.annotations.info.Info;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddBookDto {
    private String title;
    private int quantity;
    private String genre;
    private double price;
    private String author;
    private String olid;
    private String coverUrl;


}
