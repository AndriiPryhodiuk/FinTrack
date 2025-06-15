package com.financeapp.controller;

import com.financeapp.model.Goal;
import com.financeapp.model.User;
import com.financeapp.service.GoalService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public Goal createGoal(@RequestBody Goal goal) {
        return goalService.createGoal(goal);
    }

    @GetMapping
    public List<Goal> getAllGoals() {
        return goalService.getAllGoals();
    }

    @GetMapping("/user/{userId}")
    public List<Goal> getGoalsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return goalService.getGoalsByUser(user);
    }

    @GetMapping("/user/{userId}/category/{category}")
    public List<Goal> getGoalsByUserAndCategory(@PathVariable Long userId, @PathVariable String category) {
        User user = new User();
        user.setId(userId);
        return goalService.getGoalsByUserAndCategory(user, category);
    }
}
