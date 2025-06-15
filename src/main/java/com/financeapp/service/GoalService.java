package com.financeapp.service;

import com.financeapp.dto.GoalRequest;
import com.financeapp.dto.GoalResponse;
import com.financeapp.model.Goal;
import com.financeapp.model.User;
import com.financeapp.repository.GoalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GoalService {
    private final GoalRepository goalRepository;
    private final AuthService authService;

    public GoalService(GoalRepository goalRepository, AuthService authService) {
        this.goalRepository = goalRepository;
        this.authService = authService;
    }

    public GoalResponse createGoal(GoalRequest request) {
        User currentUser = authService.getCurrentUser();
        Goal goal = new Goal();
        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setCurrentAmount(BigDecimal.ZERO);
        goal.setIconName(request.getIconName());
        goal.setCategory(request.getCategory());
        goal.setUser(currentUser);
        return new GoalResponse(goalRepository.save(goal));
    }

    public List<GoalResponse> getUserGoals(Integer limit) {
        User currentUser = authService.getCurrentUser();
        List<Goal> goals = goalRepository.findByUserOrderByCreatedAtDesc(currentUser);
        
        if (limit != null && limit > 0) {
            goals = goals.stream()
                .limit(limit)
                .collect(Collectors.toList());
        }
        
        return goals.stream()
            .map(GoalResponse::new)
            .collect(Collectors.toList());
    }

    public GoalResponse getGoal(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!goal.getUser().equals(authService.getCurrentUser())) {
            throw new RuntimeException("Access denied");
        }
        return new GoalResponse(goal);
    }

    public GoalResponse updateGoal(Long id, GoalRequest request) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!goal.getUser().equals(authService.getCurrentUser())) {
            throw new RuntimeException("Access denied");
        }
        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setIconName(request.getIconName());
        goal.setCategory(request.getCategory());
        return new GoalResponse(goalRepository.save(goal));
    }

    public void deleteGoal(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!goal.getUser().equals(authService.getCurrentUser())) {
            throw new RuntimeException("Access denied");
        }
        goalRepository.delete(goal);
    }
}