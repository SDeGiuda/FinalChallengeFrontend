import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getProducts } from "@/services/e-commerce/api.ts";
import { PRODUCTS_PAGE_LIMIT } from "@/services/e-commerce/constants.ts";
import type { GetProductsParams, SortOptions } from "@/services/e-commerce/types.ts";

export const queries = createQueryKeys("e-commerce", {
  list: (search?: string, sort?: SortOptions) => {
    return {
      queryKey: ["e-commerce", sort, search] as const,
      queryFn: async ({ pageParam = 0 }: { pageParam?: number; queryKey: readonly unknown[] }) => {
        const params: GetProductsParams = {
          select: "id,title,price,description,thumbnail",
          limit: PRODUCTS_PAGE_LIMIT,
          skip: pageParam as number,
        };
        if (sort?.sortBy) {
          params.sortBy = sort.sortBy;
          params.order = sort.order;
        }

        if (search) {
          params.q = search;
        }

        const res = await getProducts(params);

        return res.data;
      },
    };
  },
});
