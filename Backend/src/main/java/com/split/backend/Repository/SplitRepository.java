package com.split.backend.Repository;

import com.split.backend.model.split;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SplitRepository extends JpaRepository<split,Integer> {
}
