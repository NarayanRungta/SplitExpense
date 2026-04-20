package com.split.backend.Dto;

import java.util.List;

public class ExpenseRequest {
    public String description;
    public Double amount;
    public Long paidBy;
    public Long groupId;
    public List<Long> userIds;
}