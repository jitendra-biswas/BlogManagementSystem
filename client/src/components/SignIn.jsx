import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignIn = () => {
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setpasswordType] = useState("password");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  function showPassword() {
    setPasswordVisible(!PasswordVisible);
    if (!PasswordVisible) {
      setpasswordType("text");
    } else {
      setpasswordType("password");
    }
  }
   function submitHandeler(e){
      e.preventDefault();
      axios.post("http://localhost:3000/user/login",{email,password},{ withCredentials: true }).then(res=>{
        if(res.data.message == "success"){
          document.cookie = `success = ${res.data.success}`;
          window.location.reload();
          navigate("/dashboard");
        }
      })
      .catch(err=>{
        setmessage("Invalid email or password");  
      })
   }

  return (
    <>
      <div className="login w-full h-screen flex items-center justify-center">
        <form onSubmit={submitHandeler} className="w-96 h-9/12 flex flex-col justify-center items-center gap-12">
          <h1 className="text-4xl font-gelasio">Welcome Back</h1>
          <div className="inputs w-full px-8 flex flex-col gap-3 ">
            <div className="email relative bg-[#F0F0F0]  w-full flex items-center gap-1.5">
              <i className="ri-mail-line text-zinc-500 absolute ml-2"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
                className="outline-none text-md w-full h-full px-3 py-2.5 pl-9 rounded"
              />
            </div>
            <div className="password relative bg-[#F0F0F0]  w-full flex items-center gap-1.5">
              <i className="ri-key-2-line text-zinc-500 absolute ml-2"></i>
              <input
                type={passwordType}
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
                className="outline-none text-md w-full h-full px-3 py-2.5 pl-9 rounded pr-10"
              />
              <i
                className={`ri-${
                  PasswordVisible ? "eye" : "eye-off"
                }-line absolute right-3 text-zinc-500 cursor-pointer`}
                onClick={showPassword}
              ></i>
            </div>
            
          </div>
          <button
              type="submit"
              className="bg-gray-900 hover:bg-[#F0F0F0] hover:text-black hover:outline-1 transition-all text-white px-5 py-1.5 pb-2 rounded-full text-sm font-medium cursor-pointer max-md:w-23 max-md:py-2 max-md:pb-2.5 active:scale-95"
            >
              Sign In
            </button>
            <div className="signWith">
                <p>Dont't have an account? <Link to="/joinus" className="underline">Join us today</Link></p>
                <p className="text-center mt-3">{message}</p>
            </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
