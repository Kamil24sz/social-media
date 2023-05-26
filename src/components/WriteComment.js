import React, { useState } from 'react';

function WriteComment({ onSend }) {
  const [titleText, setTitleText] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSend = () => {
    if (commentText && titleText) {
      onSend(titleText, commentText);
      setTitleText("");
      setCommentText("");
    }
  };

  return (
    <div className="WriteComment">
      <input 
        type="text" 
        placeholder="Title..." 
        value={titleText} 
        onChange={e => setTitleText(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Comment..." 
        value={commentText} 
        onChange={e => setCommentText(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default WriteComment;
