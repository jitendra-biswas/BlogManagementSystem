import React from 'react'

const RecentPostCard = () => {
  return (
    <>
    <div className="recentCard flex gap-2 mt-5">
        <div className="left text-6xl text-gray-300">01</div>
        <div className="right">
            <div className="header flex items-center gap-2 text-gray-600">
             <div className="profile w-7 h-7 rounded-full object-cover object-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt=""
                 className='w-full h-full'
                />
            </div>
            <h2 className='text-md'>tanish124@</h2>
            <p className='text-md'>27 sept</p>
           </div>
            <h2 className='font-bold text-zinc-700 text-xl'>The Brightest Stars in the Darkest Sky</h2>
           
        </div>
    </div>
    </>
  )
}

export default RecentPostCard
