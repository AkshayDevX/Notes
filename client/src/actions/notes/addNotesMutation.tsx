import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface noteInput {
 title: string,
 content: string
}

async function addNote(input: noteInput) {
  const { data } = await axios.post("/api/v1/user/add-note", input);
  return data;
}

const useAddNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: noteInput) => addNote(input),
    onSuccess: (_data, _variables) => {
      toast.success("Notes Added Successful");
      queryClient.refetchQueries({ queryKey: ["getNotesByUser"], exact: true });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useAddNoteMutation;
