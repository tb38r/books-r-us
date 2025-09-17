package com.sparta.library.repositories;

import com.sparta.library.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<OrderItem, Integer> {



}
