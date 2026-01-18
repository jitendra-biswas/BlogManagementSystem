import React, { useState } from "react";
import BlogCard from "../components/blogCard";
import { Link } from "react-router-dom";
import RecentPostCard from "../components/RecentPostCard";
import { useEffect } from "react";
import axios from 'axios'

const Homepage = (props) => {
    const [active, setActive] = useState("All");
    const [category, setcategory] = useState("All")
    const [blogData, setblogData] = useState([])
    const [user, setuser] = useState([])

    const Buttons = [
      "All",
      "Technology",
      "Programming",
      "Social Media",
      "Finance",
    ];

    const categoryHandeler =  function(item){
      setActive(item)
      setcategory(item);
    }

//for getting blogs
    useEffect(() => {
       try{
         axios.get("http://localhost:3000/getblogs").then(res=>{
          setblogData(res.data)
         })
       }
       catch(error){

       }
    }, [])
    

  return (
    
    <>
    <div className="main w-full pt-20 px-18 flex">
      <div className="left w-[70%] min-h-screen border-r-2 border-zinc-500/10">
        <Link className=" border-b-2 border-gray-500 px-2 py-2 my-1">{category}</Link>
        {blogData.map((blog,key)=>{
          return <BlogCard key={key} title={blog.title} category = {blog.category} description={blog.description} image={blog.image}/>
        })}
      </div>
      <div className="right w-[30%] min-h-screen p-6 fixed right-10">
        <h2 className="font-semibold text-gray-700">Categories</h2>
        <div className="buttons mt-5 flex flex-wrap gap-3">
          {Buttons.map((item)=>{
            return  <button
              key={item}
              onClick={()=>{categoryHandeler(item)}}
              className={`w-fit px-5 py-1 rounded-full cursor-pointer active:scale-95
            ${
              active === item
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black"
            }`}
            >
              {item}
            </button>
          })}
        </div>

        <div className="recent-post mt-10">
          <h2 className="font-semibold text-gray-700">Recent Posts</h2>
          <RecentPostCard />
        </div>
      </div>
    </div>
    </>
  );
};

export default Homepage;
