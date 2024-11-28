import React from "react";
import { useState, useEffect } from "react";
import postRequest from "../utilities/postRequest";
import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";
import Post from "./Post";
function ProfilePosts() {
    const { id } = useParams();
    const [postsarray, setPostarray] = useState([]);
    const [title, setTitle] = useState("");
    const [bodynew, setBodynew] = useState("");
    const [add, setAdd] = useState(false);
    const [error, setError] = useState(null);
    const getPosts = async (e) => {
        const url = `http://localhost:3000/users/${id}/posts`;
        const response = await GetRequest(url);
        if (response.status === 200) {
            setPostarray(response.res);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    async function AddPost(event) {
        event.preventDefault();
        let obj = { title: title, body: bodynew };
        console.log("obj: ", obj);

        console.log("id: ", id);
        setAdd(false);
        const url = `http://localhost:3000/users/${id}/posts`;
        const response = await postRequest(obj, url);
        if (response.status === 400) {
            setError(response.res.text);
        } else {
            let postId = response.res.id;
            obj.id = postId;
            setPostarray((prev) => [...prev, obj]);
        }
    }

    return (
        <>
            <div>I am profile Posts</div>
            <button onClick={() => setAdd(true)}>ADD POST</button>
            {add && (
                <form onSubmit={AddPost}>
                    <label>
                        Enter title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </label>
                    <label>
                        Enter body:
                        <input
                            type="text"
                            value={bodynew}
                            onChange={(e) => {
                                setBodynew(e.target.value);
                            }}
                        />
                    </label>
                    <input type="submit" />
                </form>
            )}
            {postsarray.map((post, i) => {
                return <Post post={post} i={i} arr={postsarray} setArr={setPostarray} key={post.id} />;
            })}
        </>
    );
}

export default ProfilePosts;
