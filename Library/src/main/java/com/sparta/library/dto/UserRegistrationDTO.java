package com.sparta.library.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    @NotBlank(message = "Name required")
    private String firstName;
    @NotBlank(message = "Name required")
    private String lastName;
    @NotBlank(message = "Email required")
    @Email private String email;
    @NotBlank(message = "Password required")
    @Size(min = 6)private String password;


}


