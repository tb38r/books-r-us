package com.sparta.library.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegisterUserDto {
    @NotBlank(message = "Name required")
    private String firstName;
    @NotBlank(message = "Name required")
    private String lastName;
    @NotBlank(message = "Email required")
    private String email;
    @NotBlank(message = "Password required")
    private String password;
}
