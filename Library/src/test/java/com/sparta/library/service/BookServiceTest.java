package com.sparta.library.service;

import com.sparta.library.dto.AddBookDto;
import com.sparta.library.dto.BookDTO;
import com.sparta.library.mappers.BookMapper;
import com.sparta.library.model.Book;
import com.sparta.library.repositories.BookRepository;
import com.sparta.library.services.BooksService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {
    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookMapper bookMapper;

    @InjectMocks
    private BooksService booksService;


    @Captor
    private ArgumentCaptor<Book> bookCaptor;

    @Test
    void getAllBooks_shouldReturnCollectionOfAllAvailableBooks(){
        List<Book> mockBooks = List.of(
                new Book( 1,"Clean Code", "Robert C. Martin", 29.99,10, "Programming","OL123", "cover1.jpg"),
                new Book(2,"Effective Java", "Joshua Bloch", 34.99,5, "Programming", "OL456", "cover2.jpg")
        );

        BookDTO expected1 = new BookDTO(1,"Clean Code", "Robert C. Martin", 10,  "Programming",29.99, "OL123", "cover1.jpg");
        BookDTO expected2 = new BookDTO(2, "Effective Java", "Joshua Bloch", 5, "Programming", 34.99, "OL456", "cover2.jpg");

        when(bookRepository.findAll()).thenReturn(mockBooks);

        when(bookMapper.bookDTO(any(Book.class))).thenAnswer(invocation -> {
            Book book = invocation.getArgument(0);
            return new BookDTO(
                    book.getId(),
                    book.getTitle(),
                    book.getAuthor(),
                    book.getQuantity(),
                    book.getGenre(),
                    book.getPrice(),
                    book.getOlid(),
                    book.getCoverUrl()
            );
        });



        List<BookDTO> result = booksService.getAllBooks();

        assertEquals(2, result.size());
        assertEquals("Clean Code", result.get(0).getTitle());
        assertEquals("Effective Java", result.get(1).getTitle());
        assertEquals(List.of(expected1, expected2), result);


    }

    @Test
    void createBook_shouldSaveBook_whenNoMatchExists() {
        AddBookDto dto = AddBookDto.builder()
                .title("Clean Code")
                .author("Robert C. Martin")
                .price(29.99)
                .quantity(10)
                .genre("Programming")
                .olid("OL123")
                .coverUrl("cover1.jpg")
                .build();

        when(bookRepository.findByTitleContainingIgnoreCase("Clean Code"))
                .thenReturn(List.of());

        booksService.createBook(dto);

        verify(bookRepository).save(bookCaptor.capture());
        Book savedBook = bookCaptor.getValue();

        assertEquals("Clean Code", savedBook.getTitle());
        assertEquals("Robert C. Martin", savedBook.getAuthor());
        assertEquals(10, savedBook.getQuantity());
        assertEquals("Programming", savedBook.getGenre());
        assertEquals("OL123", savedBook.getOlid());
        assertEquals("cover1.jpg", savedBook.getCoverUrl());
    }



}
