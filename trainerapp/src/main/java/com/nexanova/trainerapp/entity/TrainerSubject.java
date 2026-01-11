package com.nexanova.trainerapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trainer_subject")
public class TrainerSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // Constructors
    public TrainerSubject() {
    }

    public TrainerSubject(Trainer trainer, Subject subject) {
        this.trainer = trainer;
        this.subject = subject;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
