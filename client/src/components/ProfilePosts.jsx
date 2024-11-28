import React from "react";
import { useState, useEffect } from "react";
import postRequest from "../utilities/postRequest";
import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";
import Post from "./Post";
function ProfilePosts() {
    const { id } = useParams();
    const [postsarray, setPostarray] = useState([]);
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

    return (
        <>
            <div>I am profile Posts</div>
            {postsarray.map((post, i) => {
                return <Post post={post} i={i} arr={postsarray} setArr={setPostarray} key={post.id} />;
            })}
        </>
    );
}

export default ProfilePosts;
