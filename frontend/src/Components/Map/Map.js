// sample React component
// Map.js
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';
import { Icon } from 'leaflet';

function Map() {
  const position = [52.220558592308336, 21.00985851319848];

  const markers = [
    {
      id: 1,
      position: [52.220558592308336, 21.00985],
      title: 'Zgubione kluczyki',
      description: '',
    },
    {
      id: 2,
      position: [52.220958592308336, 21.008],
      title: 'Telefon Iphone 14',
      description: '',
    },
    {
      id: 3,
      position: [52.222658592308336, 21.009],
      title: 'Buty sportowe',
      description: '',
    },
  ];

  const customIcon = new Icon({
    iconUrl: require('../../img/geo-icon.png'),
    iconSize: [32, 32],
    // iconAnchor: [12.5, 41],
  });

  return (
    <div className="map-container">
      <div className="title-container">
        <h3>Recently lost items</h3>
      </div>
      <MapContainer center={position} zoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={customIcon}
            >
              <Popup>{marker.title}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
