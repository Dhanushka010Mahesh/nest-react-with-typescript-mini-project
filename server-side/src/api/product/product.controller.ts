import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Get('/single/:id')
  getProductById(@Param('id') id: number): Product | undefined {
    return this.productService.getProductById(id);
  }

  @Post('/create')
  createProduct(@Body() body: { name: string; price: number }): Product {
    return this.productService.createProduct(body.name, body.price);
  }

  @Put('/update/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() body: { name: string; price: number },
  ): Product | undefined {
    return this.productService.updateProduct(id, body.name, body.price);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number): { success: boolean } {
    const success = this.productService.deleteProduct(id);
    return { success };
  }

}