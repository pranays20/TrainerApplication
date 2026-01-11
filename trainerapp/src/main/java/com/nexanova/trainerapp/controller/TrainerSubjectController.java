package com.nexanova.trainerapp.controller;

import com.nexanova.trainerapp.entity.*;
import com.nexanova.trainerapp.repository.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainer-subject")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainerSubjectController {

    private final TrainerRepository trainerRepository;
    private final SubjectRepository subjectRepository;
    private final TrainerSubjectRepository trainerSubjectRepository;

    public TrainerSubjectController(
            TrainerRepository trainerRepository,
            SubjectRepository subjectRepository,
            TrainerSubjectRepository trainerSubjectRepository) {

        this.trainerRepository = trainerRepository;
        this.subjectRepository = subjectRepository;
        this.trainerSubjectRepository = trainerSubjectRepository;
    }

    // Assign subject to trainer
    @PostMapping
    public TrainerSubject assignSubject(
            @RequestParam Long trainerId,
            @RequestParam Long subjectId) {

        Trainer trainer = trainerRepository.findById(trainerId).orElseThrow();
        Subject subject = subjectRepository.findById(subjectId).orElseThrow();

        TrainerSubject trainerSubject = new TrainerSubject(trainer, subject);
        return trainerSubjectRepository.save(trainerSubject);
    }
}
