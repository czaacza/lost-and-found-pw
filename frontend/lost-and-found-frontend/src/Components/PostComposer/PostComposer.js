// PostComposer.js

import React, { useState } from 'react';
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

function PostComposer({ postType }) {
  const { user } = useAuth();
  const { addPost } = useGlobalContext();

  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);

  const handleAddPost = async () => {
    const postToAdd = {
      userId: user.id,
      text,
      date: new Date(),
      category: postType,
      photos,
      tags,
      likes: [],
      comments: [],
    };
    await addPost(postToAdd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submit action here
    handleAddPost();
  };

  return (
    <form
      className="post-composer container rounded-xl border p-4 shadow-md w-11/12 "
      onSubmit={handleSubmit}
    >
      <div className="row ">
        <div className="col-auto">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
        <div className="col input-container">
          <textarea
            className="form-control input-field"
            placeholder="Please describe the item you lost or found..."
            rows="3" // Starts with 3 rows, but you can change this number
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <button type="submit" className="share-button">
            <FontAwesomeIcon icon={faPaperPlane} />
            <p>Post</p>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostComposer;
