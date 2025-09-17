package com.sparta.library.mappers;


import com.sparta.library.dto.AddBookDto;
import com.sparta.library.dto.BookDTO;
import com.sparta.library.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AuthorMapper.class})
public interface BookMapper {
    //@Mapping(source = "author", target = "author")
    BookDTO bookDTO(Book book);
    /*
    @Mapping(source = "author", target = "author")
    Book toBook(AddBookDto addBookDTO);
    */
     Book toBook(AddBookDto addBookDto);
}
