import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import LoginedNav from "../components/LoginedNav";

const BlogEditor = () => {
  const [Image, setImage] = useState(null);
  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Category, setCategory] = useState("Technology");
  const [active, setActive] = useState("Technology");
  const Buttons = ["Technology", "Programming", "Social Media", "Finance"];

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const categoryHandeler = (item) => {
    setActive(item);
    setCategory(item);
  };

  const formHandeler = async (e) => {
    e.preventDefault();

    if (!Title || !SubTitle || !Category || !content) {
      return alert("All fields are required");
    }

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("SubTitle", SubTitle);
    formData.append("Category", Category);
    formData.append("content", content);
    if (Image) formData.append("image", Image); // image key matches multer

    try {
      const res = await axios.post(
        "http://localhost:3000/blog/editor",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.data.message === "success") {
        setTitle("");
        setSubTitle("");
        setCategory("Technology");
        setActive("Technology");
        setContent("");
        setImage(null);
        alert("Blog posted successfully!");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong");
    }
  };

  return (
    <>
    
      <div className="flex w-full">
        <LoginedNav />

        <form
          onSubmit={formHandeler}
          className="right w-[70%] max-lg:w-[95%] max-md:w-[95vw] min-h-screen pt-25 p-10"
        >
          {/* Image upload */}
          <div className="thumbnail w-25 h-17 bg-zinc-100 outline-2 outline-gray-500/15 rounded overflow-hidden">
            <label
              htmlFor="file"
              className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
            >
              <div className={`${!Image ? "visible" : "hidden"}`}>
                <i className="ri-upload-2-line text-4xl text-gray-400"></i>
                <p className="text-sm text-gray-500">Upload</p>
              </div>
              <input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />

              {Image && (
                <img
                  src={URL.createObjectURL(Image)}
                  alt=""
                  className="w-full h-full visible"
                />
              )}
            </label>
          </div>

          {/* Title */}
          <div className="title mt-5">
            <p className="text-gray-700 font-semibold">Blog title</p>
            <input
              type="text"
              placeholder="Type here"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
          </div>

          {/* subTitle */}
          <div className="title mt-5">
            <p className="text-gray-700 font-semibold">Sub Title</p>
            <input
              type="text"
              placeholder="Type here"
              value={SubTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
          </div>

          {/* Category */}
          <div className="Categories mt-5">
            <p className="text-gray-700 font-semibold">Choose Category</p>
            <input
              type="text"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-3 text-gray-600 mt-2 bg-zinc-100 rounded"
            />
            <div className="buttons mt-5 flex flex-wrap gap-3">
              {Buttons.map((item) => (
                <p
                  key={item}
                  onClick={() => categoryHandeler(item)}
                  className={`w-fit px-5 py-1 rounded-full cursor-pointer active:scale-95 ${
                    active === item
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black"
                  }`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="description mt-5">
            <p className="text-gray-700 font-semibold">Description</p>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-black hover:bg-zinc-800 px-3.5 py-1.5 rounded text-white font-md cursor-pointer active:scale-95"
          >
            Post Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogEditor;
