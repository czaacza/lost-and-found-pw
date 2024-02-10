import React, { useEffect, useState, useRef } from 'react';
import './MapChooser.css';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import { Icon } from 'leaflet';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
});

function MyComponent({ setChosenPosition }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setChosenPosition([lat, lng]);
    },
  });
  return null;
}
const MapChooser = ({ position, setPosition }) => {
  const centerPosition = [52.220558592308336, 21.00985851319848];

  return (
    <div className="map-card mt-4 mb-4">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            Choose item location
          </h5>
          <div className="map-chooser-container">
            <div className="map-chooser">
              <MapContainer
                center={centerPosition}
                zoom={18}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {position && position[0] && position[1] && (
                  <Marker position={position} icon={icon}>
                    <Popup>Your lost item estimated location</Popup>
                  </Marker>
                )}
                <MyComponent setChosenPosition={setPosition} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChooser;
