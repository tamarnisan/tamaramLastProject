/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";

function Home() {
    const [posts, setPosts] = useState([]);
    let limit = useRef(10);
    let offset = useRef(0);
    async function updatePosts(limit, offset) {
        try {
            const res = await fetch(`http://localhost:3000/posts?limit=${limit}&offset=${offset}`);
            if (!res.ok) throw Error(res.status);
            const data = await res.json();
            setPosts((prev) => [...prev, getPostJSX(data)]);
        } catch (e) {
            console.log(e);
        }
    }

    function getPostJSX(postsData) {
        return (
            <div className="posts">
                {postsData
                    ? postsData.map((post) => (
                          <div>
                              <h2 className="post-title">{post.title}</h2>
                              <h3>User: {post.user_id}</h3>
                              <p className="post-body">{post.body}</p>
                          </div>
                      ))
                    : "Loading"}
            </div>
        );
    }

    useEffect(() => {
        updatePosts(limit.current, offset.current);
    }, []);

    return (
        <>
            {posts}
            <button
                onClick={() => {
                    limit.current += 10;
                    offset.current += 10;
                    updatePosts(limit.current, offset.current);
                }}
            >
                Load More
            </button>
        </>
    );
}
export default Home;
