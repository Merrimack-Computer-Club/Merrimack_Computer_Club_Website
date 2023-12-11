import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { app as firebaseApp } from './firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import StockVideo from "../components/StockVideo";

function Home() {

  // const dummyKnowledgeBase = [
  //   {
  //     id: 1,
  //     description: 'Description for entry 1',
  //     resource: 'https://via.placeholder.com/400x300.png'
  //   },
  //   {
  //     id: 2,
  //     description: 'Description for entry 2',
  //     resource: 'https://via.placeholder.com/400x300.png'
  //   },
  //   {
  //     id: 3,
  //     description: 'Description for entry 1',
  //     resource: 'https://via.placeholder.com/400x300.png'
  //   },
  //   {
  //     id: 4,
  //     description: 'Description for entry 2',
  //     resource: 'https://example.com/resource2',
  //   },
  //   {
  //     id: 5,
  //     description: 'Description for entry 1',
  //     resource: 'https://example.com/resource1',
  //   },
  //   {
  //     id: 6,
  //     description: 'Description for entry 2',
  //     resource: 'https://example.com/resource2',
  //   },
  // ];
  // setKnowledgeBase(dummyKnowledgeBase)

  const db = getFirestore(firebaseApp);

  const [triggerBlur, setTriggerBlur] = useState(false)
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [commentCollection, setCommentCollection] = useState([])
  const [comments, setComments] = useState({});
  const [commentFormData, setCommentFormData] = useState({
    comment: '',
  });
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    resource: '',
    subject: '',
    tags: '',
  });

  const handleEntryClick = (entryId) => {
    // Set the selected entry when clicked
    setSelectedEntry(entryId);

    // Load comments for the selected entry
    loadComments(entryId);
  };

  // Runs on initial render
  useEffect(() => {

    // Adds scroll listener to window to check when the user scrolls, and then triggers the blur on the div after the user has scrolled a bit
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const triggerPosition = 200; // Adjust this value as needed

      if (scrollY > triggerPosition) {
        setTriggerBlur(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const knowledgeBase = onSnapshot(collection(db, "sections"), async (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setKnowledgeBase(data);
      const kb = [];
      querySnapshot.forEach((doc) => {
        kb.push(doc.data());
      });
      console.log("Current values in knowledge base are: ", kb);
    });

   

    const comments = onSnapshot(collection(db, "comments"), async (querySnapshot) => {
      setCommentCollection(querySnapshot);
    });

  }, []);

  // Runs whenever the knowledge base or comments change in the db
  useEffect(() => {
    knowledgeBase.forEach(entry => loadComments(entry.id));
  }, [ knowledgeBase, commentCollection]);

  // Function that loads in comments to specific entries
  const loadComments = async (entryId) => {
    try {
        const commentCollection = collection(db, 'comments');
        const q = query(commentCollection, where('entryId', '==', entryId));
        const querySnapshot = await getDocs(q);

        const entryComments = querySnapshot.docs.map(doc => doc.data());
        setComments(prevComments => ({ ...prevComments, [entryId]: entryComments }));
      } catch (error) {
        console.error('Error loading comments:', error);
      }
  };



  const handleFormSubmit = async (e) => {
    /*
    e.preventDefault();

    const db = getFirestore(firebaseApp);
    await addDoc(collection(db, 'sections'), formData);

    setFormData({
      description: '',
      resource: '',
      subject: '',
      tags: '',
    });
    */
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  function isImageUrl(url) {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  }

  const handleCommentSubmit = async (entryId, e) => {
    e.preventDefault();

    const db = getFirestore(firebaseApp);
    const commentCollection = collection(db, 'comments');

    await addDoc(commentCollection, {
      entryId,
      comment: commentFormData.comment,
    });

    setCommentFormData({
      comment: '',
    });
  };

  const selectedEntryData = selectedEntry ? knowledgeBase.find(entry => entry.id === selectedEntry) : null;

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
              <h1 className={triggerBlur ===true ?`blur`: ''}>
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

      <Container fluid className="kb">
      <Row className="justify-content-center">
        {knowledgeBase.map((entry) => (
          <Col className='individual-kb' key={entry.id} xs={12} sm={12} md={8} lg={5} >
            <div>
              <strong>Description:</strong> {entry.description}<br />

              {/* Show resource link */}
              <strong>Resource:</strong> {isImageUrl(entry.resource) ? (
                <img src={entry.resource} alt="Resource" style={{ width: '100%', maxHeight: '500px' }} />
              ) : (
                <a href={entry.resource} target="_blank" rel="noopener noreferrer">{entry.resource}</a>
              )}
              <br />

              {/* Comments section */}
              <div>
                <strong>Comments:</strong>
                {comments[entry.id] && comments[entry.id].map((comment, index) => (
                  <li key={index}>{comment.comment}</li>
                ))}
              </div>

              {/* Comment form */}
              <form onSubmit={(e) => handleCommentSubmit(entry.id, e)}>
                <Form.Control
                  label="Comment"
                  name="comment"
                  as="textarea"
                  rows={2}
                  value={commentFormData.comment}
                  onChange={(e) => setCommentFormData({ comment: e.target.value })}
                  placeholder="Enter your comment"
                />
                <Button type="submit">Add Comment</Button>
              </form>
              <br />
            </div>
          </Col>
        ))}
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
