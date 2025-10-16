package DM.com.backend_server.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products_my")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    // Add other fields as needed based on your DTOs and requirements
}