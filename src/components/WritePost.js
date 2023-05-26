import React, { useState } from 'react';

function WritePost({ onPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePost = () => {
    if (title && body) {
      onPost(title, body);
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="WritePost">
      <input 
        type="text" 
        placeholder="Title..." 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Write post..." 
        value={body} 
        onChange={e => setBody(e.target.value)} 
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default WritePost;
