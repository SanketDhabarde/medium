import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface Blog {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
    blogImage: string;
  }

function BlogDetails() {
  const [blog, setBlog] = useState<Blog>();
  const { id } = useParams();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
      setBlog(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>BlogDetails</div>;
}

export default BlogDetails;
