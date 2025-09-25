package com.sparta.library.services;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.exceptions.*;
import com.sparta.library.mappers.BookMapper;
import com.sparta.library.mappers.OrdersMapper;
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
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final OrdersMapper ordersMapper;
    public User returnAuthUser() {
        var authUser = SecurityContextHolder.getContext().getAuthentication();
        var authId =  Integer.parseInt(authUser.getPrincipal().toString());
        var user =  userRepository.findById(authId).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }
    @Transactional
    public OrdersDto CreateOrder(CreateOrderDto dto) {
        var order = new Order();

        var user = returnAuthUser();
        /*
        var user = userRepository.findById(dto.getUserId()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
         */
        var book = bookRepository.findById(dto.getBookId()).orElse(null);
        if(book == null) {
            throw new BookNotFoundException();
        }
        if(book.getQuantity() < dto.getQuantity()) {
            throw new QuantityExceededException();
        }
        var orders = ordersRepository.findByUserAndBook(user, book);
        var o = ordersRepository.findByUserAndBookAndNotPurchased(user, book).orElse(null);
        if(o != null) {
            throw new OrderAlreadyExistsException();
        }
        order.setQuantity(dto.getQuantity());
        order.setUser(user);
        order.setBook(book);
        order.setPurchased(false);
        ordersRepository.save(order);
        var orderdto = ordersMapper.toOrdersDto(order);
        orderdto.setOrderId(order.getId());
        orderdto.setBook(bookMapper.bookDTO(book));
        orderdto.setQuantityInBasket(dto.getQuantity());
        return orderdto;
    }
    @Transactional
    public List<BookDTO> getOrdersByUserId(boolean purchased) {
        var user = returnAuthUser();
        List<BookDTO> books = new ArrayList<>();
        /*
        var user = userRepository.findById(id).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        */

        var orders = ordersRepository.findByUser(user);
        for(Order order : orders) {
            if(order.getPurchased() != purchased) continue;
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
        var user = returnAuthUser();
        /*
        var user = userRepository.findById(dto.getUserId()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
         */
        var book = bookRepository.findById(dto.getBookId()).orElse(null);
        if(book == null) {
            throw new BookNotFoundException();
        }
        if(book.getQuantity() < dto.getQuantity()) {
            throw new QuantityExceededException();
        }
        var orders = ordersRepository.findByUserAndBook(user, book);
        if(orders.isEmpty()) {
            throw new OrderDoesNotExistException();
        }
        var order = orders.get(0);
        order.setQuantity(dto.getQuantity());
        ordersRepository.save(order);
    }
    public void DeleteOrder(Integer id) {
        var order = ordersRepository.findById(id).orElse(null);
        if(order == null) {
            throw new OrderDoesNotExistException();
        }
        ordersRepository.delete(order);
    }
    @Transactional
    public void purchase() {
        var user = returnAuthUser();
        /*
        var user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
         */
        var orders = ordersRepository.findByUser(user);
        if(orders.isEmpty()) {
            throw new OrderDoesNotExistException();
        }
        for(var order : orders) {
            if(order.getPurchased()) continue;
            order.setPurchased(true);
            ordersRepository.save(order);
        }
    }
}
