import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('/single/:id')
  async getProductById(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(body);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productService.updateProduct(id, body);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.productService.deleteProduct(id);
    return { success };
  }
}
