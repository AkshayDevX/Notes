import { Link } from "@tanstack/react-router";
import useGetDummyUsersQuery from "../../actions/users/getAllDummyUsers";
import { useEffect, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import Loader from "../../components/loader";
import useRegisterUserMutation from "../../actions/users/verifyAndRegister";

const VerifyMail = () => {
  const { data, isLoading } = useGetDummyUsersQuery();
  const { mutate: register, } = useRegisterUserMutation();
  const [userExists, setUserExists] = useState<Boolean>(false);
  const route = getRouteApi("/verify-email/$token");
  const { token } = route.useParams();

  interface User {
    id: number;
    email: string;
    token: string;
  }

  // registering user
  useEffect(() => {
    if (data) {
      const users = data.users;
      const user = users.find((user: User) => user.token === token);
      console.log(user);
      if (user) {
        setUserExists(true);
        register({ token: token });
      } else {
        setUserExists(false);
      }
    }
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          {userExists ? (
            <>
              <p className="text-2xl font-bold">
                your mail is verified
                <span className="text-green-500 ml-2">✓</span>
              </p>
              <p className="text-xl mt-4">please wait while we redirect you to home page</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold">
                Link is Expired
                <span className="ml-2">🥲</span>
              </p>
              <Link to="/register">
                <button className="btn mt-6">Sign up</button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyMail;
