import {React, useState} from 'react';
import { Button, Image } from '@mantine/core';
import '../css/variables.css';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
  
  const logo_path = './merrimack-computer-club-removebg-preview.png';

  return (
    <div className='NavBarClass'>

    <ul>

      {<li className="logo"><a href="/"><Image href="/" radius="md" h={50} w="auto" fit="contain" src={logo_path} style={{backgroundColor: "black"}} /></a></li>}  {/* Logo */}
      <li ><a className="active" href="/"><span>Home</span></a></li>
      <li ><a href="/knowledgebase"><span>Knowledgebase</span></a></li>
      <li ><a href="/members"><span>Members</span></a></li>
      <li ><a href="/user"><span>Profile</span></a></li>
    
        {isLoggedIn ? (
          // If logged in, show the logout button
          <Button style={{ borderRadius: '20px', paddingTop: '5px'}} onClick={onLogout}>
            <h1>Logout</h1>
          </Button>
        ) : (
          // If not logged in, show the login link
          <Link to="/login">
            <Button style={{ borderRadius: '20px', paddingTop: '5px' }}>
              <h1>Login</h1>
            </Button>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
