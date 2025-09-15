package com.sparta.library.entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity // marks the class as a JPA entity, so it will be mapped to a DB table
    @Table(name = "authors") // name of this entity's corresponding DB table
    public class Author {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", nullable = false)
        private Integer id;

        @Column(name = "first_name", length = 40)
        private String firstName;

        @Column(name = "last_name", length = 40)
        private String lastName;


        @OneToMany(
                mappedBy = "author",
                cascade = CascadeType.ALL,
                orphanRemoval = true
        )
        private List<Book> books = new ArrayList<>();


    }
