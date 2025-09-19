package com.sparta.library.services;

import com.sparta.library.dto.RegisterUserDto;
import com.sparta.library.dto.ValidateUserDto;
import com.sparta.library.exceptions.UserExistsException;
import com.sparta.library.exceptions.UserLoginIncorrectException;
import com.sparta.library.exceptions.UserNotFoundException;
import com.sparta.library.mappers.UserMapper;
import com.sparta.library.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserService(UserMapper userMapper, UserRepository userRepository) {

        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }
    @Transactional
    public void createUser(RegisterUserDto registerUserDto) {
        if(userRepository.existsByEmail(registerUserDto.getEmail())) {
            throw new UserExistsException();
        }
        var user = userMapper.toUser(registerUserDto);
        userRepository.save(user);
    }
    public void validateUser(ValidateUserDto validateUserDto) {
        var user = userRepository.findByEmail(validateUserDto.getEmail()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        if(!user.getPassword().equals(validateUserDto.getPassword())) {
            throw new UserLoginIncorrectException();
        }
    }
}
