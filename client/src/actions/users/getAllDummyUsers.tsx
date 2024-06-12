import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getDummyUsers() {
  const { data } = await axios.get("/api/v1/users/dummy");
  return data;
}

const useGetDummyUsersQuery = () => {
  return useQuery({
    queryKey: ["dummyUsers"],
    queryFn: getDummyUsers,
  });
};

export default useGetDummyUsersQuery;
