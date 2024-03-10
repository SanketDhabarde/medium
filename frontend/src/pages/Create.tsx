import { useState } from "react";
import Appbar from "../components/Appbar";
import Markdown from "react-markdown";
import axios from "axios";
import { BACKEND_URL } from "../config";

type ActiveTab = "edit" | "preview";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit");

  const handlePost = async () => {
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
    console.log(res.data);
  };

  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center w-full mt-10">
        <div className="w-11/12 lg:w-1/2 p-2">
          <textarea
            className="text-4xl font-bold resize-none my-3 min-h-5 w-full focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            placeholder="Title"
          />
          <div>
            <button
              className={`border rounded-md p-1 px-2 m-1 ${
                activeTab === "edit" && "bg-slate-400 text-white"
              } `}
              onClick={() => setActiveTab("edit")}
            >
              Edit
            </button>
            <button
              className={`border rounded-md p-1 px-2 m-1 ${
                activeTab === "preview" && "bg-slate-400 text-white"
              } `}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
            {activeTab === "edit" ? (
              <textarea
                className="resize-none my-3 min-h-96 w-full focus:outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell your story..."
                autoFocus
              />
            ) : (
              <Markdown className="prose max-w-none my-3">{content}</Markdown>
            )}
          </div>
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
