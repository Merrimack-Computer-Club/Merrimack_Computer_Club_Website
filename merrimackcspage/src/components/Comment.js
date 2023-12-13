import React, { useEffect, useState } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Text, Button, TagsInput, Collapse, Flex, Blockquote } from '@mantine/core';
import { app, database } from '../pages/firebaseConfig';
import { getDatabase, ref, onValue, push, child, update, set, remove } from "firebase/database";
import { IconInfoCircle } from '@tabler/icons-react';
/**
 * 
 * @returns 
 */
function Comment({key, comment, commenter, commenter_email, createTime }) {

    const [value, setValue] = useState(comment);

    useEffect(() => {
       
    }, []);


  return (

    <div className="comment" id={key}>
        <Blockquote color="blue" cite={commenter_email} radius="xs" mt="xs" style={{padding: "2px 2px 8px 8px"}}>
            {comment}
        </Blockquote>
    </div>

  );
}

export default Comment
