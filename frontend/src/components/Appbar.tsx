import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center w-full px-7 py-3 border-b-2 border-slate-50 mb-2">
      <Link to={"/blogs"} className="font-bold">
        Medium
      </Link>
      <div className="flex gap-3">
        <Link
          to={"/create"}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create
        </Link>
        <div
          className={`relative inline-flex items-center justify-center h-8 w-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {"U"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
