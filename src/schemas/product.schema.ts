import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  image: z.string().nullish(),
  description: z.string().nullish(),
});

export const ProductListSchema = z.object({
  data: ProductSchema.array(),
  current_page: z.number(),
  last_page: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
