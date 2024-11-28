/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import "../stylesheets/Home.scss";
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
        return postsData.map((post) => {
            console.log("post: ", post);
            return <Post arr={postsData} post={post} key={post.id} />;
        });
    }

    useEffect(() => {
        updatePosts(limit.current, offset.current);
    }, []);

    return (
        <div className="home-posts">
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
        </div>
    );
}
export default Home;
