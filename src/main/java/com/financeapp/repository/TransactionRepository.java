package com.financeapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financeapp.model.Goal;
import com.financeapp.model.Transaction;
import com.financeapp.model.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    Page<Transaction> findByGoalOrderByCreatedAtDesc(Goal goal, Pageable pageable);
}