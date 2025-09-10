package com.sparta.library;

import com.sparta.library.entities.Author;
import com.sparta.library.entities.Book;
import com.sparta.library.repositories.AuthorRepository;
import com.sparta.library.repositories.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration // tells spring this class contains beans
@ComponentScan(basePackages = "com.sparta.library.repositories") // scans this package for repositories
public class DataLoader {

    public CommandLineRunner loadData(AuthorRepository authorRepository, BookRepository bookRepository) { // special type of interface that executes code after the app context (incl. beans) has been fully loaded
    return args -> {
        if(authorRepository.count()==0 && bookRepository.count()==0) {
            Author author1 = new Author("JRR Tolkien");
            Author author2 = new Author("Douglas Adams");
            authorRepository.save(author1);
            authorRepository.save(author2);

            Book book1 = new Book("LOTR: Fellowship of the Ring", author1);
            Book book2 = new Book("Hitchhiker's Guide to the Galaxy", author2);
            bookRepository.save(book1);
            bookRepository.save(book2);

            System.out.println("Seed data added");
        }
    };
    }
}
