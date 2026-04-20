package com.split.backend.Controller;

import com.split.backend.Repository.GroupRepository;
import com.split.backend.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupRepository group_repo;

    @PostMapping
    public Group createGroup(@RequestBody Group group){
        return group_repo.save(group);
    }
    @GetMapping
    public List<Group> getAllGroups(){
        return group_repo.findAll();
    }
}
