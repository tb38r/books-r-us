package com.sparta.library.repositories;

import com.sparta.library.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
}
