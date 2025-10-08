package com.sparta.library.controllers;

import com.sparta.library.dto.AddBookDto;
import com.sparta.library.dto.BookDTO;
import com.sparta.library.services.BooksService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BooksService booksService;

    public BookController(BooksService booksService) {
        this.booksService = booksService;
    }
    @GetMapping
    public ResponseEntity<Iterable<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(booksService.getAllBooks());
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createBook(@Valid @RequestBody AddBookDto dto) {
        booksService.createBook(dto);
        return ResponseEntity.ok().build();
    }
}
