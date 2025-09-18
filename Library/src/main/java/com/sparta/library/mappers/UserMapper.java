package com.sparta.library.mappers;

import com.sparta.library.dto.RegisterUserDto;
import com.sparta.library.dto.UserDto;
import com.sparta.library.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterUserDto registerUserDto);
    UserDto toUserDto(User user);
}
