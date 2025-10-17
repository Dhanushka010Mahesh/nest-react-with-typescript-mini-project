import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    createProduct(data: CreateProductDto): Promise<Product>;
    updateProduct(id: number, data: UpdateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<boolean>;
}
