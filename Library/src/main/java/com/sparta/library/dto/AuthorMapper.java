package com.sparta.library.dto;
import com.sparta.library.model.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    AuthorDTO authorDTO(Author author);
    Author toAuthor(AuthorDTO authorDTO);
}
