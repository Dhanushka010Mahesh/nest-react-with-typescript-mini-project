// import api from "./api";

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// export interface ProductPayload {
//   name: string;
//   price: number;
// }

// export const ProductService = {
//   getAllProducts: async (): Promise<Product[]> => {
//     try {
//       const response = await api.get<Product[]>("/product/all");
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch products");
//     }
//   },

//   createProduct: async (productData: ProductPayload): Promise<Product> => {
//     try {
//       const response = await api.post<Product>("/product/create", productData);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to create product");
//     }
//   },

//   updateProduct: async (id: number, productData: ProductPayload): Promise<Product> => {
//     try {
//       const response = await api.put<Product>(`/product/update/${id}`, productData);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to update product");
//     }
//   },

//   deleteProduct: async (id: number): Promise<void> => {
//     try {
//       await api.delete(`/product/delete/${id}`);
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to delete product");
//     }
//   },
// };

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

// Result wrapper types for better error handling
export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const ProductService = {
  getAllProducts: async (): Promise<ServiceResult<Product[]>> => {
    try {
      const response = await api.get<Product[]>("/product/all");
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error fetching products:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch products",
      };
    }
  },

  createProduct: async (productData: ProductPayload): Promise<ServiceResult<Product>> => {
    try {
      const response = await api.post<Product>("/product/create", productData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error creating product:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create product",
      };
    }
  },

  updateProduct: async (id: number, productData: ProductPayload): Promise<ServiceResult<Product>> => {
    try {
      const response = await api.put<Product>(`/product/update/${id}`, productData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error updating product:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update product",
      };
    }
  },

  deleteProduct: async (id: number): Promise<ServiceResult<void>> => {
    try {
      await api.delete(`/product/delete/${id}`);
      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error deleting product:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete product",
      };
    }
  },
};