// sample React component
// Map.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Map.css';

function Map() {
  return (
    <div className="map">
      <div className="map-container">
        <div className="map-buttons">
          <Link to="/map" className="btn btn-primary map-button">
            Lost
          </Link>
          <Link to="/map" className="btn btn-primary map-button">
            Found
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Map;
