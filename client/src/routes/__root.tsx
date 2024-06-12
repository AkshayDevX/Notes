import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "react-hot-toast";
import NotFound from "../pages/NotFound";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      {/* <TanStackRouterDevtools />
      <ReactQueryDevtools /> */}
    </>
  ),
  notFoundComponent: NotFound
});
