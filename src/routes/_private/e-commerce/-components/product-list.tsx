import { type JSX, useEffect, useRef, useState } from "react";

import { useProducts } from "@/services";
import { FAVORITE_SORT_OPTION, type SortOptions } from "@/services/e-commerce";
import { ProductCard } from "./product-card.tsx";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductListProps = { sort: SortOptions; search?: string };
export const ProductList = ({ search, sort }: ProductListProps): JSX.Element => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(search, sort);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const makeFavorite = (product: Product): void => {
    setFavoriteProducts((prev) => {
      return prev.find((p) => {
        return p.id === product.id;
      })
        ? prev.filter((p) => {
            return p.id !== product.id;
          })
        : [...prev, product];
    });
  };

  let products: Product[];
  if (sort.sortBy == FAVORITE_SORT_OPTION) {
    products = favoriteProducts;
  } else {
    products =
      data?.pages.flatMap((page) => {
        return page.products;
      }) ?? [];
  }
  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (
      entry.isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      sort.sortBy != FAVORITE_SORT_OPTION
    ) {
      fetchNextPage();
    }
  };

  const observer = new IntersectionObserver(intersectionCallback, {
    root: null,
    rootMargin: "200px",
    threshold: 0.1,
  });

  useEffect(() => {
    const current = loadMoreRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [loadMoreRef, hasNextPage, isFetchingNextPage, observer]);

  if (!products.length && isFetchingNextPage) {
    return <p>Loading...</p>;
  }
  if (!products.length && !isFetchingNextPage) {
    return <p>There is nothing to show</p>;
  }

  return (
    <div className="mt-5 flex w-full flex-col items-center gap-20">
      <div className="grid grid-cols-1 justify-items-center gap-40 md:mx-20 md:grid-cols-2 md:gap-9 lg:grid-cols-3">
        {products.map((product) => {
          return (
            <ProductCard
              favorites={favoriteProducts}
              key={product.id}
              makeFavorite={makeFavorite}
              product={product}
            />
          );
        })}
      </div>
      <div ref={loadMoreRef}>{isFetchingNextPage ? <p>Loading ...</p> : null}</div>
    </div>
  );
};
