import './App.css';
import React from "react";
import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css';
import './css/variables.css'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import User from './pages/User'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



// Routing Reference: https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
function App() {
  return (
    <GoogleOAuthProvider clientId="1052801351450-injkge7jr3h8gj19f16pbe81ktu9ruo2.apps.googleusercontent.com">
      <MantineProvider defaultColorScheme="light">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Router>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
