import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { SORT_OPTIONS, type SortOptions } from "@/services/e-commerce";
import { ECommerceIcons } from "./e-commerce-icons.tsx";

type SortToggleProps = {
  sort: SortOptions;
  setSort: (sort: SortOptions) => void;
};

export const SortDropdown = ({ setSort, sort }: SortToggleProps) => {
  const [open, setOpen] = useState(false);

  const label = sort.sortBy
    ? // eslint-disable-next-line no-nested-ternary
      `${sort.sortBy !== "price" ? (sort.sortBy === "title" ? "Title" : "Favorites") : "Price"} ${sort.order === "asc" ? "↑" : sort.order === "desc" ? "↓" : ""}`
    : "Sort by";

  return (
    <div className="align-center relative inline-flex text-left">
      <button
        className="hidden h-full w-40 cursor-pointer rounded-md border-1 border-gray-400 bg-gray-50 px-4 hover:bg-gray-300 focus:outline-none lg:inline-flex lg:justify-between lg:align-middle"
        onClick={() => {
          return setOpen((prev) => {
            return !prev;
          });
        }}
      >
        <p className="h-auto self-center text-gray-400">{label} </p>
        <ECommerceIcons.ToggleIcon className="h-auto" fill="#99a1af" />
      </button>
      <button
        className="cursor-pointer rounded px-4 py-2 hover:bg-gray-300 focus:outline-none lg:hidden"
        onClick={() => {
          return setOpen((prev) => {
            return !prev;
          });
        }}
      >
        <ECommerceIcons.SortIcon />
      </button>
      <div
        className={`absolute top-10 right-1 z-10 mt-2 w-48 origin-top rounded bg-white shadow-md transition-all duration-200 ease-out ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
      >
        {open
          ? SORT_OPTIONS.map((option) => {
              return (
                <button
                  className={twMerge(
                    `block w-full cursor-pointer px-4 py-2 text-left`,
                    sort === option.value
                      ? "bg-blue-500 text-white hover:bg-blue-400"
                      : "hover:bg-gray-100",
                  )}
                  key={option.label}
                  onClick={() => {
                    setSort(option.value);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {option.icon ? option.icon : null}
                    <p>{option.label}</p>
                  </div>
                </button>
              );
            })
          : null}
      </div>
    </div>
  );
};
