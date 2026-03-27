import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const AdminDashboard = () => {
  const { isAdmin, loginSignal, checkAuth } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth check initialization before redirecting.
    // loginSignal: null = not yet determined, true = logged in, false = not logged in.
    if (loginSignal === null) {
      return;
    }

    if (loginSignal === false) {
      navigate("/admin");
      return;
    }

    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchBlogs();
  }, [loginSignal, isAdmin]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/admin/blogs", {
        withCredentials: true,
      });
      setBlogs(res.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleApprove = async (blogId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/blogs/${blogId}/approve`,
        {},
        { withCredentials: true },
      );
      setMessage("Blog approved successfully");
      fetchBlogs();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to approve blog");
      console.error(error);
    }
  };

  const handleReject = async (blogId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/blogs/${blogId}/reject`,
        {},
        { withCredentials: true },
      );
      setMessage("Blog rejected successfully");
      fetchBlogs();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to reject blog");
      console.error(error);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/blogs/${blogId}`, {
          withCredentials: true,
        });
        setMessage("Blog deleted successfully");
        fetchBlogs();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Failed to delete blog");
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/signOut", {
        withCredentials: true,
      });
      await checkAuth();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredBlogs =
    filterStatus === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === filterStatus);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 md:p-6 mb-4 md:mb-6">
        <div className="max-w-7xl mx-auto flex  sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl text-zinc-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm md:text-base w-fitx"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {message && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm md:text-base">
            {message}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="mb-4 md:mb-6 grid grid-cols-2  gap-3 md:gap-4">
          <button
            onClick={() => setFilterStatus("all")}
            className={`w-full h-20 md:h-22 rounded-lg shadow-md bg-[#f4f4f4] flex items-center justify-center px-3 md:px-5 transition-all duration-200 hover:scale-105 ${
              filterStatus === "all"
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <i className="ri-blogger-line text-2xl md:text-3xl"></i>
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-bold">{blogs.length}</span>
                <p className="text-xs md:text-sm">All Blogs</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`w-full h-20 md:h-22 rounded-lg shadow-md bg-[#f4f4f4] flex items-center justify-center px-3 md:px-5 transition-all duration-200 hover:scale-105 ${
              filterStatus === "pending"
                ? "bg-yellow-500 text-white shadow-lg"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <i className="ri-hourglass-2-fill text-2xl md:text-3xl"></i>
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-bold">
                  {blogs.filter((b) => b.status === "pending").length}
                </span>
                <p className="text-xs md:text-sm">Pending</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterStatus("approved")}
            className={`w-full h-20 md:h-22 rounded-lg shadow-md bg-[#f4f4f4] flex items-center justify-center px-3 md:px-5 transition-all duration-200 hover:scale-105 ${
              filterStatus === "approved"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <i className="ri-check-double-line text-2xl md:text-3xl"></i>
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-bold">
                  {blogs.filter((b) => b.status === "approved").length}
                </span>
                <p className="text-xs md:text-sm">Approved</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterStatus("rejected")}
            className={`w-full h-20 md:h-22 rounded-lg shadow-md bg-[#f4f4f4] flex items-center justify-center px-3 md:px-5 transition-all duration-200 hover:scale-105 ${
              filterStatus === "rejected"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <i className="ri-error-warning-line text-2xl md:text-3xl"></i>
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-bold">
                  {blogs.filter((b) => b.status === "rejected").length}
                </span>
                <p className="text-xs md:text-sm">Rejected</p>
              </div>
            </div>
          </button>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">
            No blogs found
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start mb-4 gap-4">
                  <div className="flex-1 w-full">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.subTitle && (
                      <p className="text-gray-600 mb-2 text-sm md:text-base line-clamp-1">{blog.subTitle}</p>
                    )}
                    <div
                      className="text-gray-700 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    ></div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">Category: {blog.category}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Author: {blog.userId?.username || "Unknown"}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full lg:w-auto flex justify-between lg:flex-col items-center lg:items-end gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white font-medium text-xs md:text-sm ${
                        blog.status === "pending"
                          ? "bg-yellow-500"
                          : blog.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }`}
                    >
                      {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 border-t pt-3 md:pt-4">
                  {blog.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(blog._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm md:text-base"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(blog._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm md:text-base"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex bg-red-500 text-white hover:bg-red-400 font-medium py-2 md:py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm md:text-base"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
