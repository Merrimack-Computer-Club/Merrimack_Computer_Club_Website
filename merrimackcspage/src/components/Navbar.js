import {React, useState} from 'react';
import { Button } from '@mantine/core';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
  
  return (
    <div className='NavBarClass'>

    <ul>
      <li ><a className="active" href="/"><span>Home</span></a></li>
      <li ><a href="/Knowledgebase"><span>Knowledgebase</span></a></li>
      <li ><a href="/user"><span>Profile</span></a></li>
    
        {isLoggedIn ? (
          // If logged in, show the logout button
          <Button style={{ borderRadius: '20px' }} onClick={onLogout}>
            <h1>Logout</h1>
          </Button>
        ) : (
          // If not logged in, show the login link
          <Link to="/login">
            <Button style={{ borderRadius: '20px' }}>
              <h1>Login</h1>
            </Button>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
