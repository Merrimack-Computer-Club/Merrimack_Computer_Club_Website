import React, { useEffect, useState, render } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Box, TagsInput } from '@mantine/core';
import { app, database } from '../pages/firebaseConfig';
import { getDatabase, ref, onValue, push, child, update, set} from "firebase/database";

function CreatePostForm() {

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

    const [submittedValues, setSubmittedValues] = useState('');
    const [message, setMessage] = useState('');

    const form = useForm({
        initialValues: {
            title: '',
            information: '',
            resources: '',
            tags: [],
        },

        transformValues: (values) => ({
            title: `${values.title}`,
            information: `${values.information}`,
            resources: values.resources.split(","), // Array of resources separated by ,
            tags: values.tags, // Array of tags separated by
            maintainer: getUserID(),
            maintainer_email: getEmail(),
            creationTime: Date.now(),
            updateTime: Date.now(),
        }),

        // functions will be used to validate values at corresponding key
        validate: {
            title: (value) => (value.length <= 0 ? 'Title can not be empty' : null),
            information: (value) => (value.length <= 0 ? 'Information can not be empty' : null),
            resources: (value) => (value.length > 5000 ? 'Resource length can not be above 5000 characters.' : null),
            tags: (arr) => (arr.length > 10 ? 'More than 10 tags is not allowed.' : null),
      }
    });

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

    async function postHandler() {
        setMessage('');
        
        // Check if any post currently exists with this title
        try {
            // Create the result for firebase
            var values = form.getTransformedValues();
            values.maintainer = getUserID();
            values.maintainer_email = getEmail();

            const db = database;
      
            // Construct the path
            const path = `knowledgebase/${values.title}`;

            onValue(ref(db, path), async (snapshot) => {
                if(snapshot.exists()) {
                    form.setFieldError("title", "Post with title already exists");
                } else {
                    await set(ref(db, path), values);  // Update the database
                    form.setInitialValues(form.initialValues);  // Set the form back to initial values
                    setMessage("Post has been submitted");
                    refreshPage();
                }
            });
    
          } catch (error) {
            console.log(error);
            form.setFieldError("title", "Error with submitting form, from database.")
          }
        
    }

    function refreshPage() {
        window.location.reload(false);
    }

  return (
    <div className="create-post">
        {/* Assure that the user is currently logged in */}
        {hasEmail() && hasUserID() &&
        <div className="post-closure">
             <div className="title">
                <Text size="xl" style={{borderBottom: "2px black solid"}}>Create a Post</Text>
             </div>
        
            <Box maw={"50%"} mx="auto">
                <form onSubmit={form.onSubmit((values) =>{
                    setSubmittedValues(JSON.stringify(values))
                    postHandler();
                    }
                )}>

                    <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} style={{margin: "5px 5px 5px 5px"}}/>

                    <ReactQuill matchVisual={false} theme="snow" value={form.values.information} onChange={(val) => form.setFieldValue('information', `${val}`)} modules={{clipboard: {matchVisual: false}, toolbar: toolbarOptions}} style={{margin: "5px 5px 5px 5px"}}/> 

                    <TextInput label="Resources" placeholder="Comma separated resources (URL)" {...form.getInputProps('resources')} style={{margin: "5px 5px 5px 5px"}}/>
    
                    <TagsInput value={form.values.tags} onChange={(arr) => form.setFieldValue('tags', arr)} label="Tags" placeholder="Press Enter, Only 10 tags are allowed."/>

                    <Group justify="center" mt="xl">
                        <Button type="submit">Submit</Button>
                    </Group>
                    </form>
                </Box>

                <div className="title">
                    <Text size="md" style={{margin: "25px 10px 10px 10px", color: "green", borderBottom: "1px green solid"}}>{message}</Text>
                </div>
        </div>
    }

    </div>
    
  );
}

export default CreatePostForm


