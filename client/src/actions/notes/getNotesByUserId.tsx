import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getNotesByUser() {
  const { data } = await axios.get("/api/v1/user/notes");
  return data;
}

const useGetNotesByUserQuery = () => {
  return useQuery({
    queryKey: ["getNotesByUser"],
    queryFn: getNotesByUser,
  });
};

export default useGetNotesByUserQuery;
