import { Container } from "react-bootstrap";
import { app, database } from './firebaseConfig';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { set, ref } from 'firebase/database';  
import '../css/login.css';

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  const addUserToFirebase = async (email, firstName, lastName, user_description, avatar) => {
    try {
      // Get a reference to the Realtime Database
      const db = database;
  
      // Use the email before "@merrimack.edu" as the Firebase key
      const firebaseKey = email.split('@')[0].replace(/\./g, ",");
      console.log("Firebase Key:", firebaseKey);
  
      // Construct the path
      const path = `users/${firebaseKey}`;
      console.log("Firebase Path:", path);
  
      // Update the localStorage to contain the userid
      localStorage.setItem("userid", firebaseKey);
  
      // Provide default values for user_description and avatar if not set
      const defaultUserDescription = "User description not set, please update your profile.";
      const defaultAvatar = "path-to-default-avatar.jpg";
  
      // Use the set function on the reference to add data to the path
      await set(ref(db, path), {
        email: email,
        firstName: firstName,
        lastName: lastName,
        user_description: user_description || defaultUserDescription,
        avatar: avatar || defaultAvatar,
        display: true,
      });
  
      console.log("User added to Firebase Realtime Database");
    } catch (error) {
      console.error("Error adding user to Firebase:", error);
      setError("Error adding user to Firebase");
    }
  };
  
  
  
  

  const handleGoogleLoginSuccess = (credentialResponse) => {
    setError("");
  
    const decode = jwtDecode(credentialResponse.credential);
  
    if (!decode.email.endsWith("@merrimack.edu")) {
      setError("User must log in with a Merrimack email address.");
      console.log("Must log in with a Merrimack Email.");
      return;
    }
  
    // Update the state and navigate
    setEmail(decode.email);
    localStorage.setItem("email", decode.email);
  
    // Extract first and last names from the decoded JWT
    const firstName = decode.given_name || '';
    const lastName = decode.family_name || '';
    const avatar = decode.picture || '';
    // Trigger the addUserToFirebase function with the Google avatar
    // Trigger the addUserToFirebase function with the Google avatar
    addUserToFirebase(decode.email, firstName, lastName, "", avatar);

  
    // Update the login status in the App component
    setLoggedIn(true);
  
    navigate("/");
  };
  

  return (
    <div className="container">
      <Container {...demoProps} className="login-container">
        <h3 style={{ padding: "10px 10px 10px 10px" }}>Sign in with Google</h3>
        <GoogleLogin
          size="large"
          shape="circle"
          logo_alignment="center"
          width={300}
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            setError("Error with authentication");
            console.log('Login Failed');
          }}
        />
        <p style={{ color: "red", textAlign: "center", fontSize: 21, padding: "10px 10px 10px 10px" }}>{error}</p>
      </Container>



    </div>
  );
}

export default Login;
