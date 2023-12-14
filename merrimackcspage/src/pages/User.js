import React, { useEffect, useState } from 'react';
import { Box, Text, Avatar, Button, Chip } from '@mantine/core'; //Mantine UI
import { database } from '../pages/firebaseConfig';
import { onValue, ref, set, update} from 'firebase/database';
import Post from '../components/Post';
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Container } from '@mantine/core';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function ColoredBox({ children }) {
  const boxStyle = {
    backgroundColor: getRandomColor(),
    padding: '10px',
    marginTop: '10px',
    borderRadius: '8px',
    minWidth: '60vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return <div style={boxStyle}>{children}</div>;
}

function PostsList({ currentUser, firstName, userAvatar }) {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const postsRef = ref(database, 'knowledgebase');
        onValue(postsRef, (snapshot) => {
          const postsData = snapshot.val();
          if (postsData) {
            const postsArray = Object.keys(postsData)
              .map((key) => ({ id: key, ...postsData[key] }))
              .filter((post) => post.maintainer_email === currentUser);
            setPosts(postsArray);
          }
        });
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="posts-list">
      {firstName && (
        <Text size="lg" style={{ marginBottom: '10px' }}>
           See and edit all of your posts below
        </Text>
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <ColoredBox key={post.id}>
            <Post
              key={post.title}
              userID={post.maintainer}
              userEmail={post.maintainer_email}
              createTime={post.creationTime}
              updateTime={post.updateTime}
              information={post.information}
              title={post.title}
              tags={post.tags}
              resources={post.resources}
              in_comments={post.in_comments}
            />
          </ColoredBox>
        ))
      ) : (
        <Text>No posts found for the current user.</Text>
      )}
    </div>
  );
}

function User() {
  const user = localStorage.getItem('email');
  const [firstName, setFirstName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [display, setDisplay] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userDescription, setUserDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  function setDisplayHandler(value) {
    update(ref(database, `users/${userID}`), { display: value });
    setDisplay(value);
  }
//UseEffect uses Box and text elements from mantine
useEffect(() => {
  const fetchUserData = async () => {
    if (user) {
      const userRef = ref(database, `users/${user.split('@')[0].replace(/\./g, ',')}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setFirstName(userData.firstName || '');
          setUserAvatar(userData.avatar || '');
          setDisplay(userData.display === null || userData.display === undefined ? true : userData.display);
          setUserID(snapshot.key);
          setUserDescription(userData.user_description || '');
        }
      });
    }
  };

  fetchUserData();
}, [user]);
  /**
   * Called when the user presses the "Display Public" chip.
   * @param {*} value boolean value of true or false
   */
  function setDisplayHandler(value) {
    update(ref(database, `users/${userID}`), { display: value });
    setDisplay(value);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    setIsEditing(false);
    update(ref(database, `users/${userID}`), { user_description: userDescription });
  }

  return (
    <Container size="sm">
      <div className="user-page">
        {user && userAvatar && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-evenly', marginTop: '5rem', marginBottom: '5rem', borderRadius: '10px', backgroundColor: 'var(--mantine-color-body)', padding: '10px' }}>
            <Avatar
              src={userAvatar}
              alt="User Avatar"
              radius={50}
              style={{
                border: `8px solid ${getRandomColor()}`,
                width: '100px',
                height: 'auto',
              }}
            />
            <div style={{ marginTop: '20px', width: '100%' }}>
              <Text size="lg" align="center">
                Welcome, {firstName}!
              </Text>
              {isEditing ? (
                <ReactQuill
                  value={userDescription}
                  onChange={(value) => setUserDescription(value)}
                  placeholder="Enter your description"
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: userDescription }} />
              )}
            </div>

            {isEditing ? (
              <Button onClick={handleSaveClick} style={{ margin: '10px auto' }}>
                Save
              </Button>
            ) : (
              <Button onClick={handleEditClick} style={{ margin: '10px auto' }}>
                Edit
              </Button>
            )}

            <Chip checked={display} onChange={() => setDisplayHandler(!display)}>
              Display Public
            </Chip>
          </div>
        )}
        {user && !userAvatar && <Text>No avatar found for the user.</Text>}
        {!user && <Text>Please sign in to access this page.</Text>}

        {/* PostsList component */}
        {user && userAvatar && <PostsList currentUser={user} firstName={firstName} userAvatar={userAvatar} />}
      </div>
    </Container>
  );
}

export default User;
