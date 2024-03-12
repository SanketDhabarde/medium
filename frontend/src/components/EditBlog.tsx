import { useState } from "react";
import TextAreaInput from "./TextAreaInput";
import BlogContent from "./BlogContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface EditBlogProps {
  id: string;
  initTitle: string;
  initContent: string;
  setIsEdit: () => void;
}

function EditBlog({ id, initTitle, initContent, setIsEdit }: EditBlogProps) {
  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);

  const handlePost = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id,
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEdit();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <div className="w-11/12 lg:w-1/2 p-2">
        <TextAreaInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <BlogContent
          content={content}
          setContent={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handlePost}
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}

export default EditBlog;
