// globalContext.js

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BASE_URL = 'http://localhost:3000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [profileUserPosts, setProfileUserPosts] = useState([]);

  useEffect(() => {
    loadUsers();
    getPosts();
  }, []);

  useEffect(() => {
    if (user) {
      getPostsByUserId(user._id);
    }
  }, [user]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await axios.get(`${BASE_URL}/allusers`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const getPosts = async (sortOrder = 'newest') => {
    try {
      let response;
      if (sortOrder === 'oldest') {
        response = await axios.get(`${BASE_URL}/posts/oldest`);
      } else if (sortOrder === 'most-comments') {
        response = await axios.get(`${BASE_URL}/posts/most-comments`);
      } else {
        response = await axios.get(`${BASE_URL}/posts`);
      }
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/user/userId/${userId}`
      );
      setUserPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsByUsername = async (username) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/user/username/${username}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async (postToAdd) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, postToAdd, {
        withCredentials: true,
      });
      getPosts();
      console.log('post added');
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`, {
        withCredentials: true,
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (
    id,
    text,
    date,
    category,
    photos,
    tags,
    likes,
    comments
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/posts/${id}`,
        {
          text,
          date,
          category,
          photos,
          tags,
          likes,
          comments,
        },
        {
          withCredentials: true,
        }
      );
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (commentToAdd) => {
    try {
      const token = sessionStorage.getItem('userToken');

      const response = await axios.post(`${BASE_URL}/comments`, commentToAdd, {
        withCredentials: true,
      });

      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/comments/${id}`, {
        withCredentials: true,
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`, {
        withCredentials: true,
      });
      getPosts();
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/likes/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        posts,
        userPosts,
        users,
        loadingUsers,
        getPosts,
        getPostsByUserId,
        getPostsByUsername,
        addPost,
        deletePost,
        updatePost,
        addComment,
        removeComment,
        loadUsers,
        profileUserPosts,
        removePost,
        handleLike,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
