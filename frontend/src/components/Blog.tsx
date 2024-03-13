import { Link } from "react-router-dom";
import { Blog as BlogType } from "../hooks/useBlogs";
import Avatar from "./Avatar";
import { format } from "date-fns";

const Blog = ({ id, title, content, author, publishedDate }: BlogType) => {
  return (
    <Link
      to={`/blogs/${id}`}
      className="w-11/12 lg:w-1/2 my-3 border-b-2 border-slate-100 p-3"
    >
      <div className="flex items-center gap-2">
        <Avatar type="small" name={author.name} />
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="text-sm text-slate-500">
          {format(publishedDate, "MMMM do, yyyy")}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-lg lg:text-xl max-w-xs md:max-w-lg">
            {title.length > 100 ? title.slice(0, 100) + "..." : title}
          </h1>
          <p className="max-w-lg hidden sm:block">
            {content.length > 200 ? content.slice(0, 200) + "..." : content}
          </p>
          <div className="text-slate-500 mt-3">{`${Math.ceil(
            content.length / 100
          )} min read`}</div>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
