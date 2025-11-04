import axios from "axios";

import { PRODUCTS_API_URL } from "@/services/e-commerce/constants.ts";
import type { GetProductsParams, ProductsResponse } from "./types";

export const getProducts = (params?: GetProductsParams) =>
  axios.get<ProductsResponse>(PRODUCTS_API_URL, { params });
