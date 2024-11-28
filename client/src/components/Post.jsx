import React, { useState, useEffect } from "react";
import deleteRequest from "../utilities/deleteRequest";
import Comment from "./Comment";

export default function Post(props) {
    const [body, setBody] = useState(null);
    const [error, setError] = useState(null);

    const [username, setUserNmae] = useState("");
    const [newcomment, setnewcomment] = useState("");
    const [EditTitle, setEditTitle] = useState(false);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    const handleDelete = async (e) => {
        const url = `http://localhost:3000/posts/${props.post.id}`;
        const response = await deleteRequest(url);
        if (response.status === 401) {
            var text = response.res.text;
            setError(text);
        } else {
            let array = props.arr;
            const newArray = array.filter((item) => item.id !== props.post.id);
            props.setArr(newArray);
        }
    };

    return (
        <>
            <div>post_id: {props.post.id}</div>
            <h4>
                {" "}
                <strong>title: {props.post.title}</strong>
            </h4>
            <button
                onClick={() => {
                    body === null ? setBody(props.post.body) : setBody(null);
                }}
            >
                Content
            </button>
            <button onClick={handleDelete}>DELETE</button>
            <Comment postId={props.post.id} />
            <p>{body}</p>
            {error && alert(error)}
        </>
    );
}
