import React, { useRef, useState } from "react";
import SideNav from "../components/SideNav";
import JoditEditor from 'jodit-react';

const BlogEditor = () => {
  const [Image, setImage] = useState(false);
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("Technology");
  const [active, setActive] = useState("Technology");
  const Buttons = ["Technology", "Programming", "Social Media", "Finance"];

  //variable for description field
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const categoryHandeler = function (item) {
    setActive(item);
    setCategory(item);
  };



  return (
    <>
      <div className="flex">
        <SideNav />
        <div className="right w-[80%] min-h-screen pt-25 p-10">
          <div className="thumbnail w-25 h-17 bg-zinc-100 outline-2 outline-gray-500/15 rounded overflow-hidden">
            <label
              htmlFor="file"
              className=" w-full h-full flex flex-col justify-center items-center cursor-pointer object-cover object-center"
            >
              <div className={`${!Image ? "visible" : "hidden"}`}>
                <i className="ri-upload-2-line text-4xl text-gray-400"></i>
                <p className="text-sm text-gray-500">Upload</p>
              </div>
              <input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="overflow-hidden hidden"
              />

              {/* show image in frontend */}
              <img
                src={!Image ? "" : URL.createObjectURL(Image)}
                alt=""
                className={`w-full h-full ${!Image ? "hidden" : "visible"}`}
              />
            </label>
          </div>

          <div className="title mt-5 ">
            <p className="text-gray-700  font-semibold">Blog title</p>
            <input
              type="text"
              placeholder="Type here"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-2xl h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
          </div>

          <div className="Categories">
            <p className="text-gray-700  font-semibold mt-5">Choose Category</p>
            <input
              type="text"
              placeholder="Type here"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-2xl h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
            <div className="buttons mt-5 flex flex-wrap gap-3">
              {Buttons.map((item) => {
                return (
                  <button
                    key={item}
                    onClick={() => {
                      categoryHandeler(item);
                    }}
                    className={`w-fit px-5 py-1 rounded-full cursor-pointer active:scale-95
            ${
              active === item
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black"
            }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="description">
            <p className="text-gray-700  font-semibold mt-5">Descriptioin</p>
             <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent => {}}
		/>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default BlogEditor;
