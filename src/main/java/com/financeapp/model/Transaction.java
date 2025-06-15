package com.financeapp.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Transaction {
    private Long id;
    private String user;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
    private String currency;
    private String category;  

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCategory() {  
        return category;
    }

    public void setCategory(String category) {  
        this.category = category;
    }
}
