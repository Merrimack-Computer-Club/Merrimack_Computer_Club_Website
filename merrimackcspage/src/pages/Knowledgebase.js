import React from 'react'
import Post from '../components/Post.js'

function Knowledgebase() {
  return (

    <div className='knowledgebase' style={{ paddingTop: '60px', height: 'fit-content' }}>
        <Post postID={null} userID={null} userEmail={"elguezabala@merrimack.edu"} createTime={null} updateTime={null} initValue={'<p># Hello *world* \n this is line two</p>'} title="Example Post" tags={null} resources={null} comments={null} />  
    </div>
  )
}

export default Knowledgebase
