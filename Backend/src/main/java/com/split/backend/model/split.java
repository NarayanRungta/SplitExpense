package com.split.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class split {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Expense expense;

    @ManyToOne
    private User user;

    private Double amount;
}
