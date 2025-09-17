package com.sparta.library.services;

import com.sparta.library.dto.AuthorDTO;
import com.sparta.library.mappers.AuthorMapper;
import com.sparta.library.model.Author;
import com.sparta.library.repositories.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    public AuthorService(AuthorRepository authorRepository, AuthorMapper authorMapper) {
        if(authorRepository==null) throw new NullPointerException("Author Repository cannot be null");
        if (authorMapper==null) throw new NullPointerException("Author Mapper cannot be null");
        this.authorRepository = authorRepository;
        this.authorMapper = authorMapper;
    }

    public List<AuthorDTO> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();
        List<AuthorDTO> authorDTOs = new ArrayList<>();
        for (Author author : authors) {
            authorDTOs.add(authorMapper.authorDTO(author));
        }
        return authorDTOs;
    }

    public AuthorDTO getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElse(null);
        return authorMapper.authorDTO(author);
    }

    public AuthorDTO createAuthor(AuthorDTO authorDTO) {
        Author entity = authorMapper.toAuthor(authorDTO);
        Author saved = authorRepository.save(entity);
        return authorMapper.authorDTO(saved);
    }

    public AuthorDTO updateAuthor(AuthorDTO authorDTO) {
        int id = authorDTO.getId();
        if(!authorRepository.existsById(id)){
            throw new NoSuchElementException("Author with ID " + id + " does not exist");

        }
        Author entity = authorMapper.toAuthor(authorDTO);
        Author saved = authorRepository.save(entity);
        return authorMapper.authorDTO(saved);
    }

    public boolean deleteAuthor(int id) {
        if(authorRepository.existsById(id)){
            authorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
