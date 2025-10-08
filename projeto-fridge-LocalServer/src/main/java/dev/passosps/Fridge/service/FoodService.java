package dev.passosps.Fridge.service;
import java.util.List;

import org.springframework.stereotype.Service;

import dev.passosps.Fridge.model.Food;
import dev.passosps.Fridge.repository.FoodRepository;

@Service
public class FoodService {
    
    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Method to get all food items
    public List<Food> getAll() {
        return foodRepository.findAll();
    }

    // Method to save a food item
    public Food save(Food food) {
        return foodRepository.save(food);
    }

    // Method to delete a food item by ID
    public void delete(Long id) {
        foodRepository.deleteById(id);
    }
}
