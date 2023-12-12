import { React, useEffect, useState } from 'react'
import CreatePostForm from "../components/CreatePostForm";
import Post from "../components/Post"
import { Autocomplete } from '@mantine/core';
import { app, database } from './firebaseConfig';
import { getDatabase, ref, onValue, push, child, update, set} from "firebase/database";

function Knowledgebase() {

  const [search, setSearch] = useState('');

  var titles = [];

  useEffect(() => {
      titles = [];
       // Get all of the titles and append them to titles
       try {
        const db = database;
  
        // Construct the path
        const path = `knowledgebase`;

        onValue(ref(db, path), async (snapshot) => {
            snapshot.forEach(child => {
              titles.push(child.key);
            });
        });

      } catch (error) {
          console.log(error);
      }
  });

  return (

    <div className='knowledgebase'>

      {/* Autocomplete tab for searching data */}
      <div className='search'>
        <Autocomplete label="Search" data={titles} value={search} onChange={setSearch} />
      </div>

      <div className='posts' style={{ paddingTop: '60px', height: 'fit-content' }}>
          <Post postID={null} userID={null} userEmail={"elguezabala@merrimack.edu"} createTime={null} updateTime={null} initValue={'<p># Hello *world* \n this is line two</p>'} title="Example Post" tags={null} resources={null} comments={null} />  
      </div>

      <CreatePostForm></CreatePostForm>

    </div>

    
  )
}

export default Knowledgebase
