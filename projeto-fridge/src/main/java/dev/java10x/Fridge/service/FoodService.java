import org.springframework.stereotype.Service;
import dev.java10x.Fridge.repository.FoodRepository;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
    
    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // LISTAR
    public List<Food> getAll() {
        return foodRepository.findAll();
    }

    // CRIAR
    public Food save(Food food) {
        return foodRepository.save(food);
    }

    // DELETAR
    public void delete(Long id) {
        foodRepository.deleteById(id);
    }
}
