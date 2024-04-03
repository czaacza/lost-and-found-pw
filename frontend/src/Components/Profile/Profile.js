/* sample Profile Component */
// // Profile.js

import React from 'react';
import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import UserPhoto from './UserPhoto/UserPhoto';
import UserInfo from './UserInfo/UserInfo';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from '../Post/Post';
import PostComposer from '../PostComposer/PostComposer';
import avatar from '../../img/avatar-placeholder.png'; // Replace with the path to your profile picture

function Profile() {
  const { user } = useAuth();
  const { userPosts } = useGlobalContext();

  return (
    <div className="profile-container">
      <div className="header-menu-container">
        <div className="header-menu">
          <div className="user-profile-info">
            <UserPhoto photo={user && user.image ? user.image : avatar} />
            <UserInfo label="Username" value={user ? user.username : ''} />
            <UserInfo label="Email" value={user ? user.email : ''} />
            {/* Masked for privacy */}
            <UserInfo
              label="Date Joined"
              value={user ? user.createdAt.slice(0, 10) : ''}
            />
          </div>
          <div>
            <PostComposer />
          </div>
        </div>
      </div>
      {/* show user posts */}
      <div className="profile-posts">
        <h3>Your Posts:</h3>
        {userPosts &&
          userPosts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Profile;
