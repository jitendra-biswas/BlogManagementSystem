import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NoBlogsYet from "./NoBlogsYet";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [LatestBlogs, setLatestBlogs] = useState([]);
  const [Blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  async function getBlogsData() {
    try {
      const res = await axios.get("http://localhost:3000/getUserBlogs", {
        withCredentials: true,
      });
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log("error");
    }
  }
  async function getLatestBlogs() {
    try {
      const res = await axios.get("http://localhost:3000/latestBlogs", {
        withCredentials: true,
      });
      setLatestBlogs(res.data.blogs);
    } catch (error) {
      console.log("error");
    }
  }
  async function deleteBlog(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/blog/deleteBlog/${id}`,
        { withCredentials: true },
      );

      alert("Delete Success");
      getBlogsData();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlogsData();
    getLatestBlogs();
  }, []);

  return (
    <>
      <div className="w-[80%] py-25 px-5">
        <div className="blogs">
          <div className="Number_Of_Blogs w-44 h-22 rounded shadow-md bg-[#f4f4f4] flex items-center px-5 ml-10 max-lg:ml-3">
            <div className="left">
              <i className="ri-blogger-line text-3xl text-blue-800"></i>
            </div>
            <div className="right ml-5">
              <h2 className="text-xl font-semibold">{Blogs.length}</h2>
              <h1 className="text-md ">Blogs</h1>
            </div>
          </div>
          <h1 className="px-9 pt-10 max-lg:px-3 font-semibold text-xl text-zinc-800">
            <i className="ri-blogger-line text-2xl text-blue-800"> </i>Latest
            Blogs
          </h1>

          <div className="BlogCard w-full pr-10 px-9 max-lg:px-3 max-md:px-5 max-sm:px-2">
            <table className="w-full">
              {/* table header */}
              <thead>
                <tr className="text-zinc-700 border-b-2 border-zinc-300">
                  <th className="px-2 py-4 text-left">#</th>
                  <th className="px-4 py-4 text-left">Blog Title</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Action</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {LatestBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="4">
                      <NoBlogsYet />
                    </td>
                  </tr>
                ) : (
                  LatestBlogs.map((blog, idx) => (
                    <tr key={blog._id} className="border-b-2 border-zinc-300">
                      <td className="px-2 py-4 text-left">{idx + 1}.</td>

                      <td className="px-4 py-4 text-left">{blog.title}</td>

                      <td className="px-4 py-4 text-left">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-left">
                        <div className="flex items-center gap-2">
                          <i
                            className="ri-edit-line text-xl text-green-500 cursor-pointer"
                            onClick={() =>
                              navigate(`/dashboard/updateBlog/${blog._id}`)
                            }
                          ></i>

                          <i
                            className="ri-delete-bin-5-line text-xl text-red-500 cursor-pointer"
                            onClick={() => deleteBlog(blog._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div onClick={()=>navigate("/dashboard/dashboardBlogs")} className="w-full flex justify-center mt-10 text-blue-600 cursor-pointer text-md">
              More Blogs<i className="ri-arrow-down-s-line text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
