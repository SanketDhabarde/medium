import Markdown from "react-markdown";
import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BLogDetailSkeleton from "../components/BLogDetailSkeleton";
import { useBlog } from "../hooks/useBlog";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
import EditBlog from "../components/EditBlog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function BlogDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const { isLoading, blog } = useBlog(isEdit);
  const { id, title, content, author } = blog;
  const { user } = useAuth();
  const navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.msg) {
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                <div className="border-y-2 border-slate-100 p-2 flex justify-end gap-3">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex gap-1 text-slate-500 items-center"
                  >
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
                    Edit
                  </button>
                  <button
                    onClick={deleteBlog}
                    className="flex gap-1 text-slate-500 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
              <Markdown className="prose max-w-none my-4">{content}</Markdown>
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
