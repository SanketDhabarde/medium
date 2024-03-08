import { Link, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import { SignInInput } from "@sanketdhabarde/common-app";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

function Signin() {
  const [input, setInput] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        input
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center flex-col w-full h-screen">
        <div className="w-4/5 md:w-1/2">
          <h1 className="font-bold text-2xl text-center">Log in account</h1>
          <p className="text-gray-400 text-center w-full">
            Don't have an account{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
          <LabelledInput
            label="Email"
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            placeholder="xyz@example.com"
          />
          <LabelledInput
            label="password"
            type="password"
            placeholder=""
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <Button label="Sign in" onClick={handleClick} />
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default Signin;
