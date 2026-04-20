package com.split.backend.Controller;

import com.split.backend.Repository.UserRepository;
import com.split.backend.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ✅ Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    // ✅ Login
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        User existing = userRepo.findByEmail(user.getEmail());

        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return existing;
        }

        throw new RuntimeException("Invalid credentials");
    }
}