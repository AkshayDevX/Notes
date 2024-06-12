import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold">Not found!</p>
      <Link className="text-xl font-bold underline hover:text-blue-500" to="/">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;