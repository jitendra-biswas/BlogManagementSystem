import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const BlogCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="BlogCard w-full h-fit  pr-10 px-18 max-md:px-10 cursor-pointer"
        onClick={() => navigate(`blogs/${props.id}`)}
      >
        <div className="header w-[80vw] max-sm:w-[85vw] mt-10 flex flex-col justify-center gap-3">
          <h2 className="font-semibold text-zinc-700 text-xl w-full">{props.title}</h2>
          <h2 className=" text-zinc-700 text-xl">{props.subTitle}</h2>
        </div>

        <div className="middle max-md:w-[80vw] max-sm:w-[85vw] flex max-sm:flex-col-reverse  max-sm:gap-3 justify-between  rounded  mt-8">
          <div className="-mt-2 w-[55vw] max-sm:w-[80vw]  text-md text-zinc-800">
            <div
              dangerouslySetInnerHTML={{
                __html: props.description.slice(0, 300),
              }}
            />
          </div>
          <img
            src={props.image}
            alt="blog thumbnail"
            loading="lazy"
            className="w-[15vw] max-md:w-[20vw] max-sm:w-[30vw]  h-[18vh] max-lg:h-[12vh] max-sm:h[20vh] h- object-cover object-center rounded"
          />
        </div>

        <div className="footer flex w-[80vw] items-center gap-3 text-zinc-500 max-lg:mt-10 max-sm:mt-2">
          <i className="ri-calendar-2-line"></i>{" "}
          {/* moment package to format date */}
          <p className="text-sm -ml-2 ">{moment(props.publishedAt).format('MMMM Do YYYY')}</p>- 
          <p className="w-fit">{props.category}</p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
