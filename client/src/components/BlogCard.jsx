import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const BlogCard = (props) => {
  return (
    <>
      <div className="BlogCard flex items-center justify-between pr-10">
        <div className="left  mt-5 flex flex-col justify-center gap-3">
          <div className="header flex items-center gap-2 text-gray-600">
            <div className="profile w-7 h-7 rounded-full object-cover object-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                className="w-full h-full"
              />
            </div>
            <h2 className="text-sm">tanish124@</h2>
            <p className="text-sm">27 sept</p>
          </div>

          <h2 className="font-bold text-zinc-700 text-xl">{props.title}</h2>
          <div className="-mt-2 font-gelasio text-md">
            <div
              dangerouslySetInnerHTML={{
                __html: props.description.slice(0, 100),
              }}
            />
          </div>
          <button className="w-fit px-5 py-1 rounded-full bg-[#F0F0F0] cursor-pointer active:scale-95 ">
            {props.category}
          </button>
        </div>

        <div className="right w-25 h-18 rounded overflow-hidden">
          <img
            src={props.image}
            alt="blog thumbnail"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default BlogCard;
