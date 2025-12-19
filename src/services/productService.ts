import axiosClient from "../api/axiosClient";
import {
  ProductSchema,
  ProductListSchema,
  type Product,
  type ProductList,
} from "../schemas/product.schema";

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}

export const productService = {
  async getByCompany(page = 1): Promise<ProductList> {
    const res = await axiosClient.get("/products", {
      params: { page },
    });

    return ProductListSchema.parse(res);
  },

  async getById(id: number): Promise<Product> {
    const res = await axiosClient.get(`/products/${id}`);
    return ProductSchema.parse(res.data);
  },
};
