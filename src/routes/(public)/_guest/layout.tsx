import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { getIsLoggedIn } from "@/stores";

const GuestLayout = () => <Outlet />;

export const Route = createFileRoute("/(public)/_guest")({
  component: GuestLayout,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ search }) => {
    const isLoggedIn = getIsLoggedIn();

    if (isLoggedIn) {
      throw redirect({ to: search.redirect || "/e-commerce" });
    }
  },
});
