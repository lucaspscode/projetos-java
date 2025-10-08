package dev.passosps.Fridge.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.passosps.Fridge.model.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {
    
     
}
