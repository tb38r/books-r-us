package com.sparta.library;

import com.sparta.library.entities.Author;
import com.sparta.library.repositories.AuthorRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class LibraryApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(LibraryApplication.class, args);

        AuthorRepository authorRepository = context.getBean(AuthorRepository.class);
        List<Author> authors = authorRepository.findAll();
        for (Author author : authors) {
            System.out.println(author.getFullName());
        }
    }

}
