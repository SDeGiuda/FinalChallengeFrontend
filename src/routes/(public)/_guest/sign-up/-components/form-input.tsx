import { type ComponentProps, type ComponentType, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { icons } from "./icons.tsx";

type FormSectionProps = {
  title: string;
  type?: string;
  Icon: ComponentType<ComponentProps<"svg">>;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ Icon, error, title, type, value, ...rest }: FormSectionProps) => (
  <div className="flex flex-col gap-1 font-manrope text-project-gray">
    <label className="text-xs" htmlFor={title}>
      {title}
    </label>
    <div
      className={twMerge(
        "flex gap-2 rounded-md bg-white px-3 py-3 align-middle transition-all duration-200 ease-out focus-within:shadow-lg",
        error && !value && "border-b-1 border-b-red-700",
      )}
    >
      <Icon className="h-auto" />
      <input
        autoComplete="on"
        className="w-full placeholder:font-manrope placeholder:text-project-gray focus:outline-none"
        id={title}
        key={title}
        placeholder={`Enter your ${title}`}
        type={type ? type : title.toLowerCase()}
        {...rest}
      />
      {type == "password" && <icons.EyeIcon className="h-auto" />}
    </div>
    {error ? (
      <p className="text-xs text-red-700" key={`${title} error`}>
        {error}
      </p>
    ) : null}
  </div>
);
