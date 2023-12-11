//import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"; // Updated import statements
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode' // import dependency
import { useNavigate } from "react-router-dom";
import '../css/login.css'


function Login() {
  
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");

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
                size="large"
                shape="circle"
                logo_alignment="center"
                width={300}

                onSuccess={credentialResponse => {
                  setError("");

                  const decode = jwtDecode(credentialResponse.credential);

                  if(!decode.email.endsWith("@merrimack.edu")) {
                    setError("User must log in with merrimack email address.");
                    console.log("Must log in with a Merrimack Email.");
                    return;
                  }

                  // Update the state and navigate
                  setEmail(decode.email);
                  localStorage.setItem("email", decode.email);
                  navigate("/");
                }}
                onError={() => {
                  setError("Error with authentication");
                  console.log('Login Failed');
                }}
              />
              <p style={{color:"red", textAlign:"center", fontSize:21, padding:"10px 10px 10px 10px"}}>{error}</p>
        </Container>
    </div>
  );
}

export default Login;
