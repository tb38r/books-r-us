package com.sparta.library.services;

import com.sparta.library.dto.UserRegistrationDTO;
import com.sparta.library.dto.UserResponseDTO;
import com.sparta.library.mappers.UserMapper;
import com.sparta.library.model.User;
import com.sparta.library.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponseDTO registerUser(UserRegistrationDTO dto) {
        System.out.println("DTO: firstName=" + dto.getFirstName() +
                ", lastName=" + dto.getLastName() +
                ", email=" + dto.getEmail() +
                ", password=" + dto.getPassword());

        User user = userMapper.toEntity(dto);
        System.out.println("Entity: firstName=" + user.getFirstName() +
                ", lastName=" + user.getLastName() +
                ", email=" + user.getEmail() +
                ", password=" + user.getPassword());

        user.setCreatedTime();
        User saved = userRepository.save(user);
        return userMapper.toUserDto(saved);
    }

}
