import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap"; // Updated import statements
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app as firebaseApp } from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import StockVideo from "../components/StockVideo";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formData, setFormData] = useState({
    description: '',
    resource: '',
    subject: '',
    tags: '',
  });
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  // On initial render, this useEffect runs and gets the scroll position. Once the user scrolls, the blurring in the blur div will activate
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const knowledgeBaseCollection = collection(db, 'sections');
      const snapshot = await getDocs(knowledgeBaseCollection);

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setKnowledgeBase(data);
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore(firebaseApp);

    // Add a new document with the form data to the "sections" collection
    await addDoc(collection(db, 'sections'), formData);

    // Reset the form data
    setFormData({
      description: '',
      resource: '',
      subject: '',
      tags: '',
    });
  };
  function isImageUrl(url) {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "transparent",
          height: "55rem",
        }}
      >
        <Container fluid>
          <Row>
            <Col>
            <div style={{margin: `3rem 10px 10px 10px`, backgroundColor: `rgb(255 255 255 / 15%)`, paddingLeft: "30px", paddingRight: "30px", borderRadius: `10px`, inlineSize: `min-content`}}>
              <h1 style={{}} className="title animate-charcter">
                Merrimack Computer Club
              </h1>
            </div>
            </Col>
          </Row>
        </Container>

        <StockVideo></StockVideo>
        
      </div>

      <Container className= "fluid">
        <Row>
          <Col>
          <ol>
  {knowledgeBase.map((entry) => (
    <li key={entry.id}>
      <strong>Description:</strong> {entry.description}<br />
      {isImageUrl(entry.resource) ? (
        <img src={entry.resource} alt="Resource" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      ) : (
        <a href={entry.resource} target="_blank" rel="noopener noreferrer">{entry.resource}</a>
      )}
      <br />
      {isImageUrl(entry.resource) && (
        <React.Fragment>
          <strong>Resource Link:</strong> <a href={entry.resource} target="_blank" rel="noopener noreferrer">{entry.resource}</a><br />
        </React.Fragment>
      )}
      <strong>Subject:</strong> {entry.subject}<br />
      <strong>Tags:</strong> {entry.tags}<br />
      <br />
    </li>
  ))}
</ol>

          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Container className="blurdiv">
              <form onSubmit={handleFormSubmit}>
                <Form.Control
                  label="Description"
                  name="description"
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                />
                <Form.Control
                  label="Resource Link"
                  name="resource"
                  type="text"
                  value={formData.resource}
                  onChange={handleInputChange}
                  placeholder="Enter Resource Link"
                />
                <Form.Control
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter Subject"
                />
                <Form.Control
                  label="Tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter Tags"
                />
                <Button type="submit">Add to Knowledgebase</Button>
              </form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
