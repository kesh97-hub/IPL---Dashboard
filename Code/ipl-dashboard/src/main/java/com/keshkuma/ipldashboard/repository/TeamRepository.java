package com.keshkuma.ipldashboard.repository;

import com.keshkuma.ipldashboard.Model.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
    
    Team findByTeamName(String teamName);
}
