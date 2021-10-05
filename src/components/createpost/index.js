import React from "react";
import { useState } from "react";
import { validateBlogPost } from "../../utils/validateblogpost";
import './index.css'
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const CREATE_BLOG_POST = gql`
  mutation CreateBlogPost($data:BlogPostInput!) {
    createBlogPost(data: $data) {
      _id
      title
      date
      content
    }
  }
`;


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [createBlogPost] = useMutation(CREATE_BLOG_POST)

  const createPost = (e) => {
    e.preventDefault()
    if(!validateBlogPost(title,date,content)) return;
    createBlogPost({variables:{data:{title:title, date:date, content:content}}})
  }

  return (
    <div className="createpost">
      <form onSubmit={createPost} className={'createpost-form'}>
        <h1>Create a post</h1>
        <input type='text' placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <br></br>
        <input type='date' id='datepicker' placeholder={'Title'} value={date} onChange={(e) => setDate(e.target.value)}></input>
        <br></br>
        <textarea type='text' id='textarea' placeholder={'Content'} rows='20' cols='80' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <br></br>
        <button type='submit'>Create Post!</button>
      </form>
    </div>
  )
  ;
};

export default CreatePost;
