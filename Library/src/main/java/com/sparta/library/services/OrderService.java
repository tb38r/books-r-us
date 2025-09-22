package com.sparta.library.services;

import com.sparta.library.dto.BookDTO;
import com.sparta.library.dto.CreateOrderDto;
import com.sparta.library.dto.OrdersDto;
import com.sparta.library.exceptions.BookNotFoundException;
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
    /*
    @Transactional
    public List<OrdersDto> getOrdersByUserId(Integer id) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }
        var orders = ordersRepository.findByUser(user);
        List<OrdersDto> ordersDtos = new ArrayList<>();
        for (Order order : orders) {
            OrdersDto ordersDto = new OrdersDto();
            ordersDto.setUserId(id);
            ordersDto.setTimeOfPurchase(order.getTimeOfPurchase());
            var totalPrice = 0.0;
            var books = new ArrayList<Book>();
            for(int i = 0; i < order.getOrderItems().size(); i++) {
                totalPrice += order.getOrderItems().get(i).getPrice();
                books.add(order.getOrderItems().get(i).getBook());
            }
            ordersDto.setTotalPrice(totalPrice);
            ordersDto.setBooks(books.stream().map(bookMapper::bookDTO).toList());
            ordersDtos.add(ordersDto);
        }
        return ordersDtos;
    }
    @Transactional
    public void createOrder(CreateOrderDto createOrderDto) {
        List<OrderItem> orderItems = new ArrayList<>();
        var user = userRepository.findById(createOrderDto.getUserId()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        var books = createOrderDto.getBooks();
        var order = new Order();
        order.setUser(user);
        for(var book : books) {
            Book b = bookRepository.findById(book.getId()).orElse(null);
            if(b == null) {
                throw new BookNotFoundException();
            }
            OrderItem orderItem = new OrderItem();
            if(b.getQuantity() < book.getQuantity()) {
                throw new QuantityExceededException();
            }
            orderItem.setQuantity(book.getQuantity());
            orderItem.setPrice(book.getQuantity() * b.getPrice());
            orderItem.setBook(b);
            orderItem.setOrder(order);
            b.setQuantity(b.getQuantity() - book.getQuantity());
            //orderItemRepository.save(orderItem);
            bookRepository.save(b);
            order.getOrderItems().add(orderItem);
        }
        order.setTimeOfPurchase();
        ordersRepository.save(order);
    }
    */

}
