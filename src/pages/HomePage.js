import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import NavBar  from '../components/NavBar';
import '../App.css';


function HomePage() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isLoggedIn ? (<NavBar/>) : (()=>{})}
    <div className="home">
      
      {isLoggedIn ? (
        <div>
          
          <h1 className="home-heading">Welcome back!</h1>
          <nav>
            <ul className="home-nav">
              <li>
                <button className="home-button">
                  <Link to="/profile/1" className="home-button-link">
                    Profile
                  </Link>
                </button>
              </li>
              <li>
                <button className="home-button">
                  <Link to="/posts" className="home-button-link">
                    Posts
                  </Link>
                </button>
              </li>
              <li>
                <button className="home-button">
                  <Link to="/albums" className="home-button-link">
                    Albums
                  </Link>
                </button>
              </li>

              <li>
                <button className="home-logout-button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <h1 className="home-heading" style={{ marginTop: '200px' }}>Welcome to our website!</h1>
          <button className="home-button">
            <Link to="/login" className="home-button-link">
              Login
            </Link>
          </button>
          <button className="home-button">
            <Link to="/register" className="home-button-link">
              Register
            </Link>
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default HomePage;
