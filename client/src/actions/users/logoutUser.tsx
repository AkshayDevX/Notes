import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";

async function logout() {
  await axios.get("/api/v1/logout");
}

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate({ to: "/" });
      queryClient.resetQueries({ queryKey: ["loginUser"], exact: true });
      queryClient.resetQueries({ queryKey: ["getNotesByUser"], exact: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("NotesUser");
    },
  });
};

export default useLogoutMutation;
