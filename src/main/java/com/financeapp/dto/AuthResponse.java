package com.financeapp.dto;

public class AuthResponse {
    private final String message;

    public AuthResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
} 