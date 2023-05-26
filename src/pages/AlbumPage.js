import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Album from '../components/Album';
import AddAlbum from '../components/AddAlbum';
import NavBar from '../components/NavBar';

function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchAlbums = async () => {
      const albumsResponse = axios.get('https://jsonplaceholder.typicode.com/albums');
      const usersResponse = axios.get('https://jsonplaceholder.typicode.com/users');
      const photosResponse = axios.get('https://jsonplaceholder.typicode.com/photos');

      try {
        const [albumsData, usersData, photosData] = await Promise.all([albumsResponse, usersResponse, photosResponse]);

        if (isMounted) {
          setAlbums(albumsData.data);
          setUsers(usersData.data);
          setPhotos(photosData.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlbums();

    return () => {
      isMounted = false;
    };
  }, []);

  const removeAlbum = (albumToRemove) => {
    setAlbums(albums.filter(album => album.id !== albumToRemove.id));
  };

  const handleAddAlbum = (title) => {
    const newAlbum = {
      userId: 1,
      id: albums.length + 1,
      title: title
    };
    setAlbums([newAlbum, ...albums]);
    console.log(newAlbum);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredAlbums = albums.filter((album) =>
    users.find((user) => user.id === album.userId)?.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="AlbumPage">
        <AddAlbum onAdd={handleAddAlbum} />
        <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by user name"  className="filter-albums"/>
        {filteredAlbums.map((album) => {
          const user = users.find((user) => user.id === album.userId);
          const albumPhotos = photos.filter((photo) => photo.albumId === album.id);

          if (user) {
            return <Album key={album.id} album={album} photos={albumPhotos} user={user} onDelete={removeAlbum} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default AlbumPage;
