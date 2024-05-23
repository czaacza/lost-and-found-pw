// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Map from './Components/Map/Map';
import Profile from './Components/Profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';

import './App.css';
import RegisterComponent from './Components/Auth/RegisterComponent';
import LoginComponent from './Components/Auth/LoginComponent';
import Footer from './Components/Footer/Footer';
import ListOfUsers from './Components/ListOfUsers/ListOfUsers'

function App() {
  const AppContent = () => {
    const { user } = useAuth();
    return (
      // add the containerCentered style if user is logged in
      <div className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/users" element={<ListOfUsers />} />
          {!user && <Route path="/login" element={<LoginComponent />} />}
          {!user && <Route path="/signup" element={<RegisterComponent />} />}
        </Routes>
      </div>
    );
  };

  return (
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <NavbarComponent />
          <AppContent />
          <Footer />
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
