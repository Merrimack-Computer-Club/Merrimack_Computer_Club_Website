import React, { useEffect, useState, render } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Markdown from 'react-markdown';
import { Button, Text } from '@mantine/core';

/**
 * @param {*} postID Represents the UUID for this post
 * @param {*} userID Represents the UUID for the user from the database
 * @param {*} userEmail Represents the email for the poster 
 * @param {*} createTime Epoch time when the post was created
 * @param {*} updateTime Epoch time for when the post was last edited
 * @param {*} initValue Post information as a string
 * @param {*} title title of the post
 * @param {*} tags List of strings that represent the tags 
 * @param {*} resources List of resources (attachments as URL's)
 * @param {*} comments List of comments
 * 
 * @returns 
 */
function Post({postID, userID, userEmail, createTime, updateTime, initValue, title, tags, resources, comments }) {

    const [value, setValue] = useState(initValue);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
       
    }, []);

    // Called when the save button is clicked, this then updates realtime-database
    function saveClicked() {
        setEditing(false);
    }

    // Called when the delete button is pressed on a post
    function deleteClicked() {

    }

    // Function returns if the user is editing the post (react-quill rendered)
    function isEditing() {
        return editing;
    }

    // Function determines if the user can edit the post
    function canEdit() {
        console.log(value);
        if(localStorage.getItem("email") != undefined && 
        localStorage.getItem("email") != null && 
        userEmail == localStorage.getItem("email")) {
            return true;
        }
        return false;
    }

    function editClicked() {
        setEditing(true);
    }

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    function htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

  return (

    <div className="post" id={postID}>
        
        <div className="title">
            <Text size="xl" style={{borderBottom: "2px black solid"}}>{title}</Text>
        </div>

        <div className="post-data">
        {/* Represents when a user can edit their post */}
        {canEdit() && isEditing() &&
            <div className="editing">
                <ReactQuill matchVisual={false} theme="snow" value={value} onChange={setValue} modules={{clipboard: {matchVisual: false}, toolbar: toolbarOptions}}/> 
                <Button style={{margin: "5px 5px 5px 5px"}} onClick={saveClicked} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 0 }} size="sm">Save</Button>
            </div>
        }

        {/* Represents the displaying of a post */}
        {!isEditing() &&
            <ReactQuill value={value} readOnly={true} theme={"bubble"}/>      
        }

        {/* If not currently editing, but able to edit. Add the Edit button */}
        {!isEditing() && canEdit() &&
            <div>
                <Button style={{alignContent: "center", margin: "5px 5px 5px 5px"}} onClick={editClicked} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 0 }} size="sm">Edit</Button>
                <Button style={{alignContent: "center", margin: "5px 5px 5px 5px"}} onClick={deleteClicked} variant="gradient" gradient={{ from: 'red', to: 'gray', deg: 0 }} size="sm">Delete</Button>
            </div>
        }
        </div>
    </div>

  );
}

export default Post
