import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JoinUs = () => {
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setpasswordType] = useState("password");
  const [username, setusername] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [registerStatus, setregisterStatus] = useState("");
  const [errorMessage,setErrorMessage] = useState("")


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
      axios.post("http://localhost:3000/user/register",{username,email,password})
      .then(res=>{
        if(res.data.message == "success"){
        setusername(""),
        setemail(""),
        setpassword(""),
        setregisterStatus("User Registered ✅"),
        setErrorMessage("")
        }
      }).catch(err=>{
        setErrorMessage("Email already exist"),
        setregisterStatus("");
      })
      
    }

  return (
    <>
      <div className="login w-full h-screen flex items-center justify-center">
        <form onSubmit={submitHandeler} className="w-96 h-9/12 flex flex-col justify-center items-center gap-12">
          <h1 className="text-4xl font-gelasio">Join Us Today</h1>
          <div className="inputs w-full px-8 flex flex-col gap-3 ">
            <div className="username relative bg-[#F0F0F0]  w-full flex items-center gap-1.5">
              <i className="ri-user-line text-zinc-500 absolute ml-2"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                name="username"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                required
                className="outline-none text-md w-full h-full px-3 py-2.5 pl-9 rounded"
              />
            </div>
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
              Sign Up
            </button>
            <div className="signWith">
                <p>Already a member? <Link to="/signin" className="underline">Sign in here</Link></p>
                <p className="text-center mt-3">{registerStatus}</p>
                <p className="text-center mt-3">{errorMessage}</p>
            </div>
        </form>
      </div>
    </>
  );
};

export default JoinUs;
