import { ECommerceIcons } from "@/routes/_private/e-commerce/-components/e-commerce-icons.tsx";
import type { Product } from "./product-list.tsx";

type ProductCardProps = {
  product: Product;
  makeFavorite: (product: Product) => void;
  favorites: Product[];
};

export const ProductCard = ({ favorites, makeFavorite, product }: ProductCardProps) => {
  const isFavorite = favorites.some((prod) => prod.id === product.id);

  return (
    <div className="z-0 flex h-120 w-60 flex-col justify-between gap-2 transition-transform duration-300 ease-in-out hover:scale-107">
      <img className="h-4/8" src={product.thumbnail} />
      <h3 className="h-1/8 font-ubuntu text-2xl text-dark-gray"> {product.title}</h3>
      <p className="h-2/8 text-center font-manrope text-sm font-light text-light-gray">
        {product.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-manrope font-light text-light-gray"> € {product.price}</p>
        <ECommerceIcons.HeartIcon
          fill={isFavorite ? "red" : "none"}
          onClick={() => makeFavorite(product)}
        />
      </div>
    </div>
  );
};
