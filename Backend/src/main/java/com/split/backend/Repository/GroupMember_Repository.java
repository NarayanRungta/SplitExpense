package com.split.backend.Repository;

import com.split.backend.model.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMember_Repository extends JpaRepository<GroupMember,Integer> {
}
