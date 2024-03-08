import Blog from "../components/Blog";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";

function Blogs() {
  const { isLoading, blogs } = useBlogs();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Appbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        blogs?.map((blog) => <Blog {...blog} />)
      )}
    </div>
  );
}

export default Blogs;
