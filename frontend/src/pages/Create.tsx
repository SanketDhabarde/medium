import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import BlogContent from "../components/BlogContent";
import TextAreaInput from "../components/TextAreaInput";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blogs/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Appbar />
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
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
