import React, { useEffect, useState } from 'react';
import { Box, Text, Avatar, Button } from '@mantine/core';
import { database } from '../pages/firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import Post from '../components/Post';
import '../css/knowledgebase.css';

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
    backgroundColor: 'rgba(255, 255, 255, 0.795)',
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
          Welcome, {firstName}! See and edit all of your posts below
        </Text>
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <ColoredBox key={post.id}>
            <Post
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = ref(database, `users/${user.split('@')[0].replace(/\./g, ',')}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setFirstName(userData.firstName || '');
            setUserAvatar(userData.avatar || '');
          }
        });
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="user-page">
      <div className="title">
        <Text size="xl" style={{ borderBottom: '2px black solid' }}>
          User Page
        </Text>
      </div>

      <Box maw={'50%'} mx="auto">
        {user && userAvatar && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
            <div style={{ marginLeft: '20px' }}>
              <Text size="lg">Welcome, {firstName}!</Text>
              <Text>No description available</Text>
            </div>
          </div>
        )}
        {user && !userAvatar && <Text>No avatar found for the user.</Text>}
        {!user && <Text>Please sign in to access this page.</Text>}

        {/* PostsList component */}
        {user && userAvatar && <PostsList currentUser={user} firstName={firstName} userAvatar={userAvatar} />}
      </Box>
    </div>
  );
}

export default User;
