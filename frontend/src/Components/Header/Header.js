// Header.jsx

import React from 'react';
import './Header.css';
import logo from '../../img/wut-logo-text.png'; // Replace with the actual path to your logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Left-aligned items */}
        <div className="header-left">
          <Link to="/" className="navbar-brand logo font-link">
            Lost & Found
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active font-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/map" className="nav-link font-link">
                Map
              </Link>
            </li>
            <li className="nav-item nav-item-profile">
              <Link
                to="/profile"
                className="nav-link btn btn-primary profile-button font-link"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-field"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Search field */}

        {/* University logo */}
        <div className="university-name">
          <img className="university-name-logo" src={logo} alt="WUT logo" />
        </div>
      </nav>
    </header>  
  );
}

export default Header;
