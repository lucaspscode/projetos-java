package dev.passosps.Fridge.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.passosps.Fridge.model.Food;
import dev.passosps.Fridge.service.FoodService;

@RestController
@RequestMapping("/food")
public class FoodController {
    
    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    // Endpoint to get all food items
    @GetMapping
    public List<Food> getAllFood() {
        return foodService.getAll();
    }

    // Endpoint to add a new food item
    @PostMapping
    public Food create(@RequestBody Food food) {
        return foodService.save(food);
    }

    // Endpoint to delete a food item by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        foodService.delete(id);
    }
}
