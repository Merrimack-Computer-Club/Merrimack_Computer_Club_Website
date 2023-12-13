import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { app as firebaseApp } from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import StockVideo from "../components/StockVideo";

function Home() {
  // Database vars
  const db = getDatabase();
  const knowledgeBaseRef = ref(db, 'knowledgeBases/')

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

      
      {/* Information and posts will go below here */}
      <div className="content">

        {/* About us: */}
        <Container className="content-container">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={image_1_path}
                height={500}
                alt="Computer Science Students One"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>About Us</Text>
              <Badge color="pink">info</Badge>
            </Group>

            <Text mt="sm" size="sm" c="dimmed" span inherit>
             At the Merrimack College Computer Club, we're more than just a community of tech enthusiasts – we're a dynamic hub for creativity,
             collaboration, and innovation. Founded on the principles of curiosity and inclusivity, 
             our club brings together students from diverse backgrounds who share a 
             common passion for computer science, programming, and all things tech.
            </Text>
          </Card>
        </Container>

        {/* Mission Statement: */}
        <Container className="content-container">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={image_2_path}
                height={500}
                alt="Computer Science Students Two"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Mission Statement</Text>
              <Badge color="pink">info</Badge>
            </Group>

            <Text mt="sm" size="sm" c="dimmed" span inherit>
              Our mission is to foster a welcoming space where students can:

               <b> Learn</b>: Engage in hands-on learning experiences through workshops, projects, and collaborative coding sessions.
               <b> Innovate</b>: Explore and push the boundaries of technology, encouraging creative problem-solving and out-of-the-box thinking.
               <b> Connect</b>: Build lasting connections with like-minded peers, industry professionals, and mentors within the expansive tech community.
               <b> Contribute</b>: Contribute to open-source projects, showcase individual talents, and make a positive impact on campus and beyond.
               <b> Inclusive Community</b>: We believe that diversity fuels innovation. Our club welcomes students of all skill levels, backgrounds, and majors. Whether you're a seasoned developer or just starting your coding journey, there's a place for you here.

               <b> Hands-On Learning</b>: We emphasize practical, hands-on learning experiences. Our workshops and projects are designed to bridge the gap between theoretical knowledge and real-world application.

               <b> Collaboration and Networking</b>: Beyond coding, we value the power of collaboration. Our club provides opportunities to network with industry professionals, attend tech events, and connect with potential collaborators.
            </Text>
          </Card>
        </Container>

      </div>

 
    </div>
  );
}

export default Home;
