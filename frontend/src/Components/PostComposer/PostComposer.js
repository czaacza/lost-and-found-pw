// PostComposer.js

import React, { useState, useEffect } from 'react';
import './PostComposer.css'; // Make sure to create a PostComposer.css file for styling
import profilePic from '../../img/avatar-placeholder.png'; // Replace with the path to your profile picture
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faUserTag,
  faMapMarkerAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { useGlobalContext } from '../../context/GlobalContext';
import FileUpload from './FileUpload/FileUpload';
import MapChooser from './MapChooser/MapChooser';
import { useTranslation } from "react-i18next";

function PostComposer({ postType, setPostType }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addPost } = useGlobalContext();

  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [title, setTitle] = useState('item');

  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (location && location[0] && location[1]) {
      // Use OpenStreetMap Nominatim for reverse geocoding
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // This path might vary depending on the response structure
          console.log('Raw location data', data);
          console.log('Real location name', data.display_name);
          const address = data['address'] ? data['address'] : {};
          const amenity = address['amenity'] ? address['amenity'] + ', ' : '';
          const road = address['road'] ? address['road'] : '';
          const houseNumber = address['house_number']
            ? address['house_number']
            : '';
          const quarter = address['quarter'] ? ', ' + address['quarter'] : '';

          const newLocationName = `${amenity} ${road} ${houseNumber}${quarter}`;

          setLocationName(newLocationName);
        })
        .catch((error) => console.log(error));
    }
  }, [location]); // This effect runs when the location state changes

  const handleFileChange = (event) => {
    const files = event.target.files;
    const photosArray = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos(photosArray);
  };

  const handleAddPost = async () => {
    const postToAdd = {
      userId: user._id,
      title,
      text,
      date: new Date(),
      category: postType,
      photos,
      tags,
      likes: [],
      comments: [],
      location: location
        ? {
            type: 'Point',
            coordinates: location,
          }
        : null,
    };
    await addPost(postToAdd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPost();
    setText('');
    setPhotos([]);
    setTags([]);
    setLocation(null);
    setLocationName('');
    // clear the FileUpload
    setShowFileUpload(false);
  };

  return (
    <div className="post-composer container rounded-xl border p-4 pt-3 shadow-md w-10/12">
      {/* One Button, changes the text to Lost/Found when clicked and changes setPostType  */}
      <div className="mb-2 text-center font-bold text-gray-800 dark:text-white header-container">
        <div className="header-title">
          {t('I')}
          <span
            className="mx-1 text-[#6a1515] cursor-pointer underline header-span"
            onClick={() => setPostType(postType === 'LOST' ? 'FOUND' : 'LOST')}
          >
            {postType === 'LOST' ? t('lost') : t('found')}
          </span>
        </div>
        <input
          type="text"
          placeholder={t('item')}
          className="item-name-input ml-1 text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
          aria-label="Item name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <form className="" onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-auto">
            <img src={profilePic} alt="Profile" className="profile-pic" />
          </div>
          <div className="col input-container">
            <textarea
              className="form-control input-field bg-gray-50"
              placeholder={t('Please describe the item you lost or found...')}
              rows="3" // Starts with 3 rows, but you can change this number
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="separator"></div>
        <div className="actions">
          <div className="action-buttons">
            <div
              className="action bg-gray-50 hover:bg-gray-300"
              onClick={() => setShowFileUpload(!showFileUpload)}
            >
              <FontAwesomeIcon icon={faImage} />{' '}
              <p className="text-sm">{t('Photo or Video')}</p>
            </div>
            <div className="action bg-gray-50 hover:bg-gray-300">
              <FontAwesomeIcon icon={faUserTag} />{' '}
              <p className="text-sm">{t('Tag')}</p>
            </div>
            <div
              className="action bg-gray-50 hover:bg-gray-300"
              onClick={() => setShowLocation(!showLocation)}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
              <p className="text-sm">{t('Location')}</p>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="share-button">
              <FontAwesomeIcon icon={faPaperPlane} />
              <p>{t('Post')}</p>
            </button>
          </div>
        </div>
      </form>

      {showFileUpload && <FileUpload onChange={handleFileChange} />}
      {showLocation && (
        <MapChooser position={location} setPosition={setLocation} />
      )}
      {((photos && photos.length > 0) || locationName) && (
        <div className="separator"></div>
      )}
      <div className="location-display">
        {locationName && (
          <div>
            <h5 className="mb-1 mt-3 text-md font-bold tracking-tight text-gray-900 dark:text-white">
              {t('Estimated location:')}
            </h5>
            <p>{locationName}</p>
          </div>
        )}
      </div>
      {photos && photos.length > 0 && (
        <div className="mt-3 mb-3">
          <h5 className="mb-1 mt-3 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            Your photos:
          </h5>
          <div className="uploaded-photos grid grid-cols-5 gap-2">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="photo-wrapper"
                style={{ paddingBottom: '100%', position: 'relative' }}
              >
                <img
                  src={photo.url}
                  alt={`Uploaded ${photo.name}`}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  className="rounded-lg "
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostComposer;
