package com.sparta.library.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private String author;
    @Column(name = "price", nullable = false)
    private double price;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "genre", nullable = false)
    private String genre;

    @Column(name = "olid")
    private String olid;

    @Column(name = "cover")
    private String coverUrl;


    @OneToMany(
            mappedBy = "book",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Order> orders = new ArrayList<>();

    public Book() {}


    public Book(Integer id , String title, String author, double price, List<Order> orders) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.orders = orders;
    }

    public Book(String title, String author, double price, int quantity, String genre, String olid, String coverUrl) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.orders = new ArrayList<>();
        this.quantity = quantity;
        this.genre = genre;
        this.olid = olid;
        this.coverUrl = coverUrl;
    }

    public Book(Integer id , String title, String author, double price, int quantity, String genre, String olid, String coverUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.quantity = quantity;
        this.genre = genre;
        this.price = price;
        this.olid = olid;
        this.coverUrl = coverUrl;
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getOlid() {
        return olid;
    }

    public void setOlid(String olid) {
        this.olid = olid;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }
}
