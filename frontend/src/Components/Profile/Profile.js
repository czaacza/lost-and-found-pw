// Profile.js

import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import UserPhoto from './UserPhoto/UserPhoto';
import UserInfo from './UserInfo/UserInfo';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from '../Post/Post';
import PostComposer from '../PostComposer/PostComposer';
import avatar from '../../img/avatar-placeholder.png'; // Replace with the path to your profile picture
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

function Profile() {
  const { t } = useTranslation();
  const { username } = useParams();
  const [user1, setUser1] = useState(null); // State to store the user profile
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();

  const loadUserProfile = async (username) => {
    try {
      setLoading(true); // Start loading
      const token = sessionStorage.getItem('userToken');
      if (token) {
        const userResponse = await axios.get(
            `${BASE_URL}/user/profile/${username}`,
            {
              withCredentials: true,
            }
        );
        setUser1(userResponse.data);
        sessionStorage.setItem('user', JSON.stringify(userResponse.data));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      sessionStorage.clear(); // Clear session storage on error
    } finally {
      setLoading(false); // End loading
    }
  };

  const getPostsByUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/user/${userId}`);
      setUserPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (username) {
      loadUserProfile(username);
    }
  }, [username]);

  useEffect(() => {
    if (user1 && user1._id) {
      getPostsByUser(user1._id);
    }
  }, [user1]);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
      <div className="profile-container">
        <div className="header-menu-container">
          <div className="header-menu">
            <div className="user-profile-info">
              <UserPhoto photo={user1 && user1.image ? user1.image : avatar} />
              <UserInfo label={t('Username')} value={user1 ? user1.username : ''} />
              <UserInfo label={t('Email')} value={user1 ? user1.email : ''} />
              <UserInfo
                  label={t('Date Joined')}
                  value={user1 ? user1.createdAt.slice(0, 10) : ''}
              />
            </div>
            <div>
              {user && user.username === username && <PostComposer />}
            </div>
          </div>
        </div>
        {/* show user posts */}
        <div className="profile-posts">
          <h3 className="text-center text-md text-gray-800 mb-3">{t('Your Posts:')}</h3>
          {userPosts &&
              userPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
  );
}

export default Profile;
