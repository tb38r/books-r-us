package com.sparta.library.mappers;

import com.sparta.library.dto.UserRegistrationDTO;
import com.sparta.library.dto.UserResponseDTO;
import com.sparta.library.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRegistrationDTO dto);

    UserResponseDTO toUserDto(User user);
}
