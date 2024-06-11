// MainComponent.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Map from '../Map/Map';
import Profile from '../Profile/Profile';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { GlobalProvider, useGlobalContext } from '../../context/GlobalContext';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import RegisterComponent from '../Auth/RegisterComponent';
import LoginComponent from '../Auth/LoginComponent';
import Footer from '../Footer/Footer';
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import ListOfUsers from '../ListOfUsers/ListOfUsers';

function MainComponent() {
  const { theme } = useGlobalContext();

  const AppContent = () => {
    const { user } = useAuth();

    return (
      // add the containerCentered style if user is logged in
      <div className="main-content bg-gray-50 dark:bg-neutral-900">
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
    <div className={ theme }>
      <NavbarComponent />

      <AppContent />

      <Footer />
    </div>
  );
}

export default MainComponent;
