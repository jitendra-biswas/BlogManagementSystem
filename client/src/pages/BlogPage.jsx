import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

const BlogPage = (props) => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const pageID = id;

  //states for post comment
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //states for comments
  const [Comments, setComments] = useState([]);

  //Getting each data on the basis of id
  const getDataById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/getBlogsById/${id}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) getDataById();
  }, [id]);


  //Code for post comment
    const submitHandeler = (e)=>{
        e.preventDefault();

      axios.post("http://localhost:3000/postComment", {pageID,name,description});

      setName("");
      setDescription("")
      alert("Comment Success ✅")
  };

  //Code for get Comment
  useEffect(() => {
     axios.get(`http://localhost:3000/getComment/${pageID}`).then((res)=>{
       setComments(res.data.comments)
     })
  }, [])
    

  

  return data ? (
    <>

      <div className="pt-50 pb-20 max-md:pt-36 w-full  flex flex-col items-center gap-4 ">
        <p className="font-semibold text-[#736DC4]">Published on {moment(data.publishedAt).format('MMMM Do YYYY')}</p>
        <h1 className="text-4xl max-md:text-3xl font-semibold px-[30vw] max-lg:px-[20vw] max-md:px-[5vw] text-center text-zinc-700">{data.title}</h1>
        <h2 className="text-zinc-500">{data.subTitle}</h2>
        <p className="outline-2 outline-[#ead2ff] px-3 rounded-full bg-[#F5EDFC] ">{data.category}</p>


        <div className="thumbnail w-[70%] max-md:w-[90vw] h-[70vh] max-lg:h-[50vh] max-md:h-[45vh] max-sm:h-[35vh] rounded-xl my-5 overflow-hidden">
            <img src={data.image} alt="thumbnail" className="w-full h-full object-center object-cover"/>
        </div>
        
        <div className="description w-[70%] max-md:w-[90%]" dangerouslySetInnerHTML={{"__html":data.description}}>
        </div>

        <div className="comments w-[70%] max-md:w-[90%] mt-20">
          <h2 className="w-full font-semibold text-xl">Comments(2)</h2>
       
        
         
          {Comments=="" ? "No Comments..." : Comments.map((comment)=>{
            return <Comment name={comment.name} description={comment.description}/>

        })}

        </div>

        <div className="addComment w-[70%] max-md:w-[90%] mt-10">
           <h2 className="font-semibold text-xl">Add your comment</h2>
           <form className="w-full h-[50vh] flex flex-col gap-5 mt-5">
            <input type="text"
             placeholder="Name"
              className="w-[40vw] max-lg:w-[60vw] max-md:w-[85vw] outline-2 outline-zinc-200 p-2 rounded"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              />
            <textarea 
            className="w-[40vw] max-lg:w-[60vw] max-md:w-[85vw] h-64 outline-2 outline-zinc-200 p-2 rounded" 
            placeholder="comment" 
             value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />
            <button onClick={submitHandeler} className="w-fit px-4 py-1 bg-[#4F4EE9] text-white rounded active:scale-90 cursor-pointer">Submit</button>
           </form>
        </div>
      </div>

      
    </>
    
  ) : "loading"
};

export default BlogPage;
