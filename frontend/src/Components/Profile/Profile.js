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
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
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
            <UserInfo
              label={t('Date Joined')}
              value={profileUser.createdAt.slice(0, 10)}
            />
          </div>
          <div className="user-contact-info">
            {/* <h2 className="text-lg text-bold">Contact info</h2> */}
            <ContactForm profileUser={profileUser} currentUser={user} />
          </div>
        </div>
      </div>
      {user && user.username === profileUser.username && (
        <div className="post-composer-profile-container">
          <PostComposer />
        </div>
      )}
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

const ContactForm = ({ profileUser, currentUser }) => {
  const [formData, setFormData] = useState({
    name: profileUser.name || '',
    surname: profileUser.surname || '',
    email: profileUser.email || '',
    phone: profileUser.phone || '',
  });
  const [isChanged, setIsChanged] = useState(false);

  const isEditable =
    currentUser && currentUser.username === profileUser.username;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/user/profile`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
    setIsChanged(false);
  };

  const { t } = useTranslation();

  return (
    <form className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">{t('First Name')}</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">{t('Surname')}</label>
          <input
            type="text"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
      </div>
      <div className="form-row full-width">
        <div className="form-group full-width">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
      </div>
      <div className="form-row full-width">
        <div className="form-group full-width">
          <label htmlFor="phone">{t('Phone')}</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
      </div>
      {isChanged && (
        <button type="button" className="save-button" onClick={handleSave}>
          Save <FontAwesomeIcon icon={faSave} />
        </button>
      )}
    </form>
  );
};

export default Profile;
