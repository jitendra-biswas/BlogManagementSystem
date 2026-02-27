import React, { useRef, useState } from "react";
import axios from "axios";
import LoginedNav from "../components/LoginedNav";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [Image, setImage] = useState("");
  const [ProfileImage, setProfileImage] = useState("")
  const [User, setUser] = useState();
  const [username, setUserName] = useState("");
  const [Handle, setHandle] = useState("")
  const [Bio, setBio] = useState("")

useEffect(() => {
  if (User) {
    setUserName(User.username);
    setHandle(User.handle) 
    setBio(User.bio)
    setProfileImage(User.profileImage)
  }
}, [User]);


   
  async function getUser(){
    try {
      const  response = await axios.get("http://localhost:3000/api/auth/getUsers",{withCredentials:true});
      setUser(response.data.user);
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {
    getUser();
    
  }, [])

const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("handle", Handle);
    formData.append("bio", Bio);
    if (Image) formData.append("image", Image);

    const res = await axios.put(
      "http://localhost:3000/api/auth/updateProfile",
      formData,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.message === "success") {
              toast.success("Update successfully!",{position:"top-center"})
      
      // Optional: Update local state
      setUser(res.data.user);
    }
  } catch (error) {
    console.error(error);
            toast.error("Something went wrong!",{position:"top-center"})
    
  }
};

  
  return (
    <>
      <div className="flex w-full h-screen">
        <LoginedNav />
        <div className="w-full flex  pt-20 px-10 max-sm:px-3 ">
          <form className="flex flex-col w-full" onSubmit={submitHandler}>
            <div className="left w-[25%] flex flex-col gap-5 pl-5">
              <h2 className="w-96 font-semibold text-xl">Edit Profile</h2>

              <label htmlFor="uploadImage">
                <div className="profile_image w-40 h-40 rounded-full overflow-hidden cursor-pointer active:scale-98">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    id="uploadImage"
                    className="hidden"
                  ></input>
                  <img
                    src={Image ? URL.createObjectURL(Image) : ProfileImage ? ProfileImage : "https://plus.unsplash.com/premium_photo-1723677830933-4a9d84d17b4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </label>
            </div>
            <div className="right w-[75%] h-screen flex flex-col">
              <div className="flex gap-5 max-md:gap-5 max-sm:gap-3">
                {/* Update Name */}
                <div className="title mt-5">
                  <input
                    type="text"
                    placeholder="Update Name"
                    value={username}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    className="max-sm:text-sm w-[24vw] max-lg:w-[25vw] max-md:w-[40vw] max-sm:w-[45vw] h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
                  />
                </div>

                {/* Email Address */}
                <div className="title mt-5">
                  <input
                    type="text"
                    value={User?User.email : ""}
                    disabled
                    className="max-sm:text-sm w-[24vw] max-lg:w-[25vw] max-md:w-[40vw] max-sm:w-[45vw] h-12 px-3 text-gray-400 mt-2 bg-zinc-100 rounded"
                  />
                </div>
              </div>

              {/* Udpate handle */}
              <div>
                <div className="title mt-5">
                  <input
                    type="text"
                    value={Handle}
                    onChange={(e)=>{setHandle(e.target.value)}}
                    className="w-[50vw] max-md:w-[83vw] h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
                  />
                </div>
                <p className="text-zinc-500 mt-1 max-md:w-[90vw]">
                  Choose your unique handle by adding letters and numbers.
                </p>
              </div>

             {/* Update/write bio */}
              <textarea
                className="w-[50vw] max-md:w-[83vw]  h-[20vh] max-sm:h-[10vh] mt-10 p-3 rounded border-2 border-zinc-300  outline-0"
                placeholder="Bio"
                value={Bio}
                onChange={(e)=>{setBio(e.target.value)}}
              ></textarea>

              <button
                type="submit"
                className="px-10 py-2 w-fit bg-[#F4F4F4] hover:bg-[#ebebeb] rounded-full mt-4 active:scale-98 cursor-pointer"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
