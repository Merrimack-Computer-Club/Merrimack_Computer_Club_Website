import { React, useEffect, useState } from 'react'
import CreatePostForm from "../components/CreatePostForm";
import Post from "../components/Post"
import { Autocomplete } from '@mantine/core';
import { database } from './firebaseConfig';
import { ref, onValue } from "firebase/database";

function Knowledgebase(props) {

  const [search, setSearch] = useState(''); // Represents what is in the search parameter
  const [posts, setPosts] = useState([]); // represents all posts

  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
      var temp = [];
      // Get all of the titles and append them to titles
      try {  
      onValue(ref(database, `knowledgebase`), async (snapshot) => {
          snapshot.forEach(child => {
            temp.push(child.toJSON());
          });
        
          setPosts(temp);
      });

    } catch (error) {
        console.log(error);
    }
  }, [props]);

  /**
   * Called when an element is selected from the Posts search bar
   * @param {*} value 
   */
  function onSearchSubmit(value) {
     setDisplayedPosts(posts.filter(n=> n.title !== null && n.title !== undefined && n.title === value));
  }

  return (

    <div className='knowledgebase'>

      {/* Autocomplete tab for searching data */}
      <div className='search'>
        <Autocomplete label="Search" onOptionSubmit={onSearchSubmit} 
        data={posts.map(n => (n.title === null || n.title === undefined) ? null : n.title).filter((value, index, array) => array.indexOf(value) === index)} 
        value={search} onChange={setSearch} 
        comboboxProps={{ shadow: 'md', transitionProps: { transition: 'pop', duration: 200 } }}/>
      </div>

      {/* Display a list of posts from displayedPosts */}
      <div className='posts' style={{ paddingTop: '60px', height: 'fit-content' }}>
        {displayedPosts.map((n) => {     
           return (<Post key={n.title} userID={n.maintainer} userEmail={n.maintainer_email} createTime={n.creationTime} updateTime={n.updateTime} information={n.information} title={n.title} tags={n.tags} resources={n.resources} comments={n.comments} />  
           ) 
        })}
      </div>

      <CreatePostForm></CreatePostForm>

    </div>

    
  )
}

export default Knowledgebase
