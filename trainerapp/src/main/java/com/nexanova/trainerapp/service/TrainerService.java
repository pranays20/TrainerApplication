package com.nexanova.trainerapp.service;

import com.nexanova.trainerapp.entity.Trainer;
import com.nexanova.trainerapp.repository.TrainerRepository;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    public Trainer saveTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public void deleteTrainer(Long id) {
    trainerRepository.deleteById(id);   
    }

    //update trainer
    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existingTrainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        existingTrainer.setName(updatedTrainer.getName());
        existingTrainer.setEmail(updatedTrainer.getEmail());
        existingTrainer.setPhone(updatedTrainer.getPhone());

        return trainerRepository.save(existingTrainer);
    }

}
