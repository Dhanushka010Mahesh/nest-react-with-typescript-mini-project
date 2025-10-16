package DM.com.backend_server.dto;

import lombok.Data;

@Data
public class CreateProductDto {
    private String name;
    private String description;
    private Double price;
    // Add other fields as needed
}
