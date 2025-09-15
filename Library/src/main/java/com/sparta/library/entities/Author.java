package com.sparta.library.entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

    @Entity // marks the class as a JPA entity, so it will be mapped to a DB table
    @Table(name = "authors") // name of this entity's corresponding DB table
    public class Author {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", nullable = false)
        private Integer id;

        @Column(name = "full_name", length = 40)
        private String fullName;

        @OneToMany(
                mappedBy = "author",
                cascade = CascadeType.ALL,
                orphanRemoval = true
        )
        private List<Book> books = new ArrayList<>();

        public Author(String fullName) {
            this.fullName = fullName;
        }

        public Author() {
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public List<Book> getBooks(){
            return this.books;
        }

    }
