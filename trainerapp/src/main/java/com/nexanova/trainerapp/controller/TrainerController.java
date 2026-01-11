package com.nexanova.trainerapp.controller;

import com.nexanova.trainerapp.entity.Trainer;
import com.nexanova.trainerapp.service.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    // POST: Add trainer
    @PostMapping
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return trainerService.saveTrainer(trainer);
    }

    // GET: Get all trainers
    @GetMapping
    public List<Trainer> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    // DELETE: Delete trainer by ID
    @DeleteMapping("/{id}")
        public void deleteTrainer(@PathVariable Long id) {
    trainerService.deleteTrainer(id);
    }

    // PUT: Update trainer by ID
    @PutMapping("/{id}")
            public Trainer updateTrainer(
        @PathVariable Long id,
        @RequestBody Trainer trainer) {
        return trainerService.updateTrainer(id, trainer);
    }

}
