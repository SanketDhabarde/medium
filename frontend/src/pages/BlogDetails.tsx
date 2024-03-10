import Markdown from "react-markdown";
import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BLogDetailSkeleton from "../components/BLogDetailSkeleton";
import { useBlog } from "../hooks/useBlog";

function BlogDetails() {
  const { isLoading, blog } = useBlog();
  const { title, content, author } = blog;
  return (
    <div>
      <Appbar />

      <div className="flex flex-col justify-center items-center w-full mt-10">
        {isLoading ? (
          <BLogDetailSkeleton />
        ) : (
          <div className="w-11/12 lg:w-1/2 p-2">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="py-5 border-b-2 border-slate-50">
              <Avatar
                type="medium"
                name={author.name}
              />
              <div className="text-slate-500 mt-3 pl-1">{`${Math.ceil(
                content.length / 100
              )} min read`}</div>
            </div>
            <Markdown className="prose max-w-none my-3">{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
