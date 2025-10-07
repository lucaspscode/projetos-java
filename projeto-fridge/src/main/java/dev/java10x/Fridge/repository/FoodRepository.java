import dev.java10x.Fridge.model.Food;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
    // Custom query methods can be defined here if needed
    // For example, to find food by name:
    // List<Food> findByName(String name);{
    
}
