import React from 'react'
import { Button } from '@mantine/core';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

/* Nav bar reference: https://www.w3schools.com/css/css_navbar_horizontal.asp */
function Navbar() {

  return (

    <div className='NavBarClass'>
    <ul>
      <li ><a className="active" href="/"><span>Home</span></a></li>
      <li ><a href="/Knowledgebase"><span>Knowledgebase</span></a></li>
      <li ><a href="/user"><span>Profile</span></a></li>
      <Link to="/login">
        <Button style={{borderRadius: '20px'}}><h1>Log in </h1></Button>
      </Link>
    </ul>
    </div>


  )
}

export default Navbar
