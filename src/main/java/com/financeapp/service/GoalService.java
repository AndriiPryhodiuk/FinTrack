package com.financeapp.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.financeapp.model.Goal;
import com.financeapp.model.User;
import com.financeapp.repository.GoalRepository;

@Service
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public List<Goal> getGoalsByUser(User user) {
        return goalRepository.findByUser(user);
    }

    public List<Goal> getGoalsByUserAndCategory(User user, String category) {
        return goalRepository.findByUserAndCategory(user, category);
    }

    public List<String> getAvailableIcons() {
        return List.of(
            "🏖", "🚗", "🏠", "🎓", "📱", "🛍", "💍", "🎁", "✈️", "🐶"
        );
    }

    public double calculateProgress(Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        // Calculate progress based on currentAmount vs targetAmount
        BigDecimal targetAmount = goal.getTargetAmount();
        BigDecimal currentAmount = goal.getCurrentAmount();

        if (targetAmount.compareTo(BigDecimal.ZERO) == 0) {
            return 0.0;
        }

        BigDecimal progress = currentAmount
                .divide(targetAmount, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        return progress.doubleValue();
    }
}