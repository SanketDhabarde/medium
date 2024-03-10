import Blog from "../components/Blog";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import BlogSkeleton from "../components/BlogSkeleton";

function Blogs() {
  const { isLoading, blogs } = useBlogs();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Appbar />
      {isLoading ? (
        <>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </>
      ) : (
        blogs?.map((blog) => <Blog {...blog} key={blog.id} />)
      )}
    </div>
  );
}

export default Blogs;
