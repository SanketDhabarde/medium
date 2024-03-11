import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Create from "../pages/Create";
import RequiresAuth from "./RequiresAuth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/blogs"
        element={
          <RequiresAuth>
            <Blogs />
          </RequiresAuth>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <RequiresAuth>
            <BlogDetails />
          </RequiresAuth>
        }
      />
      <Route
        path="/create"
        element={
          <RequiresAuth>
            <Create />
          </RequiresAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
