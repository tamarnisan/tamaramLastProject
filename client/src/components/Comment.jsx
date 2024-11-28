import React from "react";
import { useState, useEffect } from "react";
import postRequest from "../utilities/postRequest";
import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";
import deleteRequest from "../utilities/deleteRequest";
import Post from "./Post";
function Comment(props) {
    let comment_id = null
    const [comment, setComment]=useState(null)
  const [commentsarray, setCommentsarray] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [error, setError]= useState(null)
  const getComment = async (e) => {
      const id= props.postId;
    const url = `http://localhost:3000/posts/${id}/comments`;
    const response = await GetRequest(url);
    if (response.status === 200) {
        setCommentsarray(response.res);
    }
  };
  useEffect(() => {

      getComment();
  }, [])
  const DeleteComment= async ()=>{
      
      
      console.log('comment_id: ', comment_id);
      const url=`http://localhost:3000/comments/${comment_id}`;
      
      const response = await deleteRequest(url);
      if (response.status === 401) {
          var text = response.res.text;
          setError(text);
        } else {
            let array = commentsarray;
            const newArray = array.filter(item => item.id !== comment_id);
            setCommentsarray(newArray);
            
              }}



        return (<>

         <button onClick={() => setShowComments(!showComments)}>Show Comments</button>
      <button onClick={() => setAddComment(true)}>Add Comment</button> 
                 {showComments &&
                commentsarray.map((comment) =>
                    <div>
                        <span>idComment: {comment.id}</span>
                        <span><strong>username: </strong>"{comment.name}" <strong>comment: </strong></span>
                        <span>{comment.body}</span>
                        <span><button onClick={() => {
                            comment_id = comment.id;
                            DeleteComment()
                            }}>Delet Comment</button></span>
                    </div>
                )}
      </>)}
        

export default Comment;