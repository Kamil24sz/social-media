import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Album from '../components/Album';
import { useParams, useLocation } from 'react-router-dom';
import NavBar  from '../components/NavBar';

function AlbumDetailsPage() {
  const [album, setAlbum] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
        setAlbum(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramPhotoId = searchParams.get('photoId');
    if (paramPhotoId) {
      setPhotoId(parseInt(paramPhotoId));
    }
  }, [location.search]);

  const handleShowPhotoInLightbox = (photoId) => {
    setPhotoId(photoId);
    console.log(photoId);
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar/>
      <Album album={album} onDelete={() => {}} photoId={photoId}  showPhotoInLightbox={handleShowPhotoInLightbox} />
    </div>
  );
}

export default AlbumDetailsPage;
