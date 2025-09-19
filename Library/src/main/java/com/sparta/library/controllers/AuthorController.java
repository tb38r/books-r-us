package com.sparta.library.controllers;

import com.sparta.library.services.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*
@RestController
@RequestMapping("/authors")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @Operation(summary = "get all Authors")
    @GetMapping
    public List<AddAuthorDTO> getAllAuthors(){
        return authorService.getAllAuthors();
    }

    @Operation(summary = "Get author by ID")
    @GetMapping("/{id}")
    public AuthorDTO getAuthorById(@PathVariable int id) {
        return authorService.getAuthorById(id);
    }

    @Operation(summary = "Create a new author")
    @PostMapping
    public AuthorDTO createAuthor(@RequestBody AuthorDTO authorDTO) {
        return authorService.createAuthor(authorDTO);
    }

    @Operation(summary = "Update an existing author")
    @PutMapping("/{id}")
    public AuthorDTO updateAuthor(@PathVariable int id, @RequestBody AuthorDTO authorDTO) {
        authorDTO.setId(id);
        return authorService.updateAuthor(authorDTO);
    }

    @Operation(summary = "Delete an author by ID")
    @DeleteMapping("/{id}")
    public boolean deleteAuthor(@PathVariable int id) {
        return authorService.deleteAuthor(id);
    }
}
*/