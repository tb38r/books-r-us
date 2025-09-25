package com.sparta.library.services;

import com.sparta.library.config.JwtConfig;
import com.sparta.library.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class JwtService {
    private final JwtConfig jwtConfig;
    public Jwt generateAccessToken(User u) {
        return getToken(u, jwtConfig.getAccessTokenExpiration());
    }
    private Jwt getToken(User u, long expiration) {
        String idString = u.getId().toString();
        var claims = Jwts.claims().subject(idString).add("email", u.getEmail())
                .add("firstName", u.getFirstName())
                .add("lastName", u.getLastName())
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000 * expiration)).build();
        return new Jwt(claims, jwtConfig.getSecretKey());
    }
    private Claims getClaims(String token) {
        var claims = Jwts.parser().verifyWith(jwtConfig.getSecretKey()).build().parseSignedClaims(token).getPayload();
        return claims;
    }
    public Jwt parse(String token) {
        try {
            var claims = getClaims(token);
            return new  Jwt(claims, jwtConfig.getSecretKey());
        }
        catch (JwtException e) {
            return null;
        }
    }
}
