import React, { useState, useEffect } from 'react';
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

import Home from './pages/Home'
import Knowledgebase from './pages/Knowledgebase'
import Login from './pages/Login'
import User from './pages/User'
import Members from './pages/Members'
import Interest from './pages/Interest'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Assuming you have a function to get the user's email from the database
        const userEmail = await getUserEmailFromDatabase();

        // Set isLoggedIn based on whether the user has an email
        setLoggedIn(!!userEmail);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []); // Run this effect only once on component mount

  const handleLogout = () => {
    // Clear the user's email from localStorage
    localStorage.removeItem('email');
  
  
    // Update the isLoggedIn state
    setLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId="1052801351450-injkge7jr3h8gj19f16pbe81ktu9ruo2.apps.googleusercontent.com">
      <MantineProvider defaultColorScheme="light">
        <Router>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <div id='web-content'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/knowledgebase" element={<Knowledgebase />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>
            <Route path="/user" element={<User />} />
            <Route path="/members" element={<Members />} />
            <Route path="/interest" element={<Interest />} />
          </Routes>
          </div>
          <Footer/>
        </Router>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

// Replace this with your actual function to get user email from the database
const getUserEmailFromDatabase = async () => {
    const userEmail = localStorage.getItem('email');
    return userEmail ? userEmail : null;
  };

