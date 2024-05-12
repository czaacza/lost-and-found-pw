import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, {request} from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure to npm install jwt-decode


const AuthContext = createContext();
const BASE_URL = 'http://localhost:3000/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async ( username ) => {
    try {
      setLoading(true); // Start loading

      const token = sessionStorage.getItem('userToken');
      if (token) {
        // Optional: Send token in Authorization header or as a cookie
        const userResponse = await axios.get('${BASE_URL}/user/profile/${username}', {
          withCredentials: true,
          // headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);
        sessionStorage.setItem('user', JSON.stringify(userResponse.data));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      sessionStorage.clear(); // Clear session storage on error
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    loadUserProfile(storedUsername);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password},
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem('userToken', response.data); // Store the token
        sessionStorage.setItem('username', username);
        await loadUserProfile(username); // Load and store user profile
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post(`${BASE_URL}/users`, {
        username,
        email,
        password,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      sessionStorage.clear(); // Clear session storage on logout
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
