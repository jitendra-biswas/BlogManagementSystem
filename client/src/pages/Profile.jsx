import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NoBlogsYet from "../components/NoBlogsYet";
const Profile = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState("");
  const [Handle, setHandle] = useState("");
  const [Bio, setBio] = useState("");
  const [ProfileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (User) {
      setHandle(User.username);
      setBio(User.bio);
      setProfileImage(User.profileImage);
    }
  }, [User]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/getUsers", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      });
  }, []);

  return (
    <>
      <div className="pt-20 w-full h-screen flex">
        <div className="right w-[30%] h-full border-l-2 border-l-gray-600/10 pl-8 pt-5 flex flex-col gap-3">
          <h1 className="text-2xl text-zinc-900">My Profile</h1>
          <div className="flex items-center gap-10">
            <div className="profile w-42 h-42 rounded-full overflow-hidden cursor-pointer mt-5">
              <img
                src={
                  ProfileImage
                    ? ProfileImage
                    : "https://plus.unsplash.com/premium_photo-1723677830933-4a9d84d17b4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
                }
                className="w-full h-full object-cover object-center"
                alt=""
              />
            </div>
            <div>
              <p className="w-full text-xl text-zinc-700 font-semibold">
                {Handle}
              </p>
              <button
                onClick={() => navigate("/dashboard/editProfile")}
                className="w-fit px-3 py-2 rounded bg-[#F0F0F0] mt-3 text-sm font-semibold text-zinc-700 active:scale-95 cursor-pointer hover:bg-zinc-200"
              >
                Edit Profile
              </button>
              <p className="text-zinc-700 mt-2">
                {Bio ? Bio : "Nothing to read here..."}
              </p>
            </div>
          </div>

          <Link to="/dashboard/dashboardblogs" className="mt-10 w-fit text-blue-700">More Blogs Here <i class="ri-arrow-right-long-line"></i></Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
