import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "../pages/home";
import isAuthenticated from "../utils/authenticated";

export const Route = createFileRoute("/home")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: Home,
});
