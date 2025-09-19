package com.sparta.library.repositories;

import com.sparta.library.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false) //may cause issues?, may use @RestResource(exported = false) per method
public interface AuthorRepository extends JpaRepository<Author, Integer> {

}