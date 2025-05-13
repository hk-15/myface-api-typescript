import React, { useEffect, useState } from "react"

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
                console.log(data)
             setPosts(data.results);
    })}, [posts]);
    return (
        <div>
            <h2>All Posts</h2>
            {posts.length === 0 ? ( <h3>No posts available</h3>) : 
                posts.map((post) => (
                <div key={post.id}>
                    <img src={post.imageUrl} />
                    <h3>{post.postedBy.username}</h3>
                    <p>{post.message}</p>
                </div>
            ))}
        </div>
    )
    
}
