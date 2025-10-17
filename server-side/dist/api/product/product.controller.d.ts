import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product | null>;
    createProduct(body: CreateProductDto): Promise<Product>;
    updateProduct(id: number, body: UpdateProductDto): Promise<Product | null>;
    deleteProduct(id: number): Promise<{
        success: boolean;
    }>;
}
