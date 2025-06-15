package com.financeapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financeapp.model.User;
import com.financeapp.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return "Registration successful!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
    @PostMapping("/login")
public String loginUser(@RequestBody User user) {
    try {
        userService.login(user.getEmail(), user.getPassword());
        return "Successful login!";
    } catch (Exception e) {
        return "Error: " + e.getMessage();
    }
}

}
