import { Link } from "@tanstack/react-router";
import useLoginUserMutation from "../../actions/users/loginUser";

const Login = () => {
  const { mutate: login, isPending } = useLoginUserMutation();

  // Handle login form submission
  const handleLogin = (e: any) => {
    e.preventDefault();
    login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col w-96 p-10 rounded-lg shadow-lg justify-center items-center">
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow"
                name="email"
                required
                placeholder="Email"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                required
                className="grow"
                placeholder="Password"
              />
            </label>
            <button className="btn btn-wide mb-4" disabled={isPending}>
              Login
              {isPending && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
            <p className="text-sm">
              don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
