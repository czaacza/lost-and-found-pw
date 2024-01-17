// App.js

import React from 'react';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Map from './Components/Map/Map';
import Profile from './Components/Profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginRegisterPopup from './Components/LoginRegisterPopup/LoginRegisterPopup';
import { GlobalProvider } from './context/GlobalContext';

import './App.css';

function App() {
  const AppContent = () => {
    const { user } = useAuth();

    return (
      // add the containerCentered style if user is logged in
      <div>
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        ) : (
          <LoginRegisterPopup />
        )}
      </div>
    );
  };

  return (
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Header />
          <AppContent />
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
