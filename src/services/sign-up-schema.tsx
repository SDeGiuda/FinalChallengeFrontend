import { z } from "zod";

const allowedDomains = ["@gmail.com", "@hotmail.com", "@lightit.io"];

export const signUpSchema = z
  .object({
    email: z.email().refine((val) => allowedDomains.some((domain) => val.endsWith(domain)), {
      message: "Email domain not allowed",
    }),
    username: z
      .string()
      .min(1, "Username cannot be empty")
      .regex(/^[a-z]+$/, "Only lowercase letters allowed"),
    password: z
      .string()
      .min(1, "Password cannot be empty")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
