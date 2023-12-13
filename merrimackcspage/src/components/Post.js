import React, { useEffect, useState, useReducer } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Text, Button, TagsInput, Collapse, TextInput, Divider } from '@mantine/core';
import { app, database } from '../pages/firebaseConfig';
import { getDatabase, ref, onValue, push, child, update, get, set, remove} from "firebase/database";
import Comment from "./Comment";

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
function Post({ userID, userEmail, createTime, updateTime, information, title, tags, resources, in_comments }) {

    const [value, setValue] = useState(information);
    const [editing, setEditing] = useState(false);
    const [resourcesOpened, setResources] = useState(false);
    const [resourceText, setResourceText] = useState("");
    const [comment, setComment] = useState('');;
    const [comments, setComments] = useState(in_comments);
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {

       // Determine if we have resources
       var worked = resources !== null && resources !== undefined;
       var temp = "";
       // If worked, set variable resourcesText
       if(worked) {
           for(var key in resources) {
               temp += resources[key];
               temp += "\n"
           }
           setResourceText(temp);
       }
    }, [resourceText]);

    // Called when the save button is clicked, this then updates realtime-database
    function saveClicked() {

        // Update the reference in the database
        update(ref(database, `knowledgebase/${title}`), {information: value, updateTime: Date.now()});

        setEditing(false);
    }

    // Called when the delete button is pressed on a post
    function deleteClicked() {

        remove(ref(database, `knowledgebase/${title}`)).then(() => {
            setEditing(false);
            refreshPage();
        });
    }

    function refreshPage() {
        window.location.reload(false);
    }

    // Function returns if the user is editing the post (react-quill rendered)
    function isEditing() {
        return editing;
    }

    function getEmail() {
        return localStorage.getItem("email");
    }

    function getUserID() {
        return localStorage.getItem("userid");
    }

    function hasEmail() {
        return getEmail() != null && getEmail() != undefined;
    }

    function hasUserID() {
        return getUserID() != null && getUserID() != undefined;
    }

    /**
     * Called when this comment is submitted, update this ref in firebase
     */
    function submitComment() {
        // Assure a comment exists.
        if(comment === null || comment === undefined || comment.trim().length == 0) {
            return;
        }

        try {
            const db = database;
            
            // Get the comments array
            var temp = (comments !== undefined && comments !== null) ? comments : {};
            
            // Construct the comment
            const commentTemp = {
                commenter: getUserID(),
                commenter_email: getEmail(),
                comment: comment,
                creationTime: Date.now()
            }

            temp[Object.keys(temp).length == 0 ? 0 : (Object.keys(temp).length)] = commentTemp;
            update(ref(database, `knowledgebase/${title}`), {in_comments: temp});

            setComments(temp);
            setComment('');

        } catch(error) {
            console.log(error);
        }
    }


    // Function determines if the user can edit the post
    function canEdit() {
        //console.log(value);
        if(localStorage.getItem("email") != undefined && 
        localStorage.getItem("email") != null && 
        userEmail == localStorage.getItem("email")) {
            return true;
        }
        return false;
    }

    /**
     * Removes this comment from the post
     */
    function removeComment(idx) {
        remove(ref(database, `knowledgebase/${title}/in_comments/${idx}`)).then(() => {
            console.log(`Comment ${idx} removed`);

            // Remove the item from the parents comments state.
            setComments(current => {
                delete current[idx];
                return current;
            });

            // Force a render of this Post
            forceUpdate();


        });
        
    }

    function hasResources() {
        // Determine if we have resources
        return resources !== null && resources !== undefined;
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

  return (

    <div className="post" id={title}>
        
        <div className="title">
            <Text size="xl" style={{borderBottom: "2px black solid"}}>{title}</Text>
        </div>

        <div className="post-data">
        {/* Represents when a user can edit their post */}
        {canEdit() && isEditing() &&
            <div className="editing">
                <ReactQuill matchVisual={false} theme="snow" value={value} onChange={setValue} modules={{clipboard: {matchVisual: false}, toolbar: toolbarOptions}}/> 
                <Button style={{margin: "5px 5px 5px 5px"}} onClick={saveClicked} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 0 }} size="sm">Save</Button>
                <Button style={{alignContent: "center", margin: "5px 5px 5px 20px"}} onClick={deleteClicked} variant="gradient" gradient={{ from: 'red', to: 'gray', deg: 0 }} size="sm">Delete</Button>
            </div>
        }

        {/* Represents the displaying of a post */}
        {!isEditing() &&
            <div className="content">
                {/* Information */}
                <ReactQuill value={value} readOnly={true} theme={"bubble"}/>    
                {/*Tags*/}
                <TagsInput label="Tags" placeholder="" readOnly defaultValue={() => {
                    if(tags == undefined || tags == null) 
                        return [];

                    var ret = [];
                    for(var key in tags) {
                        ret.push(tags[key]);
                    }
                    return ret;
                }}/>  
                {/*Resources*/}
                {hasResources() &&
                <div className='resources'>
                    <Button onClick={() => {setResources(!resourcesOpened)}}>Resources</Button>
                    <Collapse in={resourcesOpened} transitionDuration={500} transitionTimingFunction="linear">
                        <Text style={{margin: "10px 10px 10px 10px"}}>{resourceText}</Text>
                    </Collapse>
                </div>   
                }

            {/* If not currently editing, but able to edit. Add the Edit button */}
            {canEdit() &&
                <div className="edit-options">
                    <Divider my="md" /> {/* Divider for comment section */}
                    <div style={{display: "flex", justifyContent: "center", alignContent: "center", margin: "5px 5px 5px 5px"}} >
                        <Button onClick={editClicked} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 0 }} size="sm">Edit</Button>
                    </div>
                </div>   
            }

            {/* Display comments if logged in*/}
            {hasEmail() && hasUserID() &&
                <div className="comments">
                    <Divider my="md" /> {/* Divider for comment section */}
                    <div className="commentsInput">
                        <TextInput label="Create comment" value={comment} onChange={(event) => setComment(event.currentTarget.value)} style={{marginRight: "10px", minWidth: "75%"}}/>
                        <Button onClick={submitComment} variant="gradient" gradient={{ from: 'blue', to: 'green', deg: 0 }} size="sm" style={{marginRight: "10px"}}>Submit</Button>
                    </div>

                    <div className="comment-list">
                        {/* Loop over each comment, and create a new comment component for it */}
                        {comments !== null && comments !== undefined && Object.keys(comments).map(n => {
                            return <Comment key={n} comment_id={n} comment={comments[n].comment} commenter={comments[n].commenter} commenter_email={comments[n].commenter_email} createTime={comments[n].creationTime} removeComment={removeComment}></Comment>
                        })}
                    </div>
                </div>
            }
            </div>
        }


        </div>
    </div>

  );
}

export default Post
