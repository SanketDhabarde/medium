import React, { useState } from "react";
import Markdown from "react-markdown";

type ActiveTab = "edit" | "preview";

interface BlogContentProp {
  content: string;
  setContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BlogContent = ({ content, setContent }: BlogContentProp) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit");

  return (
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
          onChange={setContent}
          placeholder="Tell your story..."
          autoFocus
        />
      ) : (
        <Markdown className="prose max-w-none my-3">{content}</Markdown>
      )}
    </div>
  );
};

export default BlogContent;
