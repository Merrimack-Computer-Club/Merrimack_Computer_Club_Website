import React, { useState } from 'react';
import { Button, Image } from '@mantine/core';
import '../css/variables.css';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logo_path = './merrimack-computer-club-removebg-preview.png';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='NavBarClass'>
      <ul className={isMobileMenuOpen ? 'mobile-menu-open' : ''}>
        <li className="logo">
          <a href="/">
            <Image
              href="/"
              radius="md"
              h={50}
              w="auto"
              fit="contain"
              src={logo_path}
              style={{ backgroundColor: 'black' }}
            />
          </a>
        </li>
        <li><a className="active" href="/"><span>Home</span></a></li>
        <li><a href="/knowledgebase"><span>Knowledgebase</span></a></li>
        <li><a href="/members"><span>Members</span></a></li>
        <li><a href="/user"><span>Profile</span></a></li>
        <li><a href="/interest"><span>Interest</span></a></li>
        {isLoggedIn ? (
          <li>
            <Button style={{ borderRadius: '20px', paddingTop: '5px' }} onClick={onLogout}>
              <h1>Logout</h1>
            </Button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <Button style={{ borderRadius: '20px', paddingTop: '5px' }}>
                <h1>Login</h1>
              </Button>
            </Link>
          </li>
        )}
        {/* Hamburger menu icon for mobile */}
        <li className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <div className="menu-icon-line"></div>
          <div className="menu-icon-line"></div>
          <div className="menu-icon-line"></div>
          
        </li>
        
      </ul>
        
    </div>
  );
}

export default Navbar;
