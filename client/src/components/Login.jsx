import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";   // import this

const Login = () => {

  const { checkAuth } = useContext(AuthContext);   // get function

  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setpasswordType] = useState("password");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  function showPassword() {
    setPasswordVisible(!PasswordVisible);
    setpasswordType(PasswordVisible ? "password" : "text");
  }

  async function submitHandeler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.message === "success") {

        await checkAuth();

        navigate("/");
      }

    } catch {
      setmessage("Invalid email or password");
    }
  }

  return (
    <div className="login w-full h-screen flex items-center justify-center">

      <form
        onSubmit={submitHandeler}
        className="w-96 h-9/12 flex flex-col justify-center items-center gap-12"
      >

        <h1 className="text-3xl mb-10 font-form font-extralight">
          Welcome Back
        </h1>

        {/* email */}
        <div className="inputs w-full px-8 flex flex-col gap-3">

          <div className="email relative bg-[#F0F0F0] w-full flex items-center">
            <i className="ri-mail-line text-zinc-500 absolute ml-2"></i>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="outline-none w-full px-3 py-2.5 pl-9 rounded"
            />
          </div>

          {/* password */}
          <div className="password relative bg-[#F0F0F0] w-full flex items-center">

            <i className="ri-key-2-line text-zinc-500 absolute ml-2"></i>

            <input
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="outline-none w-full px-3 py-2.5 pl-9 pr-10 rounded"
            />

            <i
              className={`ri-${PasswordVisible ? "eye" : "eye-off"}-line absolute right-3 text-zinc-500 cursor-pointer`}
              onClick={showPassword}
            ></i>

          </div>

        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-5 py-2 rounded-full cursor-pointer active:scale-95"
        >
          Sign In
        </button>

        <div>
          <p>
            Don't have an account?
            <Link to="/register" className="underline ml-1">
              Join us today
            </Link>
          </p>

          <p className="text-center mt-3 text-red-500">
            {message}
          </p>

        </div>

      </form>

    </div>
  );
};

export default Login;