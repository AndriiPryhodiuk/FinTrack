package com.financeapp.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.financeapp.model.Goal;
import com.financeapp.model.Transaction;
import com.financeapp.model.User;
import com.financeapp.repository.GoalRepository;
import com.financeapp.repository.TransactionRepository;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final TransactionRepository transactionRepository;

    public GoalService(GoalRepository goalRepository, TransactionRepository transactionRepository) {
        this.goalRepository = goalRepository;
        this.transactionRepository = transactionRepository;
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
            "🏖️", "🚗", "🏠", "🎓", "📱", "🛍️", "💍", "🎁", "✈️", "🐶"
        );
    }

    public double calculateProgress(Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        List<Transaction> transactions = transactionRepository.findByGoal(goal);

        BigDecimal totalSaved = transactions.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal targetAmount = goal.getTargetAmount();

        if (targetAmount.compareTo(BigDecimal.ZERO) == 0) {
            return 0.0;
        }

        BigDecimal progress = totalSaved
                .divide(targetAmount, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        return progress.doubleValue();
    }
}
