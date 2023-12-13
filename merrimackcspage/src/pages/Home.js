import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { app as firebaseApp } from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import StockVideo from "../components/StockVideo";

function Home() {
  // Database vars

  const [triggerBlur, setTriggerBlur] = useState(false)

  // Runs on initial render, sets listeners to database
  useEffect(() => {
    //Listens to window scroll events and triggers a blur effect on a div
    // after the user has scrolled past a certain position.
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPosition = 200; // Adjust this value as needed

      if (scrollY > triggerPosition) {
        setTriggerBlur(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

 
  function isImageUrl(url) {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  }

  return (
    <div>
      <div className="content-container"
        style={{
          backgroundColor: "transparent",
       
        }}
      >
        <Container fluid>
          <Row>
            <Col>
              <div style={{ margin: `3rem 10px 10px 10px`, backgroundColor: `rgb(255 255 255 / 15%)`, paddingLeft: "30px", paddingRight: "30px", borderRadius: `10px`, inlineSize: `min-content` }}>
                <h1 style={{}} className="title animate-charcter">
                  Merrimack Computer Club
                </h1>
              </div>
            </Col>
          </Row>
        </Container>

        <StockVideo></StockVideo>

      </div>

      <Container>
        <Row>
          <Col>
            <Container className="blurdiv">
              <h1 className={triggerBlur === true ? `blur-text blur` : 'blur-text'}>
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
          </Col>
        </Row>
      </Container>

 
    </div>
  );
}

export default Home;
