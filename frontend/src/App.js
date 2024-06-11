// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Map from './Components/Map/Map';
import Profile from './Components/Profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';
import './App.css';
import RegisterComponent from './Components/Auth/RegisterComponent';
import LoginComponent from './Components/Auth/LoginComponent';
import Footer from './Components/Footer/Footer';
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import ListOfUsers from './Components/ListOfUsers/ListOfUsers';
import MainComponent from './Components/Main/MainComponent';

function App() {

  return (
    <AuthProvider>
        <GlobalProvider>
        <BrowserRouter> 
           <MainComponent />
        </BrowserRouter>
        </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
