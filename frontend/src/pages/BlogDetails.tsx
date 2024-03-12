import Markdown from "react-markdown";
import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BLogDetailSkeleton from "../components/BLogDetailSkeleton";
import { useBlog } from "../hooks/useBlog";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
import EditBlog from "../components/EditBlog";

function BlogDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const { isLoading, blog } = useBlog(isEdit);
  const { id, title, content, author } = blog;
  const { user } = useAuth();
  return (
    <div>
      <Appbar />
      {!isEdit && (
        <div className="flex flex-col justify-center items-center w-full mt-10">
          {isLoading ? (
            <BLogDetailSkeleton />
          ) : (
            <div className="w-11/12 lg:w-1/2 p-2">
              <h1 className="text-4xl font-bold">{title}</h1>
              <div className="py-5 ">
                <Avatar type="medium" name={author.name} />
                <div className="text-slate-500 py-5 mt-3 pl-1">{`${Math.ceil(
                  content.length / 100
                )} min read`}</div>
              </div>
              {user?.id === author.id && (
                <div className="border-y-2 border-slate-400 p-2 flex justify-end">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                </div>
              )}
              <Markdown className="prose max-w-none my-3">{content}</Markdown>
            </div>
          )}
        </div>
      )}

      {isEdit && (
        <EditBlog
          id={id}
          initTitle={title}
          initContent={content}
          setIsEdit={() => setIsEdit(false)}
        />
      )}
    </div>
  );
}

export default BlogDetails;
