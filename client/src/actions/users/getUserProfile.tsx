import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getLoginUser() {
  const { data } = await axios.get("/api/v1/user/me");
  return data;
}

const useGetLoginUserQuery = () => {
  return useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser,
  });
};

export default useGetLoginUserQuery;
