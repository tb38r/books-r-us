package com.sparta.library.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @CreationTimestamp
    @Column(name = "order-date", nullable = false, updatable = false)
    private LocalDateTime timeOfPurchase;

    public Orders() {}

    public Orders(Integer id, Book book, User user, LocalDateTime timeOfPurchase) {
        this.id = id;
        this.book = book;
        this.user = user;
        this.timeOfPurchase = timeOfPurchase;
    }

    public Orders(Book book, User user) {
        this.book = book;
        this.user = user;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getTimeOfPurchase() {
        return timeOfPurchase;
    }

    public void setTimeOfPurchase(LocalDateTime timeOfPurchase) {
        this.timeOfPurchase = timeOfPurchase;
    }
}
