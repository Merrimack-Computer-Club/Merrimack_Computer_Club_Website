import React, { useEffect, useState } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Text, Button, TagsInput, Collapse, Flex, Blockquote } from '@mantine/core';
import { app, database } from '../pages/firebaseConfig';
import { getDatabase, ref, onValue, push, child, update, get, set, remove} from "firebase/database";
import { IconX } from '@tabler/icons-react';
/**
 * 
 * @returns 
 */
function Comment({key, comment_id, comment, commenter, commenter_email, createTime, removeComment }) {

    const [value, setValue] = useState(comment);

    useEffect(() => {
    }, []);

    const date_options = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const X_icon = <IconX size={20} strokeWidth={2} color={'red'} onClick={() => removeComment(comment_id)}/>;


    function isUsersComment() {
        // Determines if the user logged in maintains this comment
        if(localStorage.getItem("userid") === null || localStorage.getItem("userid") === undefined) return false;

        return localStorage.getItem("userid") == commenter;
    }

  return (

    <div className="comment" id={key}>
        {/* Assure the comment is not deleted */}
        <Blockquote icon={isUsersComment() ? X_icon : null} iconSize={15} color="blue" cite={`${commenter_email}  -  ${new Date(createTime).toLocaleString("en", date_options)}`} radius="xs" mt="xs" style={{padding: "2px 2px 8px 8px"}}>
            {value}
        </Blockquote>
    </div>

  );
}

export default Comment
