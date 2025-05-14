import React, { useEffect, useState } from "react"
import './postsPage.scss';

export type Post = {
    id: number;
    message: string;
    imageUrl: string;
    createdAt: string;
    postedBy: {username: string};
}

export function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(data => {
             setPosts(data.results);
    })}, []);

    return (
        <div className = "page-container">
            <h1>All Posts</h1>
            <div className = "post-feed">
                {posts.length === 0 ? ( <h3>No posts available</h3>) : 
                    posts.map((post) => (
                    <div className = "post-container" key={post.id}>
                        <img src={post.imageUrl} />
                        <p className="user-name">{post.postedBy.username}</p>
                        <p>{post.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
    
}
