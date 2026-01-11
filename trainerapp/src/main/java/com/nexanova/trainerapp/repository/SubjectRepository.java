package com.nexanova.trainerapp.repository;

import com.nexanova.trainerapp.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
