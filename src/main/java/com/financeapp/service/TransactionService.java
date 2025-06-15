package com.financeapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.financeapp.model.Transaction;
import com.financeapp.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByCategory(String category) {
    return transactionRepository.findByCategory(category);
}

}
