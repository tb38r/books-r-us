package com.sparta.library.services;

import com.sparta.library.dto.AddBookDto;
import com.sparta.library.dto.BookDTO;
import com.sparta.library.mappers.AuthorMapper;
import com.sparta.library.mappers.BookMapper;
import com.sparta.library.model.Author;
import com.sparta.library.model.Book;
import com.sparta.library.repositories.AuthorRepository;
import com.sparta.library.repositories.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BooksService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final AuthorMapper authorMapper;
    private final AuthorRepository authorRepository;

    public BooksService(BookRepository bookRepository, BookMapper bookMapper, AuthorMapper authorMapper, AuthorRepository authorRepository) {
        if(bookRepository == null) throw new IllegalArgumentException("BookRepository cannot be null");
        if(bookMapper == null) throw new IllegalArgumentException("BookMapper cannot be null");
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.authorMapper = authorMapper;
        this.authorRepository = authorRepository;
    }
     public List<BookDTO> getAllBooks() {
         List<Book> books = bookRepository.findAll();
         return books.stream().map(bookMapper::bookDTO).toList();
     }
     @Transactional
     public void createBook(AddBookDto dto) {
        List<Book> matches = bookRepository.findByTitleContainingIgnoreCase(dto.getTitle());

         if (matches.isEmpty()) {
             Book book = new Book(
                     dto.getTitle(),
                     dto.getAuthor(),
                     dto.getPrice(),
                     dto.getQuantity(),
                     dto.getGenre(),
                     dto.getOlid(),
                     dto.getCoverUrl()
             );
             bookRepository.save(book);
         }

     }
}
