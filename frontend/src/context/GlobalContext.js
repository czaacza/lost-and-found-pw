import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import {useParams} from "react-router-dom";

const BASE_URL = 'http://localhost:3000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children, username }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { user, setUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  console.log("I am there new user", username)

  useEffect(() => {
    loadUsers();
    getPosts();
  }, []);

  useEffect(() => {
    if (user) {
      getPostsByUser(user._id);
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

  const getPostsByUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/user/${userId}`);
      setUserPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async (postToAdd) => {
    try {
      console.log('postToAdd: ', postToAdd);
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
      console.log('ADD COMMENT, COMMENT TO ADD:', commentToAdd);
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

  return (
    <GlobalContext.Provider
      value={{
        posts,
        userPosts,
        users,
        loadingUsers,
        getPosts,
        getPostsByUser,
        addPost,
        deletePost,
        updatePost,
        addComment,
        removeComment,
        loadUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (username) => {
  return useContext(GlobalContext);
};
