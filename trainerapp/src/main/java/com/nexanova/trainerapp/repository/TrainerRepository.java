// package repository;

 package com.nexanova.trainerapp.repository;

import com.nexanova.trainerapp.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    // JpaRepository provides all basic CRUD operations
}

