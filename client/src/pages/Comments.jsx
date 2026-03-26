import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [type, setType] = useState("pending"); // pending | approved
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update the base URL for API calls
  const BASE_URL = "http://localhost:3000";

  // fetch comments based on filter
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (type === "pending") {
        res = await axios.get(`${BASE_URL}/pending/comments`, {
          withCredentials: true,
        });
      } else {
        res = await axios.get(`${BASE_URL}/approved/comments`, {
          withCredentials: true,
        });
      }
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [type]);

  // approve / reject
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/admin/comment/${id}`,
        { status },
        { withCredentials: true }, // ✅ important
      );
      fetchComments();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update comment");
    }
  };

  // delete
  const deleteComment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deleteComment/${id}`);
      fetchComments();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="w-full min-h-screen pt-20">
      {/* NAV */}
      <nav className="flex justify-between px-12 mt-10">
        <h2 className="font-bold text-xl">Comments</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setType("approved")}
            className={`px-3 py-1 rounded-full border cursor-pointer ${
              type === "approved" ? "bg-black text-white" : ""
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setType("pending")}
            className={`px-3 py-1 rounded-full border cursor-pointer ${
              type === "pending" ? "bg-black text-white" : ""
            }`}
          >
            Pending
          </button>
        </div>
      </nav>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="px-10 mt-6 p-3 bg-red-100 text-red-700 rounded border border-red-400">
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="px-10 mt-6 text-center text-gray-500">
          Loading comments...
        </div>
      )}

      {/* TABLE */}
      {!loading && (
        <div className="px-10 mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Comment</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {comments.length > 0 ? (
                comments.map((c) => (
                  <tr key={c._id} className="border-b">
                    <td className="py-3">
                      <div className="text-sm">
                        <div>
                          <strong>User:</strong> {c.name}
                        </div>
                        <div>
                          <strong>Blog:</strong> {c.pageID?.title || "-"}
                        </div>
                        <div>
                          <strong>Comment:</strong> {c.description}
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="py-3">
                      <div className="flex gap-2">
                        {/* only show approve/reject buttons for pending */}
                        {type === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(c._id, "approved")}
                              className="px-2 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 cursor-pointer"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() => updateStatus(c._id, "rejected")}
                              className="px-2 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <i
                          className="ri-delete-bin-5-line cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => confirm("Do you want to delete comment?")? deleteComment(c._id):""}
                          
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No comments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comments;
