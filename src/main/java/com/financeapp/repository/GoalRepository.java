package com.financeapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.financeapp.model.Goal;
import com.financeapp.model.User;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUser(User user);
    List<Goal> findByUserAndCategory(User user, String category); // ⬅ новий метод
}
