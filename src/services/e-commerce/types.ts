import type { Product } from "@/routes/_private/e-commerce/-components/product-list.tsx";

export type GetProductsParams = {
  select: string;
  limit: number;
  skip: number;
  sortBy?: string | null;
  order?: string | null;
  q?: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type SortOptions =
  | { sortBy: "title" | "price"; order: "asc" | "desc" }
  | { sortBy: null; order: null }
  | {
      sortBy: "favorites";
      order: null;
    };
