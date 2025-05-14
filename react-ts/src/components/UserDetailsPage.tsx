import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import './userDetailsPage.scss';

export type User = {
    id: number;
    name: string;
    username: string;
    profileImageUrl: string;
    coverImageUrl: string;
    email: string;
    posts: [{
        id: number;
        message: string;
        imageUrl: string;
    }];
    likes: [{
        id: number;
        message: string;
        imageUrl: string;
    }];
    dislikes: [{
        id: number;
        message: string;
        imageUrl: string;
    }];
}

export function UserDetailsPage() {
    let userId = useParams()
    const [user, setUser] = useState<User>();
    useEffect(() => {
       fetch(`http://localhost:3001/users/${userId.userId}`)
       .then ((response) => response.json())
       .then(data => {
        console.log(data)
        setUser(data)});
    },[userId])
        if (!user) return <div>No User</div>;
    return (
    <div>
        <div className="user-banner">
            <img className="banner-image" src={user.coverImageUrl}/>
        </div> 
        <div className = "user-page-container">
            <div className="user-bio">
                <img className="profile-picture" src={user.profileImageUrl}/>
                <div className="bio-information">
                    <h1>{user.name}</h1>
                    <p className="bio-username">{user.username}</p>
                    <p>{user.email}</p>
                </div>
            </div>
        
        <h3>{user.name}'s Posts</h3>
        <ul className="user-posts-container">
            {user.posts.map(post => (
                <li key={post.id}>
                    <img src={post.imageUrl}/>
                    <p className="bio-username">{user.username}</p>
                    <p>{post.message}</p>
                </li>
            ))}
        </ul>
        <h3>{user.name}'s Likes</h3>
        <ul className="user-posts-container">
            {user.likes.map(post => (
                <li key={post.id}>
                    <img src={post.imageUrl} />
                    <p>{post.message}</p>
                </li>
            ))}
        </ul>
        <h3>{user.name}'s Dislikes</h3>
        <ul className="user-posts-container">
            {user.dislikes.map(post => (
                <li key={post.id}>
                    <img src={post.imageUrl} />
                    <p>{post.message}</p>
                </li>
            ))}
        </ul>

    </div>  
    </div>
    );
}