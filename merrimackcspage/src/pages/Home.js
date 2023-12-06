import React from "react";
import "../css/home.css";
import { Container, Input, Button } from "@mantine/core";
import {useEffect, useState} from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app as firebaseApp } from './firebaseConfig';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formData, setFormData] = useState({ title: '', content: '' });

  // On initial render, this useeffect runs and gets the scroll position. Once the user scrolls, the blurring in the blur div will activate
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to the Firestore database
    const db = getFirestore(firebaseApp);

    // Add a new document with the form data to the "sections" collection
    await addDoc(collection(db, 'sections'), formData);

    // Reset the form data
    setFormData({ title: '', content: '' });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  
  return (
    <div>
      <div
        style={{
          backgroundColor: "lightgrey",
          paddingBottom: "40px",
          height: "80vh",
        }}
      >
        <Container fluid>
          <Container className="titlecontainer">
            <h1 className="title animate-charcter">
              Computer Science Knowledge Base
            </h1>
          </Container>
        </Container>
      </div>

{/* Reference https://codepen.io/alvarotrigo/pen/ExvqdNa */}
      <Container className="blurdiv">
      <h1 className={`blur ${scrollPosition > 100 ? "scrolled" : ""}`}>
          <span>There</span>
          <span>are</span>
          <span>no</span>
          <span>limits</span>
          <span>to</span>
          <span>what</span>
          <span>you</span>
          <span>can</span>
          <span>accomplish,</span>
          <span>except</span>
          <span>the</span>
          <span>limits</span>
          <span>you</span>
          <span>place</span>
          <span>on</span>
          <span>your</span>
          <span>own</span>
          <span>thinking.</span>
        </h1>
        </Container>
        <Container className="blurdiv">
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Input
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
          <Button type="submit">Add to Knowledgebase</Button>
        </form>
      </Container>

    </div>
  );
}

export default Home;
