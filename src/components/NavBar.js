import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css';

function NavBar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        const user = response.data;
        setUserName(user.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <nav className="NavBar">
      <div className="NavBar-left">
        <Link to="/" className="NavBar-logo">
          <img src="/logo192.png" alt="Logo" />
        </Link>
        <Link to="/posts" className="NavBar-link" key="posts">
          Posty
        </Link>
        <Link to="/albums" className="NavBar-link" key="albums">
          Albumy
        </Link>
      </div>

      <div className="NavBar-center">
        <SearchBar />
      </div>

      <div className="NavBar-right">
        <div className="NavBar-profile">
          <img src="/images/profile.png" alt="Profile" className="NavBar-profileImage" />
          <Link to="/profile/1" className="NavBar-profileName">
            {userName}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
