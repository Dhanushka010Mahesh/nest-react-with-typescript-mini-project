package DM.com.backend_server.service;


import DM.com.backend_server.Entity.Product;
import DM.com.backend_server.dto.CreateProductDto;
import DM.com.backend_server.dto.UpdateProductDto;
import DM.com.backend_server.exception.ProductNotFoundException;
import DM.com.backend_server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
    }

    public Product createProduct(CreateProductDto data) {
        Product product = new Product();
        // Map DTO fields to entity (manually or use MapStruct/ModelMapper for complex cases)
        product.setName(data.getName());
        product.setDescription(data.getDescription());
        product.setPrice(data.getPrice());
        // Set other fields
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, UpdateProductDto data) {
        Product existingProduct = getProductById(id);
        // Update fields (partial update)
        if (data.getName() != null) {
            existingProduct.setName(data.getName());
        }

        if (data.getPrice() != null) {
            existingProduct.setPrice(data.getPrice());
        }
        // Update other fields as needed
        return productRepository.save(existingProduct);
    }

    public boolean deleteProduct(Long id) {
        Product existingProduct = getProductById(id);
        productRepository.deleteById(id);
        return true; // Since deleteById doesn't return affected count easily, assume success after existence check
    }
}
