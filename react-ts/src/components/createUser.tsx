import React, { useEffect, useState } from "react"
import './createUser.scss';

export type CreateUserRequest = {
    name: string;
    username: string;
    email: string;
    coverImageUrl: string;
    profileImageUrl: string;
}

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        coverImageUrl: '',
        profileImageUrl: ''
    });
    const [errors, setErrors] = useState('')

    const isUsernameValid = (username: string): boolean => {
        const usernamePattern = /^[a-z]/;
        return usernamePattern.test(username);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        if (name === "username") {
                if (!isUsernameValid(value)) {
                setErrors('Error: Username cannot contain uppercase letters')
                return
            }
            setErrors('')
        }
        
    };

    const checkSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();

        fetch('http://localhost:3001/users/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then( response => response.text())
        .then(data => {
           console.log('User Created: ', data);
        })
        .catch(error => {
            console.error('error:', error)
        });
        
        }
        

    return (
        <form className="create-user-form-container" onSubmit={checkSubmit}>
            <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required></input>
            <label htmlFor="username">Username:</label>
                {errors}
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required></input>
            <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required></input>
            <label htmlFor="coverImageUrl">Cover image URL:</label>
                <input type="url" id="coverImageUrl" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} required></input>
            <label htmlFor="profileImageUrl">Profile image URL:</label>
                <input type="url" id="profileImageUrl" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} required></input>
            <button type="submit">Submit</button>

            
            
        </form>
    )
}

export default CreateUser