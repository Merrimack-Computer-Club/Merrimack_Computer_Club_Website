import React from "react";
import "../css/home.css";
import { Container } from "@mantine/core";
import {useEffect, useState} from 'react'

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

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

    </div>
  );
}

export default Home;
