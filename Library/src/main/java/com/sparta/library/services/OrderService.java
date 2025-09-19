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
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {


    private final OrderRepository ordersRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final OrderItemRepository orderItemRepository;
    private final BookMapper bookMapper;

    public OrderService(OrderRepository ordersRepository, UserRepository userRepository, BookRepository bookRepository, OrderItemRepository orderItemRepository, BookMapper bookMapper) {
        this.ordersRepository = ordersRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.orderItemRepository = orderItemRepository;
        this.bookMapper = bookMapper;
    }
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
}
