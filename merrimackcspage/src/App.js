import React, { useState } from 'react';
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import './css/variables.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar";

import Home from './pages/Home'
import Knowledgebase from './pages/Knowledgebase'
import Login from './pages/Login'
import User from './pages/User'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId="1052801351450-injkge7jr3h8gj19f16pbe81ktu9ruo2.apps.googleusercontent.com">
      <MantineProvider defaultColorScheme="light">
        <Router>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/Knowledgebase" element={<Knowledgebase />} />
        
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />

            <Route path="/user" element={<User />} />
          </Routes>
        </Router>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
