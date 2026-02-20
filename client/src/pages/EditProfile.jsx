import React from "react";
import axios from "axios";
import LoginedNav from "../components/LoginedNav";

const EditProfile = () => {
  

  return (
    <>
      <div className="flex w-full">
        <LoginedNav />
        <div className="w-full flex min-h-screen pt-20 ">
          <div className="left w-[25%] h-screen flex flex-col gap-5 pl-5">
            <h2>Edit Profile</h2>
            <form>
              <label htmlFor="uploadImage">
                <div className="profile_image w-42 h-42 rounded-full overflow-hidden cursor-pointer active:scale-98">
                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
                  ></input>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1723677830933-4a9d84d17b4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </label>
              <button
                type="submit"
                className="px-10 py-2 bg-[#F4F4F4] hover:bg-[#ebebeb] rounded-full mt-4 active:scale-98 cursor-pointer"
              >
                Upload
              </button>
            </form>
          </div>
          <div className="right w-[75%] h-screen ">
            <form className="w-full">
              <div className="flex gap-5">
                 {/* Title */}
          <div className="title mt-5">
            <input
              type="text"
              placeholder="Type here"
             
              className="w-82 h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
          </div>

          {/* subTitle */}
          <div className="title mt-5">
            <input
              type="text"
              placeholder="Type here"
             
              className="w-82 h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
          </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
