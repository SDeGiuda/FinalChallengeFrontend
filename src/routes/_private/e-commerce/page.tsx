import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute, stripSearchParams, useNavigate } from "@tanstack/react-router";

import { ECommerceIcons } from "@/routes/_private/e-commerce/-components/e-commerce-icons.tsx";
import { FilterMenu } from "@/routes/_private/e-commerce/-components/filter-menu.tsx";
import { ProductList } from "@/routes/_private/e-commerce/-components/product-list.tsx";
import { SortDropdown } from "@/routes/_private/e-commerce/-components/sort-dropdown.tsx";
import type { SortOptions } from "@/services/e-commerce";

const options = [
  { name: "New in", subOptions: [] },
  {
    name: "Clothing",
    subOptions: ["New in", "See all", "Coats", "Beach Clothes", "Sweaters & hoodies", "Shirts"],
  },
  { name: "Footwear", subOptions: [] },
  { name: "Accessories", subOptions: [] },
];

export const ECommerce = () => {
  const navigate = useNavigate();
  const { order, search, sortBy } = Route.useSearch();
  const sort = { order, sortBy } as SortOptions;
  const setSort = (newSort: SortOptions) => {
    navigate({
      to: Route.fullPath,
      search: {
        search,
        sortBy: newSort.sortBy,
        order: newSort.order,
      },
    });
  };
  const setSearch = (newSearch: string) => {
    navigate({
      to: Route.fullPath,
      search: {
        search: newSearch,
        sortBy,
        order,
      },
    });
  };

  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="z-0 p-8">
      <header className="flex flex-col">
        <div className="flex justify-between gap-4 pb-8 align-middle md:justify-around">
          <FilterMenu options={options} />
          <div className="z-0 aspect-square w-8 bg-white md:hidden" />
          <h1 className="font-ubuntu text-4xl font-medium">Find what you need</h1>
          <div className="flex w-auto justify-end gap-4 align-top lg:w-1/2">
            <div className="relative hidden w-60 lg:block">
              <input
                className="h-10 w-full rounded-lg border border-gray-400 py-3 pl-5 text-start text-gray-400"
                id="search-input"
                onInput={(e: FormEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
                placeholder="Search"
                type="text"
                value={search ?? ""}
              />
              <ECommerceIcons.SearchIcon className="absolute top-2 right-4" />
            </div>
            <SortDropdown setSort={setSort} sort={sort} />
          </div>
        </div>
        <div className="relative block w-full lg:hidden">
          <input
            className="my-3 h-10 w-full rounded-lg border border-black py-3 pl-6 text-start text-black lg:hidden"
            id="search-input-mobile"
            onInput={(e: FormEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
            placeholder="Search"
            type="text"
            value={search != "" ? search : undefined}
          />
          <ECommerceIcons.SearchIcon className="absolute top-6 right-4" />
        </div>
      </header>
      <main className="w-full">
        <ProductList search={debouncedSearch} sort={sort} />
      </main>
    </div>
  );
};
export type ProductSearchParams = SortOptions & {
  search?: string;
};

const defaultParams = { order: null, search: "", sortBy: null };

export const Route = createFileRoute("/_private/e-commerce/")({
  component: ECommerce,
  validateSearch: (search?: Record<string, unknown>): ProductSearchParams => {
    const sort = search as SortOptions;
    const params: ProductSearchParams = {};

    if (sort?.sortBy) {
      params.sortBy = sort.sortBy as "title" | "price" | "favorites";
    }

    if (sort?.order) {
      params.order = sort.order as "asc" | "desc";
    }

    if (search?.search) {
      params.search = search?.search as string;
    }

    return params;
  },
  search: { middlewares: [stripSearchParams(defaultParams)] },
});
