import { type JSX, useState } from "react";

import { ECommerceIcons } from "@/routes/_private/e-commerce/-components/e-commerce-icons.tsx";
import type { Option } from "./filter-menu.tsx";

export const FilterOption = ({ option }: { option: Option }): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full px-5">
      <button
        className="inline-flex w-full cursor-pointer justify-between text-orange-500"
        onClick={() => {
          return setOpen((prev) => {
            return !prev;
          });
        }}
      >
        {option.name}
        <ECommerceIcons.ToggleIcon
          className={`${open ? "rotate-180 lg:rotate-90" : "rotate-0 lg:-rotate-90"}`}
        />
      </button>
      <ul
        className={`flex origin-top flex-col items-start gap-8 pt-3 transition-all duration-500 ease-out lg:absolute lg:-top-0 lg:left-80 lg:z-10 lg:h-full lg:w-60 lg:origin-left lg:bg-white lg:px-5 lg:pt-40 lg:text-orange-500 lg:shadow-md ${open ? "scale-y-100 opacity-100 lg:translate-x-0" : "scale-y-0 opacity-0 lg:-translate-x-80 lg:scale-y-100"}`}
      >
        {open
          ? option.subOptions.map((subOption: string) => {
              return (
                <li
                  className="w-full justify-items-start lg:inline-flex lg:justify-between"
                  key={subOption}
                >
                  <p> {subOption}</p>
                  <ECommerceIcons.ToggleIcon className="hidden w-3 lg:block lg:-rotate-90" />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
