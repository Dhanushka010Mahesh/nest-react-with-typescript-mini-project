import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.getProductById(id);
    await this.productRepo.update(id, data);
    return this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const existingProduct = await this.getProductById(id);
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
