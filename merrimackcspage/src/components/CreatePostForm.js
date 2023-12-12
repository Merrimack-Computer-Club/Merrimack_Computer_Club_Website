import React, { useEffect, useState, render } from "react";
import '../css/knowledgebase.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Box, TagsInput } from '@mantine/core';

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
    });

    function getEmail() {
        return localStorage.getItem("email");
    }

    function getUserID() {
        return localStorage.getItem("userid");
    }

    function postHandler() {
        console.log(form.getTransformedValues());
    }

  return (

    <div className="create-post">

        <Text size="xl" >Create a Post</Text>
        
        <Box maw={"50%"} mx="auto">
            <form onSubmit={form.onSubmit((values) =>{
                setSubmittedValues(JSON.stringify(values))
                postHandler();
                }
            )}>

                <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} style={{margin: "5px 5px 5px 5px"}}/>

                <ReactQuill matchVisual={false} theme="snow" value={form.values.information} onChange={(val) => form.setFieldValue('information', `${val}`)} modules={{clipboard: {matchVisual: false}, toolbar: toolbarOptions}} style={{margin: "5px 5px 5px 5px"}}/> 

                <TextInput label="Resources" placeholder="Comma separated resources (URL)" {...form.getInputProps('resources')} style={{margin: "5px 5px 5px 5px"}}/>
   
                <TagsInput value={form.values.tags} onChange={(arr) => form.setFieldValue('tags', arr)} label="Tags" placeholder="Press Enter"/>

                <Group justify="center" mt="xl">
                    <Button type="submit">Submit</Button>
                </Group>
                </form>
            </Box>

    </div>
    
  );
}

export default CreatePostForm


