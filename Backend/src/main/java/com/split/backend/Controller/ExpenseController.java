package com.split.backend.Controller;

import com.split.backend.Repository.ExpenseRepository;
import com.split.backend.Repository.GroupRepository;
import com.split.backend.Repository.SplitRepository;
import com.split.backend.Repository.UserRepository;
import com.split.backend.model.Expense;
import com.split.backend.model.Group;
import com.split.backend.model.User;
import com.split.backend.model.split;
import org.springframework.web.bind.annotation.*;
import com.split.backend.Dto.ExpenseRequest;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final UserRepository userRepo;
    private final SplitRepository splitRepo;
    private final GroupRepository groupRepo;
    private final ExpenseRepository expenseRepo;

    public ExpenseController(ExpenseRepository expenseRepo,
                             UserRepository userRepo,
                             GroupRepository groupRepo,
                             SplitRepository splitRepo) {
        this.expenseRepo = expenseRepo;
        this.userRepo = userRepo;
        this.groupRepo = groupRepo;
        this.splitRepo = splitRepo;
    }

    @PostMapping
    public String addExpense(@RequestBody ExpenseRequest req){
        // Fetch User data
        User paidByUser = userRepo.findById(req.paidBy).orElseThrow();
        Group group = groupRepo.findById(req.groupId).orElseThrow();

        // save expenses
        Expense expense = new Expense();
        expense.setDescription(req.description);
        expense.setAmount(req.amount);
        expense.setPaidBy(paidByUser);
        expense.setGroup(group);

        expenseRepo.save(expense);

        //split Equally

        double splitAmount = req.amount/req.userIds.size();

        for(Long userId : req.userIds){
            split split = new split();
            split.setExpense(expense);
            split.setUser(userRepo.findById(userId).orElseThrow());
            split.setAmount(splitAmount);

            splitRepo.save(split);

        }
        return "Expense Added";
    }

    @GetMapping("/balances")
    public String getBalances() {

        List<split> splits = splitRepo.findAll();

        StringBuilder result = new StringBuilder();

        for (split split : splits) {
            String userName = split.getUser().getName();
            Double amount = split.getAmount();
            String paidBy = split.getExpense().getPaidBy().getName();

            if (!userName.equals(paidBy)) {
                result.append(userName)
                        .append(" owes ")
                        .append(paidBy)
                        .append(" ₹")
                        .append(amount)
                        .append("\n");
            }
        }

        return result.toString();
    }
}
