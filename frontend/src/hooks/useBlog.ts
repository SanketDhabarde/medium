import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Blog } from "./useBlogs";

export const useBlog = () => {
  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    content: "",
    blogImage: "string",
    author: {
      name: "string",
      profileImage: "string",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getBlog(id || "");
  }, [id]);

  const getBlog = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlog(response.data.blog);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    blog,
  };
};
