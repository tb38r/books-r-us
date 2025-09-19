package com.sparta.library.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ValidateUserDto {
    @NotBlank(message = "Email required")
    private String email;
    @NotBlank(message = "Password required")
    private String password;
}
