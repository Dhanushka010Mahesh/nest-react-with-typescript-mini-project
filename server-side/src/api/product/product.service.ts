import { Injectable } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = [];

  createProduct(name: string, price: number): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      name,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
  for (let i = 0; i < this.products.length; i++) {
    if (this.products[i].id === Number(id)) {
      return this.products[i]; // return when found
    }
  }
  return undefined; // return undefined if not found
}

  updateProduct(id: number, name: string, price: number): Product | undefined {
    const product = this.getProductById(id);
    if (product) {
      product.name = name;
      product.price = price;
    }
    return product;
  }

  deleteProduct(id: number): boolean {
    const product = this.getProductById(id);
    if (product) {
      this.products.splice(this.products.indexOf(product), 1);
      return true;
    }
    return false;
  }
}
