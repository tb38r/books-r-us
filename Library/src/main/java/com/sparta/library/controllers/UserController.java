package com.sparta.library.controllers;


import com.sparta.library.dto.RegisterUserDto;
import com.sparta.library.dto.ValidateUserDto;
import com.sparta.library.exceptions.UserExistsException;
import com.sparta.library.exceptions.UserLoginIncorrectException;
import com.sparta.library.exceptions.UserNotFoundException;
import com.sparta.library.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterUserDto registerUserDto) {
        var user = userService.createUser(registerUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> validateUser(@Valid @RequestBody ValidateUserDto validateUserDto) {
        
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(validateUserDto.getEmail(), validateUserDto.getPassword())
        );

        //userService.validateUser(validateUserDto);
        return ResponseEntity.ok().body(Map.of("message", "User logged in successfully!"));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User doesn't exist"));
    }
    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<Map<String, String>> handleUserExists() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User with this email already exists"));
    }
    @ExceptionHandler(UserLoginIncorrectException.class)
    public ResponseEntity<Map<String, String>> handleUserLoginIncorrect() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User has invalid password"));
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Bad credentials"));
    }
}
