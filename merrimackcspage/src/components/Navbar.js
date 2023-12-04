import React from 'react'
import { Button, Container } from '@mantine/core';
import '../css/navbar.css';

/* Nav bar reference: https://www.w3schools.com/css/css_navbar_horizontal.asp */
function Navbar() {

  return (

    <ul>
      <li ><a className="active" href="/"><span>Home</span></a></li>
      <li ><a href="/blog"><span>Blog</span></a></li>
      <Button style={{borderRadius: '20px'}}><h1>Log in </h1></Button>
    </ul>


  )
}

export default Navbar
