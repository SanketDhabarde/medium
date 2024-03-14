import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Appbar = () => {
  const { user, saveUser } = useAuth();
  const handleLogout = () => {
    saveUser(null);
    localStorage.clear();
  };
  return (
    <div className="flex justify-between items-center w-full px-7 py-3 border-b-2 border-slate-100 mb-2">
      <Link to={"/blogs"} className="font-bold">
        Blog App
      </Link>
      <div className="flex justify-center items-center gap-6">
        <Link to={"/create"} className="flex gap-1 text-slate-500 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Write
        </Link>
        <button onClick={handleLogout} className="text-slate-500">
          logout
        </button>
        <div
          className={`relative inline-flex items-center justify-center h-8 w-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {user ? user.name[0] : "U"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
