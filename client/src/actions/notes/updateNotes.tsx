import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface noteInput {
  noteId?: number;
  title?: string;
  content?: string;
}

async function updateNote(input: noteInput) {
  const { data } = await axios.put("/api/v1/user/note/edit", input);
  return data;
}

const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: noteInput) => updateNote(input),
    onSuccess: (_data, _variables) => {
      toast.success("Notes Updated Successful");
      queryClient.refetchQueries({ queryKey: ["getNotesByUser"], exact: true });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useUpdateNoteMutation;
