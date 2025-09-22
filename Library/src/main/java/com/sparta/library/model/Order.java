package com.sparta.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @CreationTimestamp
    @Column(name = "order-date", nullable = false, updatable = false)
    private LocalDateTime timeOfPurchase;

    private int quantity;
    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;
    private boolean purchased;
    public Order(Integer id, User user) {
        this.id = id;
        this.user = user;
    }

}
