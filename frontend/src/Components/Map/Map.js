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
    iconUrl: require('../../img/geo-icon-blue.png'),
    iconSize: [32, 32],
  });

  const handleGeoTagClick = (username) => {
    // redirect to profile/username
    return () => {
      window.location.href = `/profile/${username}`;
    };
  };

  return (
    <div className="bg-white">
      <div className="horizontal-card-container">
        <div className="horizontal-card">
          <div className="info-column p-5">
            <h3 className="mb-3 font-bold">{t('Lost an item?')}</h3>
            <div className="contact-info">
              <p className="mb-5">{t('Help Description')} </p>
              <p>{t('Main Building')}</p>
              <p>{t('Address')}: Plac Politechniki 1</p>
              <p>{t('Phone')}: +48 22 234 72 11</p>
              <button className="mt-5 px-4 py-2 text-white font-medium bg-[#6A1515] hover:bg-[#551111] active:bg-[#551111] rounded-lg duration-150">
                {t('Contact us')}{' '}
              </button>
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
                          <button
                            className="popup-container"
                            onClick={handleGeoTagClick(post.userId.username)}
                          >
                            <h3 className="text-sm font-bold">
                              {post.category === 'LOST'
                                ? t('Lost')
                                : t('Found')}{' '}
                              {post.title}
                            </h3>
                            <p>
                              {t('By')} {post.userId.username}
                            </p>
                          </button>
                        </Popup>
                      </Marker>
                    )
                )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
