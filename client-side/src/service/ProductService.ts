import api from "./api";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductPayload {
  name: string;
  price: number;
}

export const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>("/product/all");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch products");
    }
  },

  createProduct: async (productData: ProductPayload): Promise<Product> => {
    try {
      const response = await api.post<Product>("/product/create", productData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create product");
    }
  },

  updateProduct: async (id: number, productData: ProductPayload): Promise<Product> => {
    try {
      const response = await api.put<Product>(`/product/update/${id}`, productData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update product");
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await api.delete(`/product/delete/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete product");
    }
  },
};
