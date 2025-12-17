import axiosClient from "../api/axiosClient";

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}

export const productService = {
  getByCompany<T>(companyId: number, page = 1): Promise<PaginationResponse<T>> {
    return axiosClient.get("/products", {
      params: {
        company_id: companyId,
        page,
      },
    });
  },

  getById<T>(id: number) {
    return axiosClient.get<T>(`/products/${id}`).then(res => res.data);
  }
};
