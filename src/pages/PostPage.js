import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import WritePost from '../components/WritePost';
import '../App.css';
import NavBar  from '../components/NavBar';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handlePost = (title, body) => {
    const newPost = {
      userId: 1,
      id: Date.now(),
      title,
      body
    };
    setPosts([newPost, ...posts]);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  return (
    <div>
      <NavBar/>
    <div className="PostPage">
      <WritePost onPost={handlePost} />
      {posts.map(post => (
         <Post key={post.id} post={post} user={users[post.userId - 1]} onDelete={handleDelete} />
      ))}
    </div>
    </div>
  );
}

export default PostPage;
