import { Link } from "react-router-dom";
import Quote from "../components/Quote";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import { useState } from "react";
import { SignupInput } from "@sanketdhabarde/common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Signup() {
  const [input, setInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        input
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center flex-col w-full h-screen">
        <div className="w-4/5 md:w-1/2">
          <h1 className="font-bold text-2xl text-center">Create an account</h1>
          <p className="text-gray-400 text-center w-full">
            Already have an account{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </p>
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            value={input.name || ""}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <LabelledInput
            label="Email"
            placeholder="xyz@example.com"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <LabelledInput
            label="password"
            type="password"
            placeholder=""
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <Button label="Sign up" onClick={handleClick} />
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default Signup;
