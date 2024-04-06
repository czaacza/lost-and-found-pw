import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BASE_URL = 'http://localhost:3000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { user, setUser } = useAuth();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (user) {
      getPostsByUser(user.id);
    }
  }, [user]);

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
      console.log('response: ', response);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsByUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/user/${userId}`);
      console.log('response: ', response);
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
      console.log('response: ', response);
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
      console.log('response: ', response);
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
      console.log('response: ', response);
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
      console.log('response: ', response);

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
      console.log('response: ', response);
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
        getPosts,
        getPostsByUser,
        addPost,
        deletePost,
        updatePost,
        addComment,
        removeComment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
