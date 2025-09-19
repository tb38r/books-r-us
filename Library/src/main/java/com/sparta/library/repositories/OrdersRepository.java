package com.sparta.library.repositories;

import com.sparta.library.model.Order;
import com.sparta.library.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<OrderItem, Integer> {

//  void createOrder(Integer userID, List<Order> orders);


}
