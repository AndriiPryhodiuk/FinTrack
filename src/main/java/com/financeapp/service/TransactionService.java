package com.financeapp.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financeapp.dto.TransactionRequest;
import com.financeapp.dto.TransactionResponse;
import com.financeapp.exception.ResourceNotFoundException;
import com.financeapp.exception.UnauthorizedException;
import com.financeapp.model.Goal;
import com.financeapp.model.Transaction;
import com.financeapp.model.User;
import com.financeapp.repository.GoalRepository;
import com.financeapp.repository.TransactionRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final GoalRepository goalRepository;
    private final AuthService authService;

    public TransactionService(TransactionRepository transactionRepository,
                            GoalRepository goalRepository,
                            AuthService authService) {
        this.transactionRepository = transactionRepository;
        this.goalRepository = goalRepository;
        this.authService = authService;
    }

    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request) {
        User currentUser = authService.getCurrentUser();
        
        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setUser(currentUser);

        if (request.getGoalId() != null) {
            Goal goal = goalRepository.findById(request.getGoalId())
                    .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));
            
            if (!goal.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedException("Access denied to this goal");
            }
            
            transaction.setGoal(goal);
            
            // Update goal's current amount
            if (request.getType() == Transaction.TransactionType.INCOME) {
                goal.setCurrentAmount(goal.getCurrentAmount().add(request.getAmount()));
            } else {
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(request.getAmount()));
            }
            goalRepository.save(goal);
        }

        Transaction savedTransaction = transactionRepository.save(transaction);
        return new TransactionResponse(savedTransaction);
    }

    public List<TransactionResponse> getUserTransactions(Integer limit) {
        User currentUser = authService.getCurrentUser();
        List<Transaction> transactions = transactionRepository.findByUserOrderByCreatedAtDesc(currentUser);
        
        if (limit != null && limit > 0) {
            transactions = transactions.stream()
                .limit(limit)
                .collect(Collectors.toList());
        }
        
        return transactions.stream()
            .map(TransactionResponse::new)
            .collect(Collectors.toList());
    }

    public List<TransactionResponse> getGoalTransactions(Long goalId, Integer limit) {
        User currentUser = authService.getCurrentUser();
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        if (!goal.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Access denied to this goal");
        }

        List<Transaction> transactions = transactionRepository.findByGoalOrderByCreatedAtDesc(goal);
        
        if (limit != null && limit > 0) {
            transactions = transactions.stream()
                .limit(limit)
                .collect(Collectors.toList());
        }
        
        return transactions.stream()
            .map(TransactionResponse::new)
            .collect(Collectors.toList());
    }

    public TransactionResponse getTransaction(Long id) {
        User currentUser = authService.getCurrentUser();
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Access denied to this transaction");
        }

        return new TransactionResponse(transaction);
    }

    @Transactional
    public void deleteTransaction(Long id) {
        User currentUser = authService.getCurrentUser();
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Access denied to this transaction");
        }

        // If transaction was associated with a goal, update the goal's current amount
        if (transaction.getGoal() != null) {
            Goal goal = transaction.getGoal();
            if (transaction.getType() == Transaction.TransactionType.INCOME) {
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(transaction.getAmount()));
            } else {
                goal.setCurrentAmount(goal.getCurrentAmount().add(transaction.getAmount()));
            }
            goalRepository.save(goal);
        }

        transactionRepository.delete(transaction);
    }
}