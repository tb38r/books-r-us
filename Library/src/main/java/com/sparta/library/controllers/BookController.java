package com.sparta.library.controllers;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.services.BooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    private final BooksService booksService;

    public BookController(BooksService booksService) {
        this.booksService = booksService;
    }
    @GetMapping
    public ResponseEntity<Iterable<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(booksService.getAllBooks());
    }
}
