import { useEffect, useState } from "react";
import uselogoutMutation from "../../actions/users/logoutUser";
import useGetLoginUserQuery from "../../actions/users/getUserProfile";
import { Link } from "@tanstack/react-router";

const Header = ({ handleSearchTerm }: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { mutate: logout } = uselogoutMutation();

  const { data } = useGetLoginUserQuery();
  if (!data && localStorage.getItem("NotesUser") === "isAuthencticated") {
    localStorage.removeItem("NotesUser");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar bg-base-100 lg:py-5 md:py-5 py-2 shadow-md sticky top-0 z-20 bg-opacity-95 backdrop-blur-md">
      {isMobile ? (
        <>
          <div className="mx-auto flex flex-col justify-center items-center">
            <div className="flex">
              <Link to="/home">
                <p className="flex btn btn-ghost hover:bg-transparent text-2xl font-bold mb-1 font-sedan">
                  Notes
                </p>
              </Link>
              <button
                className="absolute right-1 btn btn-ghost"
                onClick={() => logout()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex relative mb-1">
              <input
                type="text"
                placeholder="Search notes.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={() => handleSearchTerm(searchTerm)}
                className="input input-bordered input-sm h-9 w-80 rounded-full"
              />
              <div
                className="absolute btn btn-ghost btn-circle btn-sm h-9 right-0"
                onClick={() => handleSearchTerm(searchTerm)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <Link to="/home">
              <p className="btn btn-ghost hover:bg-transparent text-2xl font-bold font-sedan">
                Notes
              </p>
            </Link>
          </div>
          <div className="flex relative right-5">
            <input
              type="text"
              placeholder="Search notes.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={() => handleSearchTerm(searchTerm)}
              className="input input-bordered w-96 rounded-full"
            />
            <div
              className="absolute btn btn-ghost btn-circle right-0"
              onClick={() => handleSearchTerm(searchTerm)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button className="btn btn-ghost mx-2" onClick={() => logout()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
