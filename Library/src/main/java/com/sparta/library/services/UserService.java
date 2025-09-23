package com.sparta.library.services;

import com.sparta.library.dto.RegisterUserDto;
import com.sparta.library.dto.UserDto;
import com.sparta.library.dto.ValidateUserDto;
import com.sparta.library.exceptions.UserExistsException;
import com.sparta.library.exceptions.UserLoginIncorrectException;
import com.sparta.library.exceptions.UserNotFoundException;
import com.sparta.library.mappers.UserMapper;
import com.sparta.library.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserMapper userMapper, UserRepository userRepository,  PasswordEncoder passwordEncoder) {

        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public UserDto createUser(RegisterUserDto registerUserDto) {
        if(userRepository.existsByEmail(registerUserDto.getEmail())) {
            throw new UserExistsException();
        }
        var user = userMapper.toUser(registerUserDto);
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setCreatedTime();
        userRepository.save(user);
        var userDto = userMapper.toUserDto(user);
        userDto.setId(user.getId());
        return userDto;
    }
    public void validateUser(ValidateUserDto validateUserDto) {
        var user = userRepository.findByEmail(validateUserDto.getEmail()).orElse(null);
        if(user == null) {
            throw new UserNotFoundException();
        }
        if(!passwordEncoder.matches(validateUserDto.getPassword(), user.getPassword())) {
            throw new UserLoginIncorrectException();
        }
    }
}
