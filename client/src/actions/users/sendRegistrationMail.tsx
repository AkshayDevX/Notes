import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";

interface register {
  email: string;
  password: string;
}
async function sendMail(input: register) {
  const { data } = await axios.post("/api/v1/send-email", input);
  return data;
}

const useSendMailMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["sendMail"],
    mutationFn: (input: register) => sendMail(input),
    onSuccess: (_data, variables) => {
      toast.success(`Email Sent to ${variables.email}`);
      navigate({to: "/verify-email"})
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useSendMailMutation;
