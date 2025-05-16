import React, { useState } from "react"
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
    const [errors, setErrors] = useState({
        username: '',
        email: ''
    })
    const [message, setMessage] = useState('')
    const [showErrorText, setShowErrorText] = useState({
        username: false,
        email: false
    });

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "username") {
           if (e.target.validity.patternMismatch) {    
            setErrors({
                    ...errors,
                    username: 'Error: Username should only contain lowercase letters and numbers.'
                })
                setShowErrorText({
                    ...showErrorText,
                    username: true
                });
            } 
        }
        if (e.target.id === "email") {
            if (e.target.validity.patternMismatch) {
                setErrors({
                    ...errors,
                    email: 'Error: Email must be valid.'
                })
                setShowErrorText({
                    ...showErrorText,
                    email: true
                });
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        const newValueIsValid = !e.target.validity.patternMismatch;
        if (errors) {
            if (e.target.id === "username") {
                if (newValueIsValid) {
                    setErrors({
                        ...errors,
                        username: ''
                    });
                    setShowErrorText({
                        ...showErrorText,
                        username: false,
                    });
                }
            }
            if (e.target.id === "email") {
                if (newValueIsValid) {
                    setErrors({
                        ...errors,
                        email: ''
                    });
                    setShowErrorText({
                        ...showErrorText,
                        email: false,
                    });
                }
            }

        }
    };

    const checkSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();
        setMessage('');
        fetch('http://localhost:3001/users/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                setMessage('User Successfully Created!');
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    coverImageUrl: '',
                    profileImageUrl: '',
                })
            }
        })
        .catch(error => {
            console.error('error:', error)
            setMessage('User Not Created!')
        });
        
        }
        
    return (
        <form className="create-user-form-container" onSubmit={checkSubmit}>
            <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required></input>
            <label htmlFor="username">Username:</label>
                {showErrorText.username && errors.username}
                <input type="text" id="username" name="username" value={formData.username} pattern="^[a-z0-9]" onChange={handleChange} onBlur={handleBlur} required></input>
            <label htmlFor="email">Email:</label>
                {showErrorText.email && errors.email}
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} pattern="[\w.'_%+]*@[\w.]*" onBlur={handleBlur} required></input>
            <label htmlFor="coverImageUrl">Cover image URL:</label>
                <input type="url" id="coverImageUrl" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} required></input>
            <label htmlFor="profileImageUrl">Profile image URL:</label>
                <input type="url" id="profileImageUrl" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} required></input>
            <button type="submit">Submit</button>
            {message}
            
            
        </form>
    )
}

export default CreateUser