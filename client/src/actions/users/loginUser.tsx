import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";

interface LoginInput {
  email: string;
  password: string;
}

async function login(input: LoginInput) {
  const { data } = await axios.post("/api/v1/login", input);
  return data;
}

const useLoginUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (_data, _variables) => {
      navigate({ to: "/home" });
      toast.success("Login Successful");
      localStorage.setItem("NotesUser", "isAuthenticated");
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useLoginUserMutation;
