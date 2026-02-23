// package com.nexanova.trainerapp.repository;

// import com.nexanova.trainerapp.entity.TrainerSubject;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface TrainerSubjectRepository extends JpaRepository<TrainerSubject, Long> {
// }
package com.nexanova.trainerapp.repository;

import com.nexanova.trainerapp.entity.TrainerSubject;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerSubjectRepository extends JpaRepository<TrainerSubject, Long> {

    @Modifying
    @Query("DELETE FROM TrainerSubject ts WHERE ts.trainer.id = :trainerId")
    void deleteByTrainerId(@Param("trainerId") Long trainerId);
}