import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: Date,
  author: {
    id: number,
    name: string;
  };
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: authHeader,
        },
      });
      setBlogs(response.data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    blogs,
  };
};
