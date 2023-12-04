import React from 'react'
import '../css/home.css'
import { Container } from '@mantine/core';

function Home() {
  console.log("in home")
  return (
    <div style={{ backgroundColor: 'lightgrey', paddingBottom: '40px', height: '100vh' }}>
      <Container className='titlecontainer'>
        <h1 className='title animate-charcter'>Computer Science Knowledge Base</h1>
      </Container>
    </div>
  )
}

export default Home
