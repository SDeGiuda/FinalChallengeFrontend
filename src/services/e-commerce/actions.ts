import { useInfiniteQuery } from "@tanstack/react-query";

import type { ProductsResponse, SortOptions } from "@/services/e-commerce/";
import { queries } from "./factories";

export const useProducts = (search?: string, sort?: SortOptions) => {
  return useInfiniteQuery<ProductsResponse, Error>({
    ...queries.list(search, sort),
    getNextPageParam: (lastPage: ProductsResponse) => {
      const productsSoFar = lastPage.skip + lastPage.limit;

      return productsSoFar < lastPage.total ? productsSoFar : undefined;
    },
    initialPageParam: 0,
  });
};
