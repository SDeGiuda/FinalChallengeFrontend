import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type SignUpFormData, signUpSchema } from "@/services/sign-up-schema.tsx";
import { FormSection } from "./form-section.tsx";
import { icons } from "./icons.tsx";

type SignUpFormProps = { setHasSignedUp: (hasSignedUp: boolean) => void };
export const SignUpForm = ({ setHasSignedUp }: SignUpFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = () => {
    setHasSignedUp(true);
  };

  return (
    <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FormSection
        Icon={icons.EmailIcon}
        error={errors.email?.message}
        placeholder="Enter email"
        title="Email"
        type="email"
        {...register("email")}
      />
      <FormSection
        Icon={icons.UserIcon}
        error={errors.username?.message}
        placeholder="Enter username"
        title="Username"
        type="text"
        {...register("username")}
      />
      <FormSection
        Icon={icons.PasswordIcon}
        error={errors.password?.message}
        placeholder="Enter password"
        title="Password"
        type="password"
        {...register("password")}
      />
      <FormSection
        Icon={icons.PasswordIcon}
        error={errors.confirmPassword?.message}
        placeholder="Confirm password"
        title="Confirm Password"
        type="password"
        {...register("confirmPassword")}
      />
      <button
        className="mt-4 h-10 w-full cursor-pointer rounded-3xl bg-red-500 text-white"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};
