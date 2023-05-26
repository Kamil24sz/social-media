import React, { useState, useEffect } from 'react';

function AddPhoto({ onAdd }) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Check if fields are not empty
      if (!title || !url || !thumbnailUrl) {
        alert('All fields are required');
        return;
      }
  
      const newPhoto = {
        title,
        url,
        thumbnailUrl,
      };
  
      onAdd(newPhoto);
  
      setTitle('');
      setUrl('');
      setThumbnailUrl('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="AddPhoto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="Thumbnail URL"
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
export default AddPhoto;  