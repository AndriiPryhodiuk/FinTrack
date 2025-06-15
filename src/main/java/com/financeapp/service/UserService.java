package com.financeapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.financeapp.model.User;
import com.financeapp.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new Exception("Email already in use");
        }
        
        
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User login(String email, String password) throws Exception {
    Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(password)) {
        throw new Exception("Incorrect email or password");
    }

    return optionalUser.get();
}

}


