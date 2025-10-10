package com.sparta.library.config;

import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
@ConfigurationProperties(prefix = "jwt.secret")
@Data
public class JwtConfig {
    @Value("${jwt.secret.secret}")
    private String secret;
    private int accessTokenExpiration;
    private int refreshTokenExpiration;

    public SecretKey getSecretKey() {

        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
