import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "food_table")
public class Food {
    
    @id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate expirationDate;
    private Integer quantity;
    
    public Food() {
    }

    public Food(Long id, String name, LocalDate expirationDate, Integer quantity) {
        this.id = id;
        this.name = name;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
    }

    
}
