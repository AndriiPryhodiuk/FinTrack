package com.financeapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.financeapp.model.Transaction;
import com.financeapp.model.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);

    List<Transaction> findByCategory(String category);
}