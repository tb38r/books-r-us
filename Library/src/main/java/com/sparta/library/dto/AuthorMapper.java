package com.sparta.library.dto;
import com.sparta.library.entities.Author;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    AuthorDTO authorDTO(Author author);
    Author toAuthor(AuthorDTO authorDTO);
}
