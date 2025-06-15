package com.financeapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.financeapp.dto.GoalRequest;
import com.financeapp.dto.GoalResponse;
import com.financeapp.service.GoalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@Tag(name = "Goals", description = "Goal management APIs")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    @Operation(summary = "Create a new goal")
    public ResponseEntity<GoalResponse> createGoal(@Valid @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.createGoal(request));
    }

    @GetMapping
    @Operation(summary = "Get all goals for current user")
    public ResponseEntity<List<GoalResponse>> getGoals(
            @RequestParam(required = false) Integer limit) {
        return ResponseEntity.ok(goalService.getUserGoals(limit));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get goal by ID")
    public ResponseEntity<GoalResponse> getGoal(@PathVariable Long id) {
        return ResponseEntity.ok(goalService.getGoal(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update goal")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long id,
            @Valid @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.updateGoal(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete goal")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.ok().build();
    }
}
