package DM.com.backend_server.dto;

import lombok.Data;

@Data
public class UpdateProductDto {
    private String name;
    private Double price;
    // Add other fields as needed
}