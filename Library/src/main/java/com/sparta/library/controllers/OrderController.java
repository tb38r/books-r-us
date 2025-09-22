package com.sparta.library.controllers;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.exceptions.BookNotFoundException;
import com.sparta.library.exceptions.OrderDoesNotExistException;
import com.sparta.library.exceptions.QuantityExceededException;
import com.sparta.library.exceptions.UserNotFoundException;
import com.sparta.library.services.BooksService;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sparta.library.services.OrderService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<BookDTO>> getOrderByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderDto createOrderDto) {
        orderService.CreateOrder(createOrderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", "order created"));
    }
    @PutMapping
    public ResponseEntity<?> updateOrder(@RequestBody CreateOrderDto createOrderDto) {
        orderService.UpdateOrder(createOrderDto);
        return ResponseEntity.ok(Map.of("success", "order updated"));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User doesn't exist"));
    }
    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBookNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Book doesn't exist"));
    }
    @ExceptionHandler(QuantityExceededException.class)
    public ResponseEntity<Map<String, String>> handleQuantityExceededException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Quantity exceeded"));
    }
    @ExceptionHandler(OrderDoesNotExistException.class)
    public ResponseEntity<Map<String, String>> handleOrderDoesNotExist() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Order doesn't exist"));
    }
}
