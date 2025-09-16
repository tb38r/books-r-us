package com.sparta.library.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER) // determines when related entities are loaded from the database
    @JoinColumn(name = "authorId")
    private Author author;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "genre", nullable = false)
    private String genre;

    @Column(name = "price", nullable = false)
    private int quantity;
    @OneToMany(
            mappedBy = "book",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<Orders> orders = new ArrayList<>();
    public void addOrder(Orders order) {
        orders.add(order);
        order.setBook(this);
    }
    public void removeOrder(Orders order) {
        orders.remove(order);
        order.setBook(null);
    }
}

