package com.sparta.library.services;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.exceptions.BookNotFoundException;
import com.sparta.library.exceptions.OrderDoesNotExistException;
import com.sparta.library.exceptions.QuantityExceededException;
import com.sparta.library.exceptions.UserNotFoundException;
import com.sparta.library.mappers.BookMapper;
import com.sparta.library.model.Book;
import com.sparta.library.model.Order;
import com.sparta.library.model.OrderItem;
import com.sparta.library.model.User;
import com.sparta.library.repositories.BookRepository;
import com.sparta.library.repositories.OrderItemRepository;
import com.sparta.library.repositories.OrderRepository;
import com.sparta.library.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {


    private final OrderRepository ordersRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Transactional
    public void CreateOrder(CreateOrderDto dto) {
        var order = new Order();
        System.out.println(dto.getUserId());
        var user = userRepository.findById(dto.getUserId()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        var book = bookRepository.findById(dto.getBookId()).orElse(null);
        if(book == null) {
            throw new BookNotFoundException();
        }
        order.setQuantity(dto.getQuantity());
        order.setUser(user);
        order.setBook(book);
        order.setPurchased(false);
        ordersRepository.save(order);
    }
    @Transactional
    public List<BookDTO> getOrdersByUserId(Integer id) {
        var user = userRepository.findById(id).orElse(null);
        List<BookDTO> books = new ArrayList<>();
        if(user == null) {
            throw new UserNotFoundException();
        }
        var orders = ordersRepository.findByUser(user);
        for(Order order : orders) {
            if(order.getPurchased()) continue;
            var book = bookRepository.findById(order.getBook().getId()).orElse(null);
            if(book == null) {
                throw new BookNotFoundException();
            }
            var bookDto = bookMapper.bookDTO(book);
            bookDto.setQuantity(order.getQuantity());
            books.add(bookDto);
        }
        return books;
    }
    public void UpdateOrder(CreateOrderDto dto) {
        var user = userRepository.findById(dto.getUserId()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        var book = bookRepository.findById(dto.getBookId()).orElse(null);
        if(book == null) {
            throw new BookNotFoundException();
        }
        var orders = ordersRepository.findByUserAndBook(user, book);
        if(orders.isEmpty()) {
            throw new OrderDoesNotExistException();
        }
        var order = orders.get(0);
        order.setQuantity(dto.getQuantity());
        ordersRepository.save(order);
    }
}
