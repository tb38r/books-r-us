package com.sparta.library;

import com.sparta.library.entities.Author;
import com.sparta.library.entities.Book;
import com.sparta.library.entities.User;
import com.sparta.library.entities.Orders;
import com.sparta.library.repositories.AuthorRepository;
import com.sparta.library.repositories.BookRepository;
import com.sparta.library.repositories.OrdersRepository;
import com.sparta.library.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration // tells spring this class contains beans
@ComponentScan(basePackages = "com.sparta.library.repositories") // scans this package for repositories
public class DataLoader {


    @Bean
    @Transactional
    public CommandLineRunner loadData(AuthorRepository authorRepository, BookRepository bookRepository, UserRepository userRepository, OrdersRepository ordersRepository) { // special type of interface that executes code after the app context (incl. beans) has been fully loaded
    return args -> {
        if(authorRepository.count()==0 && bookRepository.count()==0) {
            var author1 = Author.builder().id(1).firstName("JRR").lastName("Tolkien").build();
            var author2 = Author.builder().id(2).firstName("Douglas").lastName("Adams").build();
            var book1 = Book.builder().id(1).title("LOTR: Fellowship of the Ring")
                    .genre("Fantasy").price(12.23).quantity(20).build();
            var book2 = Book.builder().id(2).title("Hitchhiker's Guide to the Galaxy")
                    .genre("Fantasy").price(1.23).quantity(30).build();
            author1.addBook(book1);
            author2.addBook(book2);

            var user1 = User.builder().id(1).firstName("Jeff").lastName("Bezos").email("Iexploitworkers@amazon.com").password("Greed12345").build();
            var order1 = Orders.builder().id(1).build();
            user1.addOrder(order1);
            book1.addOrder(order1);
            authorRepository.save(author1);
            authorRepository.save(author2);
            bookRepository.save(book1);
            bookRepository.save(book2);
            userRepository.save(user1);
            ordersRepository.save(order1);
            System.out.println("Seed data added");
        }
    };
    }
}
