import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import NavBar  from '../components/NavBar';

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`);
        setPost(postResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndUser();
  }, [id]);

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar/>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Post post={post} user={user} onDelete={() => {}} />
    </div>
    </div>
  );
}

export default PostDetailsPage;
