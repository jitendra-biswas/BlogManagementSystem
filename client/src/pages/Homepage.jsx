import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Homepage = (props) => {
  const [active, setActive] = useState("All");
  const [category, setcategory] = useState("All");
  const [blogData, setblogData] = useState([]);

  const Buttons = [
    "All",
    "Technology",
    "Programming",
    "Social_Media",
    "Finance",
  ];

  const categoryHandeler = function (item) {
    setActive(item);
    setcategory(item);
  };

  //for getting blogs
  useEffect(() => {
    try {
      axios.get("http://localhost:3000/getblogs").then((res) => {
        setblogData(res.data.blogs);
      });
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="main w-full py-16  flex pr-18">
        <div className="left w-full max-lg:w-full  min-h-screen  max-lg:border-0">
          <div className="categories mt-7 pl-20 max-md:pl-10 flex gap-5 overflow-auto">
             {Buttons.map((item)=>{
              return <p
              key={item}
              onClick={() => {
                    categoryHandeler(item);
                  }}

                  className={`${category==item ? "border-b-2 border-b-zinc-400" : "" } cursor-pointer`}
              >{item}</p>
             })}
          </div>

      {blogData.length == 0 ? 
      <div className="bg-gray-200 w-fit px-20 py-3 rounded-full text-xl ml-20 mt-5">No Blogs Yet ...</div>
       : blogData
    .filter((blog) => category === "All" || blog.category === category)
    .map((blog, key) => (
      <BlogCard
        key={key}
        id = {blog._id}
        title={blog.title}
        subTitle={blog.subTitle}
        category={blog.category}
        description={blog.description}
        image={blog.image}
        publishedAt={blog.publishedAt}
      />
    ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
