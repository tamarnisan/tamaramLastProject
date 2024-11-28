
import React, { useState, useEffect } from "react";
import deleteRequest from "../utilities/deleteRequest";
import Comment from "./Comment";

export default function Post(props) {
  const [body, setBody] = useState(null);
  const [data, setData] = useState([]); //comments
  
  const [username, setUserNmae] = useState("");
  const [newcomment, setnewcomment] = useState("");
  const [EditTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError]= useState(null)

  const handleDelete = async (e) => {
    
        const url=`http://localhost:3000/posts/${props.post.id}`
        const response = await deleteRequest(url);
        if (response.status === 401) {
          var text = response.res.text;
          setError(text);
        } else {
          let array = props.arr;
          const newArray = array.filter(item => item.id !== props.post.id);
          props.setArr(newArray);
        }}
        

  return (
    <>
      <div>post_id: {props.post.id}</div>
    <h4> <strong>title: {props.post.title}</strong></h4> 
 <button onClick={() => {body===null?setBody(props.post.body):setBody(null)}}>Content</button>
      <button onClick={handleDelete}>DELETE</button>
      {/* <button onClick={() => setEditTitle(true)}>EDIT</button> */} 
    <Comment postId={props.post.id}/>
      <p>{body}</p>
      {error&&alert(error)}
    </>
  );
}

// export default function Post(props) {
//     async function handleSaveChanges() {
//         const url = `http://localhost:3500/posts/${props.post.id}`
//         const updateOption = {
//             method: 'PATCH',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ title: title })
//         }

//         fetch(url, updateOption)
//             .then((response) => response.json)
//             .then((data) => console.log("update"))
//             .catch((error) => console.error(error))

//     }
//     useEffect(() => {
//         async function getComments(url) {
//             try {
//                 let response = await fetch(url);
//                 if (!response.ok) throw Error("Did not recived expected data")
//                 setData(await response.json());

//             }
//             catch (error) {
//                 alert(error)
//             }

//         };
//         (async () => await getComments(`http://localhost:3500/comments?postId=${props.post.id}`))()

//     }, [])

//     function submitAddComment(event) {
//         event.preventDefault()
//         let obj = { "postId": parseInt(props.post.id), "id": (Math.floor(Math.random() * (10000 - 10) + 10)).toString(), "name": username, "body": newcomment }
//         setData(prev => [...prev, obj]);

//         setAddComment(false);

//         fetch('http://localhost:3500/comments', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(obj),
//         })
//             .then(res => res.json())
//             .then(data => console.log(data))
//             .catch(error => console.error('Error posting data:', error));
//     }
//     function DeleteComment(idcomment, comment) {
//         let array = data;
//         const newArray = array.filter(item => item.id !== idcomment);
//         setData(newArray);
//         fetch(`http://localhost:3500/comments/${idcomment}`, { method: "DELETE" })
//             .then((response) => {
//                 if (response.ok) {
//                     console.log("comment deleted from database");

//                 }
//                 else {
//                     throw new Error("failed to delete")
//                 }

//             })
//             .catch((error) => console.log(error))
//     }
//     function onSubmitEdit() {

//         setEditTitle(false);
//         let arrayEdit = props.arr;
//         arrayEdit[props.i].title = title;
//         props.setArr(arrayEdit);
//         handleSaveChanges();
//     }

//     return (
//         <div id="post">

//             <p>id: {props.post.id}</p>
//             {!EditTitle ? <p>title: {props.post.title}</p> :
//                 <form onSubmit={onSubmitEdit}>
//                     <label>Enter edit title:
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => {
//                                 setTitle(e.target.value)
//                             }}

//                         />
//                     </label>
//                     <input type="submit" />
//                 </form>}
//             {addComment &&
//                 <div>
//                     <form onSubmit={submitAddComment}>
//                         <label>Enter username:
//                             <input
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => {
//                                     setUserNmae(e.target.value)
//                                 }}
//                             />
//                         </label>
//                         <label>Enter Comment:
//                             <input
//                                 type="text"
//                                 value={newcomment}
//                                 onChange={(e) => {
//                                     setnewcomment(e.target.value)
//                                 }}

//                             />
//                         </label>
//                         <input type="submit" />
//                     </form>

//                 </div>
//             }
//             {showComments &&
//                 data.map((comment) =>
//                     <div>
//                         <span><strong>username: </strong>"{comment.name}" <strong>comment: </strong></span>
//                         <span>{comment.body}</span>
//                         <span><button onClick={() => DeleteComment(comment.id, comment)}>Delet Comment</button></span>
//                     </div>
//                 )}

//             <p>{body}</p>
//         </div>
//     )
// }
