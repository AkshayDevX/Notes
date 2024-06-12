import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";

interface registerUser {
  token: string;
}
async function register(input: registerUser) {
  const { data } = await axios.post("/api/v1/register", input);
  return data;
}

const useRegisterUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (input: registerUser) => register(input),
    onSuccess: (_data) => {
      toast.success("registration Successful");
      localStorage.setItem("NotesUser", "isAuthenticated");
      navigate({ to: "/home" });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useRegisterUserMutation;
