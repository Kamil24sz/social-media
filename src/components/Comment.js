import React from 'react';

function Comment({ comment, isDeletable, onDelete }) {
  return (
    <div className="Comment">
      <div className="user-info">
        <img src="/images/profile.png" alt="Profile" className="user-profile-pic" />
        <p className="comment-email">{comment.email}</p>
      </div>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
      {isDeletable && <button className="comment-delete-btn" onClick={onDelete}>Delete comment</button>}
    </div>
  );
}

export default Comment;
