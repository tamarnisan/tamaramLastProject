import React from "react";
import { useState, useEffect } from "react";
import postRequest from "../utilities/postRequest";
import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";
import Post from "./Post";
function Comment(props) {
  const id= props.postId;
  const [commentsarray, setCommentsarray] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const getComment = async (e) => {
    const url = `http://localhost:3000/posts/${id}/comments`;
    const response = await GetRequest(url);
    if (response.status === 200) {
        setCommentsarray(response.res);
    }
  };
  getComment();



        return (<>

         <button onClick={() => setShowComments(!showComments)}>Show Comments</button>
      <button onClick={() => setAddComment(true)}>Add Comment</button> 
                 {showComments &&
                commentsarray.map((comment) =>
                    <div>
                        <span><strong>username: </strong>"{comment.name}" <strong>comment: </strong></span>
                        <span>{comment.body}</span>
                        <span><button onClick={() => DeleteComment(comment.id, comment)}>Delet Comment</button></span>
                    </div>
                )}
      </>)}
        //   <Post
        //     post={post}
        //     i={i}
        //     arr={postsarray}
        //     setArr={setPostarray}
        //     key={post.id}
        //   />
//         );
//       })}
//     </>
//   );
// }

export default Comment;