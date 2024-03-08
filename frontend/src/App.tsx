import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/blogs/:id" element={<BlogDetails/>}/>
      </Routes>
    </>
  );
}

export default App;
