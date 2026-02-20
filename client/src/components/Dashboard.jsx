import React from 'react'

const Dashboard = () => {
  return (
    <>
  <div className="w-[80%] py-25 px-5">
    <div className="blogs">
      <div className="Number_Of_Blogs w-44 h-22 rounded shadow-md bg-[#f4f4f4] flex items-center px-5 ml-10">
        <div className="left"><i className="ri-blogger-line text-3xl text-blue-800"></i></div>
        <div className="right ml-5">
          <h2 className='text-xl font-semibold'>9</h2>
          <h1 className='text-md '>Blogs</h1>
        </div>
      </div>
      <h1 className="px-9 pt-10 font-semibold text-xl text-zinc-800">
        <i className="ri-blogger-line text-2xl text-blue-800"> </i>Latest Blogs
      </h1>

      <div
        className="BlogCard max-lg:w-[95vw] w-full pr-10 px-9 max-md:px-10"
        onClick={() => navigate(`blogs/${props.id}`)}
      >

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

            <tr className="border-b-2 border-zinc-300">
              <td className="px-2 py-4 text-left">1.</td>

              <td className="px-4 py-4 text-left">
                The Rise of Artificial Intelligence: Transforming Our Digital World
              </td>

              <td className="px-4 py-4 text-left">
                2025-02-02
              </td>

              <td className="px-4 py-4 text-left">
                <div className="flex items-center gap-2">
                  <i className="ri-edit-line text-xl text-green-500 cursor-pointer"></i>

                  <i className="ri-delete-bin-5-line text-xl text-red-500 cursor-pointer"></i>
                </div>
              </td>

            </tr>


            <tr className="border-b-2 border-zinc-300">

              <td className="px-2 py-4 text-left">2.</td>

              <td className="px-4 py-4 text-left">
                Master Your Money: Practical Finance Tips for Everyone
              </td>

              <td className="px-4 py-4 text-left">
                2023-05-05
              </td>

              <td className="px-4 py-4 text-left">
                <div className="flex items-center gap-2">
                  <i className="ri-edit-line text-xl text-green-500 cursor-pointer"></i>

                  <i className="ri-delete-bin-5-line text-xl text-red-500 cursor-pointer"></i>
                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  </div>
</>
  )
}

export default Dashboard
