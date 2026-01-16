import React from 'react'

const BlogCard = () => {
  return (
    <>
      <div className="BlogCard flex items-center justify-between pr-10">
        <div className="left  mt-5 flex flex-col justify-center gap-3">
           <div className="header flex items-center gap-2 text-gray-600">
             <div className="profile w-7 h-7 rounded-full object-cover object-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt=""
                 className='w-full h-full'
                />
            </div>
            <h2 className='text-sm'>tanish124@</h2>
            <p className='text-sm'>27 sept</p>
           </div>

            <h2 className='font-bold text-zinc-700 text-xl'>The Brightest Stars in the Darkest Sky</h2>
        <p className='-mt-2 font-gelasio text-md'>New Zealand's Dark Sky Project at Lake Tekapo</p>
        <button className='w-fit px-5 py-1 rounded-full bg-[#F0F0F0] cursor-pointer active:scale-95 '>Technology</button>
        </div>

        <div className="right w-20 h-20 object-cover object-center">
            <img src="https://images.unsplash.com/photo-1765498069280-b863094c17bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full rounded'/>
        </div>
       
      </div>
    </>
  )
}

export default BlogCard
