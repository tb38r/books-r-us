package com.sparta.library.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;

import javax.crypto.SecretKey;
import java.util.Date;

@AllArgsConstructor
public class Jwt {
    private final Claims claims;
    private final SecretKey secretKey;
    public boolean isValid() {
        return claims.getExpiration().after(new Date());
    }
    public int getUserIdFromToken() {
        return Integer.parseInt((String) claims.getSubject());
    }
    public String toString() {
        return Jwts.builder().claims(claims).signWith(secretKey).compact();
    }
}
