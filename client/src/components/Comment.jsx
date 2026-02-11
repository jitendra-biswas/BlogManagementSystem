import React from 'react'

const Comment = (props) => {
  return (
    <div className='comment w-[60vw] max-lg:w-[70vw] max-md:w-[85vw] bg-gray-100 px-10 max-md:px-5 py-5 max-md:py-2 text-zinc-500 mt-3 rounded '>
        <div className="header  text-md flex items-center gap-1">
            <i className="ri-account-circle-line text-2xl"></i> {props.name}
        </div>
        <div className="footer flex justify-between">
            <p className=''>{props.description}
            </p>
        </div>
    </div>
    
  )
}

export default Comment
