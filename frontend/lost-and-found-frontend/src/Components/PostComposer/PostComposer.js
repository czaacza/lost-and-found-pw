// PostComposer.js

import React from 'react';
import './PostComposer.css'; // Make sure to create a PostComposer.css file for styling
import profilePic from '../../img/avatar-placeholder.png'; // Replace with the path to your profile picture
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faUserTag,
  faMapMarkerAlt,
  faSmile,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

function PostComposer() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submit action here
    console.log('Form submitted');
  };

  return (
    <form className="post-composer container" onSubmit={handleSubmit}>
      <div className="row ">
        <div className="col-auto">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
        <div className="col input-container">
          <textarea
            className="form-control input-field"
            placeholder="Please describe the item you lost or found..."
            rows="3" // Starts with 3 rows, but you can change this number
          ></textarea>
        </div>
      </div>
      <div className="separator"></div>
      <div className="actions">
        <div className="action-buttons">
          <div className="action">
            <FontAwesomeIcon icon={faImage} /> <p> Photo or Video</p>
          </div>
          <div className="action ">
            <FontAwesomeIcon icon={faUserTag} /> <p>Tag</p>
          </div>
          <div className="action ">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> <p>Location</p>
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary share-button">
            <FontAwesomeIcon icon={faPaperPlane} />
            <p>Post</p>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostComposer;
