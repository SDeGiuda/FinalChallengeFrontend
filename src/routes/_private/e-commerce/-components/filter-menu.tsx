import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { ECommerceIcons } from "@/routes/_private/e-commerce/-components/e-commerce-icons.tsx";
import { FilterOption } from "./filter-option.tsx";

export type Option = {
  name: string;
  subOptions: Array<string>;
};

export const FilterMenu = ({ options }: { options: Option[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={twMerge(
        "align-center absolute top-0 left-0 z-10 flex flex-col bg-white",
        isOpen ? "h-full w-80 shadow-lg" : "max-h-full w-auto",
      )}
    >
      <button
        className="z-20 cursor-pointer pt-10 pl-10"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen && <ECommerceIcons.FilterIcon />}
        {isOpen ? <ECommerceIcons.CloseIcon /> : null}
      </button>

      {isOpen ? (
        <div className="bottom-0 left-0 z-10 flex min-h-screen min-w-1/2 flex-col items-start gap-8 overflow-y-auto pt-20 pl-10 after:absolute after:top-0 after:left-80 after:-z-20 after:h-screen after:w-[90vw] after:bg-black/30 after:content-['']">
          {options.map((option) => (
            <FilterOption key={option.name} option={option} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
