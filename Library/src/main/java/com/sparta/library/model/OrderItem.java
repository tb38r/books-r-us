package com.sparta.library.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orderitems")
public class OrderItem { //I think this is actually a basket
    //Basket would contain quantity of the book the user wants to buy, the specific user buying the book
    //and the book the user is buying
    //when making the order - findall basket entities that have specific userID, then multiply the price of each book by the quantity
    //in the basket
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "bookId", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price", nullable = false)
    private double price;
    //I think this is not needed

    @CreationTimestamp
    @Column(name = "order-date", nullable = false, updatable = false)
    private LocalDateTime timeOfPurchase;


    public OrderItem() {}
    //LocalDateTime timeOfPurchase
    public OrderItem(Integer id, Book book, Order order, int quantity, User user, LocalDateTime timeOfPurchase) {
        this.id = id;
        this.book = book;
        this.order = order;
        this.quantity = quantity;
        this.user = user;
        price = book.getPrice() * quantity;
        this.timeOfPurchase = timeOfPurchase;
    }

    public OrderItem(Book book, Order order) {
        this.book = book;
        this.order = order;
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

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getPrice() {
        return price;
    }


}
