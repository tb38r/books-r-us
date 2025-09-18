package com.sparta.library.mappers;
import com.sparta.library.dto.AddAuthorDto;
import com.sparta.library.model.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    AddAuthorDto toAuthorDTO(Author author);
    Author toAuthor(AddAuthorDto addAuthorDTO);
}
