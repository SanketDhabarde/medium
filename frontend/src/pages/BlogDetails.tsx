import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BLogDetailSkeleton from "../components/BLogDetailSkeleton";
import { useBlog } from "../hooks/useBlog";

function BlogDetails() {
  const { isLoading, blog } = useBlog();
  const { title, content, author, blogImage } = blog;
  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center w-full mt-10">
        {isLoading ? (
          <BLogDetailSkeleton />
        ) : (
          <div className="max-w-screen-lg p-2">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="py-5 border-b-2 border-slate-50">
              <Avatar
                type="medium"
                name={author.name}
                profileImage={author.profileImage}
              />
              <div className="text-slate-500 mt-3 pl-1">{`${Math.ceil(
                content.length / 100
              )} min read`}</div>
            </div>
            <img
              src={blogImage}
              alt="blog thumbnail"
              className="my-3 h-56 w-full object-cover"
            />
            <div className="text-lg">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
