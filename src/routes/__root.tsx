import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { z } from "zod";

import { env } from "@/config/env";
const RootComponent = () => (
  <div className="flex min-h-screen flex-col">
    <Outlet />

    {env.VITE_APP_ENV === "local" && env.VITE_ENABLE_DEVTOOLS ? (
      <Suspense>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </Suspense>
    ) : null}
  </div>
);

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ search }) => {
    if (location.pathname !== "/sign-up" && location.pathname !== "/e-commerce") {
      throw redirect({ to: search.redirect || "/sign-up" });
    }
  },
});
