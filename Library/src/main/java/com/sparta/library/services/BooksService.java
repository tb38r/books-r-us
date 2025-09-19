package com.sparta.library.services;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.mappers.BookMapper;
import com.sparta.library.model.Book;
import com.sparta.library.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BooksService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    public BooksService(BookRepository bookRepository, BookMapper bookMapper) {
        if(bookRepository == null) throw new IllegalArgumentException("BookRepository cannot be null");
        if(bookMapper == null) throw new IllegalArgumentException("BookMapper cannot be null");
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }
     public List<BookDTO> getAllBooks() {
         List<Book> books = bookRepository.findAll();
         return books.stream().map(bookMapper::bookDTO).toList();
     }
}
