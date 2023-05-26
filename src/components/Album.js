import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import AddPhoto from './AddPhoto';
import { Link } from 'react-router-dom';

function Album({ album, onDelete, photoId, showPhotoInLightbox }) {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const userLoggedInId = 1;
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    const fetchUserAndPhotos = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
        if (!isUnmounted) {
          setUser(userResponse.data);
        }

        const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);
        if (!isUnmounted) {
          setPhotos(photosResponse.data);
          setLightboxPhotos(photosResponse.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!isUnmounted) {
          setLoading(false);
        }
      }
    };
    fetchUserAndPhotos();

    return () => {
      setIsUnmounted(true);
    };
  }, [album, isUnmounted]);

  const openLightbox = (url) => {
    const index = lightboxPhotos.findIndex(photo => photo.url === url);
    setIsOpen(true);
    setCurrentImage(index);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setIsOpen(false);
  };

  const removePhoto = (photoToRemove) => {
    setPhotos(photos => photos.filter(photo => photo.id !== photoToRemove.id));
    setLightboxPhotos(lightboxPhotos => lightboxPhotos.filter(photo => photo.id !== photoToRemove.id));
  };

  const addPhoto = (photo) => {
    const newPhoto = {
      id: photos.length + 1,
      albumId: album.id,
      ...photo,
    };
    setPhotos([newPhoto, ...photos]);
    setLightboxPhotos([newPhoto, ...lightboxPhotos]);
  };

  useEffect(() => {
    if (photoId) {
      const index = lightboxPhotos.findIndex(photo => photo.id === photoId);
      if (index >= 0) {
        setIsOpen(true);
        setCurrentImage(index);
      }
    }
  }, [photoId, lightboxPhotos]);

  return (
    <div className="Album">
      <div className="Album-header">
        <img src="/images/profile.png" alt="Profile" className="Album-image" />
        <Link to={`/profile/${user.id}`}>
          <h3>{user.name}</h3>
        </Link>
        {userLoggedInId === album.userId && (
          <button className="remove-album-button" onClick={() => onDelete(album)}>
            Remove album
          </button>
        )}
      </div>
      <h2 className="Album-title">{album.title}</h2>
      <div className="Album-photos">
        {(showAll ? photos : photos.slice(0, 8)).map((photo) => (
          <div key={photo.id} className="photo-wrapper">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              onClick={() => openLightbox(photo.url)}
              className="Album-photo"
            />
            {userLoggedInId === album.userId && (
              <button className="remove-button" onClick={() => removePhoto(photo)}>
                X
              </button>
            )}
          </div>
        ))}
      </div>
      {lightboxPhotos.length > 8 && (
        <div className="Album-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show less' : `+ ${lightboxPhotos.length - 8} more`}
        </div>
      )}
      {isOpen && (
        <Lightbox
          mainSrc={lightboxPhotos[currentImage].url}
          nextSrc={lightboxPhotos[(currentImage + 1) % lightboxPhotos.length].url}
          prevSrc={lightboxPhotos[(currentImage + lightboxPhotos.length - 1) % lightboxPhotos.length].url}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setCurrentImage((currentImage + lightboxPhotos.length - 1) % lightboxPhotos.length)}
          onMoveNextRequest={() => setCurrentImage((currentImage + 1) % lightboxPhotos.length)}
          imageTitle={lightboxPhotos[currentImage].title}
          imageCaption={`${currentImage + 1} / ${lightboxPhotos.length}`}
          reactModalStyle={{ overlay: { zIndex: 1000 } }}
        />
      )}
      {album.userId === 1 && <AddPhoto onAdd={addPhoto} />}
    </div>
  );
}

export default Album;
