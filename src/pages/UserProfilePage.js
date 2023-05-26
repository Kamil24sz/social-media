import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import WritePost from '../components/WritePost';
import Album from '../components/Album';
import AddAlbum from '../components/AddAlbum';
import '../App.css';
import NavBar  from '../components/NavBar';

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Posts');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(userResponse.data);

        const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        setPosts(postsResponse.data);

        const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        setAlbums(albumsResponse.data);
      } catch (err) {
        setError("Nie udało się wczytać danych użytkownika, spróbuj ponownie później");
      }
    };

    fetchData();
  }, [id]);

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

  const handleAddAlbum = (title) => {
    const newAlbum = {
      userId: 1,
      id: Date.now(),
      title,
    };
    setAlbums([newAlbum, ...albums]);
  };

  const removeAlbum = (albumToRemove) => {
    setAlbums(albums.filter(album => album.id !== albumToRemove.id));
  };

  if (error) {
    return <div className="UserProfile-error">{error}</div>;
  }

  if (!user || !posts.length) {
    return <div>Loading...</div>;
  }

  function formatAddress(address) {
    return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
  }
  
  function parseAddress(addressString) {
    const parts = addressString.split(',').map(part => part.trim());
    return {
      street: parts[0] || '',
      suite: parts[1] || '',
      city: parts[2] || '',
      zipcode: parts[3] || '',
    };
  }

  return (
    <div>
      <NavBar/>
    <div className="ProfileAndPosts">
      <div className="UserProfile">
        <img src="/images/profile.png" alt="Profile" className="UserProfile-image" />
        <h2 className="user-name">{user.name}</h2>
        <div className="user-details">
          <div className="user-detail">
            <label htmlFor="username">Username:</label>
            {id === '1' ? (
              <input id="username" type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            ) : (
              <p>{user.username}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="email">Email:</label>
            {id === '1' ? (
              <input id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            ) : (
              <p>{user.email}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="address">Address:</label>
            {id === '1' ? (
              <input id="address" type="text" value={formatAddress(user.address)} onChange={(e) => setUser({ ...user, address: parseAddress(e.target.value) })} />
            ) : (
              <p>{formatAddress(user.address)}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="phone">Phone:</label>
            {id === '1' ? (
              <input id="phone" type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="website">Website:</label>
            {id === '1' ? (
              <input id="website" type="text" value={user.website} onChange={(e) => setUser({ ...user, website: e.target.value })} />
            ) : (
              <p>{user.website}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="company">Company:</label>
            {id === '1' ? (
              <input id="company" type="text" value={user.company.name} onChange={(e) => setUser({ ...user, company: { ...user.company, name: e.target.value } })} />
            ) : (
              <p>{user.company.name}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="catchPhrase">Catch Phrase:</label>
            {id === '1' ? (
              <input id="catchPhrase" type="text" value={user.company.catchPhrase} onChange={(e) => setUser({ ...user, company: { ...user.company, catchPhrase: e.target.value } })} />
            ) : (
              <p>{user.company.catchPhrase}</p>
            )}
          </div>
          <div className="user-detail">
            <label htmlFor="bs">BS:</label>
            {id === '1' ? (
              <input id="bs" type="text" value={user.company.bs} onChange={(e) => setUser({ ...user, company: { ...user.company, bs: e.target.value } })} />
            ) : (
              <p>{user.company.bs}</p>
            )}
          </div>
        </div>
      </div>
      <div className="UserProfile-tabs">
        <div 
          className={`UserProfile-tab ${activeTab === 'Posts' ? 'UserProfile-tab-active' : ''}`} 
          onClick={() => setActiveTab('Posts')}
        >
          Posts
        </div>
        <div 
          className={`UserProfile-tab ${activeTab === 'Albums' ? 'UserProfile-tab-active' : ''}`} 
          onClick={() => setActiveTab('Albums')}
        >
          Albums
        </div>
      </div>
      {activeTab === 'Posts' ? (
        <div className="Posts">
          <WritePost onPost={handlePost} />
          {posts.map(post => (
            <Post key={post.id} post={post} user={user} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="Albums">
          <AddAlbum onAdd={handleAddAlbum} />
          {albums.map(album => (
            <Album key={album.id} album={album} user={user} onDelete={removeAlbum} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default UserProfilePage;
