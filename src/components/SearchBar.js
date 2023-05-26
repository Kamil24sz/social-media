import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let results = [];

        if (searchText.trim() !== '') {
          if (searchType === 'users') {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?name_like=${searchText}`);
            results = response.data;
          } else if (searchType === 'posts') {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id_like=${searchText}`);
            results = response.data;
          } else if (searchType === 'albums') {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?id_like=${searchText}`);
            results = response.data;
          } else if (searchType === 'photos') {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?id_like=${searchText}`);
            results = response.data;
          }
        }

        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearchResults();
  }, [searchText, searchType]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const getPostLink = (postId) => `/post/${postId}`;
  const getAlbumLink = (albumId) => `/album/${albumId}`;

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-inputs">
        <input type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Search..." />

        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="users">Users</option>
          <option value="posts">Posts</option>
          <option value="albums">Albums</option>
          <option value="photos">Photos</option>
        </select>

        {searchText.trim() !== '' && (
          <button className="SearchBar-clear" onClick={handleClearSearch}>
            X
          </button>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="SearchResults">
          {searchResults.map((result) => (
            <div key={result.id} className="SearchResult">
              {searchType === 'users' && (
                <p>
                  <Link to={`/profile/${result.id}`}>{result.name}</Link>
                </p>
              )}
              {searchType === 'posts' && (
                <p>
                  <Link to={getPostLink(result.id)}>{result.id}.{result.title}</Link>
                </p>
              )}
              {searchType === 'albums' && (
                <p>
                  <Link to={getAlbumLink(result.id)}>{result.id}.{result.title}</Link>
                </p>
              )}
              {searchType === 'photos' && (
                <p>
                  <Link to={`/album/${result.albumId}?photoId=${result.id}`}>
                    {result.id}.{result.title}
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
