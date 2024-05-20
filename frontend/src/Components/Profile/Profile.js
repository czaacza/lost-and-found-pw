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

const BASE_URL = 'http://localhost:3000/api/v1';

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

  if (!profileUser) {
    return <div></div>;
  }

  return (
    <div className="profile-container">
      <div className="header-menu-container">
        <div className="header-menu">
          <div className="user-profile-info">
            <UserPhoto photo={profileUser.image || avatar} />
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
