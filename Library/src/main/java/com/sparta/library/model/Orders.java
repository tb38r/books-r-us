package com.sparta.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="bookId")
    private Book book;


    @ManyToOne
    @JoinColumn(name="userID")
    private User user;


    @CreationTimestamp
    @Column(name="order-date", nullable = false, updatable = false)
    private LocalDateTime timeOfPurchase;




}
