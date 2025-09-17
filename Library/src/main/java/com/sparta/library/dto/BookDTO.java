package com.sparta.library.dto;

import lombok.Data;

@Data
public class BookDTO {
    private String bookId;
    private String bookName;
    //private AuthorDTO author;
    private int quantity;
    private String genre;
    private double price;
    /*
    public BookDTO(String bookId, String bookName, AuthorDTO author) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.author = author;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }
     */

}
