import type { ReactNode } from "react";

import { ECommerceIcons } from "@/routes/_private/e-commerce/-components/e-commerce-icons.tsx";
import type { SortOptions } from "@/services/e-commerce/types.ts";

export const SORT_OPTIONS: { label: string; value: SortOptions; icon?: ReactNode }[] = [
  {
    label: "My Favorites",
    value: { sortBy: "favorites", order: null },
    icon: ECommerceIcons.HeartIcon(),
  },
  { label: "Price - from low to high", value: { sortBy: "price", order: "asc" }, icon: null },
  { label: "Price - from high to low", value: { sortBy: "price", order: "desc" }, icon: null },
  { label: "Alphabetical", value: { sortBy: "title", order: "asc" }, icon: null },
  { label: "None", value: { sortBy: null, order: null }, icon: null },
];
export const FAVORITE_SORT_OPTION = "favorites";

export const PRODUCTS_API_URL = "https://dummyjson.com/products/search";
export const PRODUCTS_PAGE_LIMIT = 20;
