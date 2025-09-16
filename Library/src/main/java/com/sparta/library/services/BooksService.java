package com.sparta.library.services;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.dto.BookMapper;
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
        List<BookDTO> bookDTOs = new ArrayList<>();
        for (Book book : books) {
            bookDTOs.add(bookMapper.bookDTO(book));
        }
        return bookDTOs;
    }

    public BookDTO getBookById(int id) {
        Book book = bookRepository.findById(id).orElse(null);
        return bookMapper.bookDTO(book);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        Book entity = bookMapper.toBook(bookDTO);
        Book saved = bookRepository.save(entity);
        return bookMapper.bookDTO(saved);
    }

    public BookDTO updateBook(BookDTO bookDTO) {
        Integer id = Integer.valueOf(bookDTO.getBookId());
        if (!bookRepository.existsById(id)) {
            throw new NoSuchElementException("Book with ID " + id + " does not exist");
        }
        Book entity = bookMapper.toBook(bookDTO);
        Book saved = bookRepository.save(entity);
        return bookMapper.bookDTO(saved);
    }

    public boolean deleteBook(int id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
