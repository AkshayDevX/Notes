import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface noteInput {
  noteId: number;
}

async function deleteNote(input: noteInput) {
  const encodeId = btoa(input.noteId.toString());
  const { data } = await axios.delete(
    `/api/v1/user/note/delete/${encodeId}`
  );
  return data;
}

const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: noteInput) => deleteNote(input),
    onSuccess: (_data, _variables) => {
      toast.success("Note Deleted Successfully");
      queryClient.refetchQueries({ queryKey: ["getNotesByUser"], exact: true });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useDeleteNoteMutation;
