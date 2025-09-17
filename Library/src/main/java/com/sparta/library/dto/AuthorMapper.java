package com.sparta.library.dto;
import com.sparta.library.model.Author;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    @Mapping(target = "authorBooks", source = "books")
    AuthorDTO authorDTO(Author author);
    Author toAuthor(AuthorDTO authorDTO);
}
