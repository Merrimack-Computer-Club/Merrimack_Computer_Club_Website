import React, { useEffect, useState } from 'react';
import { Box, Text, Avatar, Button, Grid} from '@mantine/core'; //Mantine UI
import { database } from './firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import Member from "../components/Member"
import '../css/knowledgebase.css';

function Members(props) {
  
  const [members, setMembers] = useState([]);

  useEffect(() => {
    var temp = [];

    // Get all of the users and append them to members
    try {  
    onValue(ref(database, `users`), async (snapshot) => {
        // Loop through each child and add it to temp
        snapshot.forEach(child => {
          const key = child.key;
          const display = child.display;
          if(display === undefined || display === null || display === true) { // Probable should changed this to if a display is not undefined and not null and display: true
            var childObj = child.toJSON();
            childObj['key'] = key; // Get an append the user key to the obj
            temp.push(childObj);
          }
        });
      
        setMembers(temp);
    });

    } catch (error) {
        console.log(error);
    }
  }, [props]);

  return (
    <div className="members">
      <Grid>
      {members.map(n => {
        return <Member key={n.key} id={n.key} first_name={n.firstName} last_name={n.lastName} email={n.email} description={n.user_description} avatar_img={n.avatar}/>
      })}
      </Grid>
      
    </div>
  );
}

export default Members;
