import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getIsLoggedIn } from "@/stores";

const PrivateLayout = () => <Outlet />;

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ location }) => {
    const isLoggedIn = getIsLoggedIn();

    if (!isLoggedIn) {
      throw redirect({ to: "/sign-up", search: { redirect: location.href } });
    }
  },
  component: PrivateLayout,
});
