// Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import UserPhoto from './UserPhoto/UserPhoto';
import UserInfo from './UserInfo/UserInfo';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from '../Post/Post';
import avatar from '../../img/avatar-placeholder.png'; // Replace with the path to your profile picture
import { useTranslation } from 'react-i18next';
import PostComposer from '../PostComposer/PostComposer';
import { useAuth } from '../../context/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BASE_URL = 'http://localhost:3000/api/v1';

const UploadButton = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-button">
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="upload-label">
        <div className="plus-icon">
          {' '}
          <FontAwesomeIcon icon={faPlus} className="text-lg font-extrabold" />
        </div>
      </label>
    </div>
  );
};

function Profile() {
  const { t } = useTranslation();
  const { username } = useParams();
  const { getPostsByUsername } = useGlobalContext();
  const [profileUserPosts, setProfileUserPosts] = useState([]);
  const [profileUser, setProfileUser] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/profile/external/${username}`
        );
        setProfileUser(response.data);
        const posts = await getPostsByUsername(username);
        setProfileUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username, getPostsByUsername]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/profile/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfileUser({ ...profileUser, image: response.data.image });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  if (!profileUser) {
    return <div></div>;
  }

  return (
    <div className="profile-container">
      <div className="header-menu-container">
        <div className="header-menu">
          <div className="user-profile-info">
            <div className="profile-picture-container relative">
              <UserPhoto photo={profileUser.image || avatar} />
              {user && user.username === profileUser.username && (
                <UploadButton onUpload={handleUpload} />
              )}
            </div>
            <UserInfo label={t('Username')} value={profileUser.username} />
            <UserInfo label={t('Email')} value={profileUser.email} />
            <UserInfo
              label={t('Date Joined')}
              value={profileUser.createdAt.slice(0, 10)}
            />
          </div>
          {user && user.username === profileUser.username && (
            <div>
              <PostComposer />
            </div>
          )}
        </div>
      </div>
      {/* show user posts */}
      <div className="profile-posts">
        <h3 className="text-center text-md text-gray-800 mb-3">
          {t('Posts by')} {profileUser.username}:
        </h3>
        {profileUserPosts &&
          profileUserPosts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Profile;
