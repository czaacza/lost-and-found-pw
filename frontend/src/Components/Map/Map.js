// Map.js
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import { Icon } from 'leaflet';
import { useGlobalContext } from '../../context/GlobalContext';
import { useTranslation } from 'react-i18next';

function Map() {
  const { t } = useTranslation();
  const position = [52.220558592308336, 21.00985851319848];

  const { posts } = useGlobalContext();

  const iconLost = new Icon({
    iconUrl: require('../../img/geo-icon.png'),
    iconSize: [32, 32],
  });

  const iconFound = new Icon({
    iconUrl: require('../../img/pl-flag.png'),
    iconSize: [32, 32],
  });

  return (
    <div className="horizontal-card-container">
      <h2 className="map-title">Lost & Found Items</h2>
      <div className="horizontal-card">
        <div className="info-column">
          <h3>{t('Recently lost items')}</h3>
          <div className="contact-info">
            <h4>{t('Contact Information')}</h4>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="map-wrapper">
          <MapContainer center={position} zoom={18}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {posts &&
              posts.map(
                (post) =>
                  post.title &&
                  post.location &&
                  post.location.coordinates &&
                  post.location.coordinates[0] &&
                  post.location.coordinates[1] && (
                    <Marker
                      key={post._id}
                      position={post.location.coordinates}
                      icon={post.category === 'LOST' ? iconLost : iconFound}
                    >
                      <Popup>
                        <div className="popup-container">
                          <h3 className="text-sm font-bold">
                            {post.category === 'LOST' ? t('Lost') : t('Found')}{' '}
                            {post.title}
                          </h3>
                          <p>
                            {t('By')} {post.userId.username}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  )
              )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;
