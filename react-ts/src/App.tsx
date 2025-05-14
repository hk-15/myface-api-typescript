import React from 'react'
import './App.scss'
import {PostsPage} from "./components/PostsPage"
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {UserDetailsPage} from "./components/UserDetailsPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"
          element={<PostsPage/>}/>
        <Route path="/users/:userId"
          element={<UserDetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
