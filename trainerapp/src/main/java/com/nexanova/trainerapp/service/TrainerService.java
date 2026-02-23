package com.nexanova.trainerapp.service;

import com.nexanova.trainerapp.entity.Trainer;
import com.nexanova.trainerapp.repository.TrainerRepository;
import com.nexanova.trainerapp.repository.TrainerSubjectRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;
    private final TrainerSubjectRepository trainerSubjectRepository;

    public TrainerService(TrainerRepository trainerRepository, TrainerSubjectRepository trainerSubjectRepository) {
        this.trainerRepository = trainerRepository;
        this.trainerSubjectRepository = trainerSubjectRepository;
    }

    public Trainer saveTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // public void deleteTrainer(Long id) {
    // trainerRepository.deleteById(id);   
    // }

@Transactional
public void deleteTrainer(Long id) {
    trainerSubjectRepository.deleteByTrainerId(id); // delete links
    trainerRepository.deleteById(id);               // delete trainer
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
