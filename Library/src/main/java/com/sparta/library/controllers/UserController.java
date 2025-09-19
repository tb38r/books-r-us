package com.sparta.library.controllers;

import com.sparta.library.dto.UserRegistrationDTO;
import com.sparta.library.dto.UserResponseDTO;
import com.sparta.library.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRegistrationDTO dto) {
        System.out.println("DTO received: " + dto);

        UserResponseDTO response = userService.registerUser(dto);
        System.out.println("***********");
        System.out.println(  response);
        System.out.println("***********");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}