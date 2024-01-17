import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure to npm install jwt-decode

const AuthContext = createContext();
const BASE_URL = 'http://localhost:3000/api/v1';
// const BASE_URL = 'http://10.0.2.2:3000/api/v1';
// const BASE_URL = 'http://192.168.1.27:3000/api/v1';
// const BASE_URL = 'https://budget-tracker-backend-47a6.onrender.com/api/v1/';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const userData = { username, password };
      const response = await axios.post(`${BASE_URL}/login`, userData);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        console.log('token: ', token);
        const decoded = jwtDecode(token); // Decode the token
        console.log('decoded: ', decoded);

        // get the user of decoded.id from the database
        const newUser = await axios.get(`${BASE_URL}/users/${decoded.id}`);
        console.log('newUser: ', newUser.data);

        if (decoded.id) {
          setUser({
            id: decoded.id,
            username: newUser.data.username,
            email: newUser.data.email,
            image: newUser.data.image,
            createdAt: newUser.data.createdAt,
          });
        } else {
          throw new Error('User ID not found in token');
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw Error(
        'Invalid credentials. Please try again or create a new account.'
      );
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
      throw Error('Registration failed.');
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
