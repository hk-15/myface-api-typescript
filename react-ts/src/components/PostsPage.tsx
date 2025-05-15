import React, { useEffect, useState } from "react"
import './postsPage.scss';

export type Post = {
    id: number;
    message: string;
    imageUrl: string;
    createdAt: string;
    postedBy: {username: string};
    likedBy: [];
    dislikedBy: [];
}


export function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(data => {
            setPosts(data.results);
    })}, []);

    const [likes, setLikes] = useState<{[key: number]: number}>({});
    const [dislikes, setDislikes] = useState<{[key: number]: number}>({});
 
    useEffect(() => {
        if (posts.length > 0) {
        const initialLikes: {[key: number]: number} ={}
        posts.forEach(post => {
            initialLikes[post.id] = post.likedBy.length;
        });
        setLikes(initialLikes)
        
        const initialDislikes: {[key: number]: number} ={}
        posts.forEach(post => {
            initialDislikes[post.id] = post.dislikedBy.length;
        });
        setDislikes(initialDislikes)
        }
    }, [posts]);

    const handleLike = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const postId = e.currentTarget.value;
        fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: 'POST',
        })
        .then(response => {
        if (response.ok) {
            const idNum: number = +postId;
            setLikes({
                ...likes,
                [idNum]: likes[idNum] + 1
            })
            console.log("You've liked this post!")
        }
        })
    }

        const handleDislike = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const postId = e.currentTarget.value;
        fetch(`http://localhost:3001/posts/${postId}/dislike`, {
            method: 'POST',
        })
        .then(response => {
        if (response.ok) {
            const idNum: number = +postId;
            setDislikes({
                ...dislikes,
                [idNum]: dislikes[idNum] + 1
            })
            console.log("You've disliked this post!")
        }
        })
    }

    return (
        <div className = "page-container">
            <h1>All Posts</h1>
            <div className = "post-feed">
                {posts.length === 0 ? ( <h3>No posts available</h3>) : 
                    posts.map((post) => (
                        <div className = "post-container" key={post.id}>
                            <img src={post.imageUrl} />
                            <form>
                                <button type="submit" onClick={handleLike} value={post.id}><i className="fa fa-thumbs-up"></i></button>
                                <button type="submit" onClick={handleDislike} value={post.id}><i className="fa fa-thumbs-down"></i> </button>
                            </form>
                            <p>{likes[post.id]} likes and {dislikes[post.id]} dislikes</p>
                            <p className="user-name">{post.postedBy.username}</p>
                            <p>{post.message}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    ) 
}