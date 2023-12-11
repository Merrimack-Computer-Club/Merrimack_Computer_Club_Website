//import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"; // Updated import statements
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode' // import dependency
import { useNavigate } from "react-router-dom";
import '../css/login.css'


function Login() {
  
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <div className="container">
        <Container {...demoProps} className="login-container">
            <h3 style={{padding: "10px 10px 10px 10px"}}>Sign in with Google</h3>
            <GoogleLogin
                onSuccess={credentialResponse => {
                  const decode = jwtDecode(credentialResponse.credential);

                  if(decode.email) {

                  }

                  setEmail(decode.email);
                  navigate("/");
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
        </Container>
    </div>
  );
}

export default Login;
