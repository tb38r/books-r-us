package com.sparta.library.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
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

    private double totalPrice;

    /*
    Logic for order
    create operation will accept parameter of type userId and BookId and quantity
    Order created which will get total price by book price * quantity
    Book then needs to have quantity updated.
     */

}
