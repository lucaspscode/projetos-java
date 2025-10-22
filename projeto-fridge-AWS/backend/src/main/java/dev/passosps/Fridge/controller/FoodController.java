package dev.passosps.Fridge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.passosps.Fridge.model.Food;
import dev.passosps.Fridge.service.FoodService;

@RestController
@RequestMapping("/API/fridge")
@CrossOrigin(origins = "http://localhost:5173")
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

    // Endpoint to update a food item by ID
    @PutMapping("/{id}")
    public Food update(@PathVariable Long id, @RequestBody Food food) {
        // Certifica que o ID do caminho está no objeto para que o serviço possa usá-lo
        food.setId(id);
        return foodService.save(food);
    }
}
