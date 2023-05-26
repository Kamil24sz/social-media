import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import WriteComment from './WriteComment';
import { Link } from 'react-router-dom';


function Post({ post, user, onDelete }) {
  const [comments, setComments] = useState([]);
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
      });
  }, [post]);

  const handleSend = (titleText, commentText) => {
    const newComment = {
      postId: post.id,
      id: Date.now(),
      name: titleText,
      email: user.email,
      body: commentText
    };
    setComments([newComment, ...comments]);
  };
  

  return (
    <div className="Post">
      <div className="user-info">
        <img src="/images/profile.png" alt="Profile" className="user-profile-pic" />
        {user && <Link to={`/profile/${user.id}`}><h2>{user.name}</h2></Link>}
      </div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {post.userId === 1 && <button onClick={() => onDelete(post.id)} className="delete-button">Delete Post</button>}

      {areCommentsVisible && comments.slice(0, 2).map((comment) => (
        <Comment key={comment.id} comment={comment} isDeletable={comment.email === user.email} onDelete={() => setComments(comments.filter(c => c.id !== comment.id))} />
      ))}

      {!areCommentsVisible && comments.map((comment) => (
        <Comment key={comment.id} comment={comment} isDeletable={comment.email === user.email} onDelete={() => setComments(comments.filter(c => c.id !== comment.id))} />
      ))}

      {comments.length > 2 && (
        <button className="user-show-btn" onClick={() => setAreCommentsVisible(!areCommentsVisible)}>
          {areCommentsVisible ? 'Show more...' : 'Show less...'}
        </button>
      )}
      <WriteComment onSend={handleSend} />
    </div>
  );
}

export default Post;
