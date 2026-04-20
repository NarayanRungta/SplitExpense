package com.split.backend.Controller;

import com.split.backend.Repository.GroupMember_Repository;
import com.split.backend.Repository.GroupRepository;
import com.split.backend.Repository.UserRepository;
import com.split.backend.model.GroupMember;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group-members")
public class GroupMemberController {

    private final GroupMember_Repository repo;
    private final UserRepository userRepo;
    private final GroupRepository groupRepo;

    public GroupMemberController(GroupMember_Repository repo,
                                 UserRepository userRepo,
                                 GroupRepository groupRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.groupRepo = groupRepo;
    }

    @PostMapping
    public GroupMember addMember(@RequestBody GroupMember member) {
        return repo.save(member);
    }

    @GetMapping
    public List<GroupMember> getAllMembers() {
        return repo.findAll();
    }
}