import React, { useState } from 'react';

function AddAlbum({ onAdd }) {
    const [title, setTitle] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!title) return;
      
      onAdd( title );
      setTitle("");
    };
  return (
    <form onSubmit={handleSubmit} className="AddAlbum">
      <input
        id="title"
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AddAlbum;
