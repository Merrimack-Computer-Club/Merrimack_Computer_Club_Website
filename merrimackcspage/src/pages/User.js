import React, { useEffect, useState } from 'react';
import { Box, Text } from '@mantine/core';
import { database } from '../pages/firebaseConfig';
import { onValue, ref } from 'firebase/database';
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
    backgroundColor: "rgba(255, 255, 255, 0.795)",
    padding: '10px',
    margin: '10px',
    borderRadius: '8px',
  };

  return <div style={boxStyle}>{children}</div>;
}

function PostsList({ currentUser, firstName }) {
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
          Welcome, {firstName}! 
          See and edit all of your posts below
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
              comments={post.comments}
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = ref(database, `users/${user.split('@')[0].replace(/\./g, ',')}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setFirstName(userData.firstName || ''); // Assuming first name is stored in the 'firstName' field
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
        {user ? (
          <PostsList currentUser={user} firstName={firstName} />
        ) : (
          <Text>Please sign in to access this page.</Text>
        )}
      </Box>
    </div>
  );
}

export default User;
