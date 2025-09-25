package com.sparta.library.repositories;

import com.sparta.library.model.Book;
import com.sparta.library.model.Order;
import com.sparta.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);
    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.book = :book")
    List<Order> findByUserAndBook(@Param("user") User user, @Param("book") Book book);
    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.book = :book AND o.purchased = false")
    Optional<Order> findByUserAndBookAndNotPurchased(@Param("user") User user, @Param("book") Book book);
}
