import React from "react";
import { useState } from "react";
import { validateBlogPost } from "../../utils/validateblogpost";
import "./index.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const CREATE_BLOG_POST = gql`
  mutation CreateBlogPost($data: BlogPostInput!) {
    createBlogPost(data: $data) {
      _id
      title
      date
      content
      images
    }
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState(null);
  const [createBlogPost] = useMutation(CREATE_BLOG_POST);
  const [uploadedImages, setUploadedImages] = useState(false)
  const imagesNames = []

  const createPost = (e) => {
    e.preventDefault();
    if (!validateBlogPost(title, date, content) || !uploadedImages) return;
    createBlogPost({
      variables: { data: { title: title, date: date, content: content, images: imagesNames} },
    });
    setUploadedImages(false)
    imagesNames.splice(0, imagesNames.length)
  };

  const upload = (e) => {
    e.preventDefault()
    const url = 'https://secret-spire-88724.herokuapp.com/upload'

    for (let i = 0 ; i < images.length ; i++){
      let file = images[i]
      const formData = new FormData()
      formData.append('image', file)
      fetch(url, {
        method:'POST',
        body:formData,
      }).then((res) =>{
        return res.json()
      }).then((data) => {
        imagesNames.push(data.url)
      }).catch((err) => {
        console.log(err)
      })
    }

    setUploadedImages(true)
  }

  return (
    <div className="createpost">
      <form onSubmit={createPost} className={"createpost-form"}>
        <h1>Create a post</h1>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <input
          type="date"
          id="datepicker"
          placeholder={"Title"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <br></br>
        <textarea
          type="text"
          id="textarea"
          placeholder={"Content"}
          rows="20"
          cols="80"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br></br>
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          accept=".jpg, .png, .jpeg"
          multiple={true}
        ></input>
        <br></br>
        <button onClick={(e) => upload(e)}>Upload Images</button>
        <br></br>
        <button type="submit">Create Post!</button>
      </form>
    </div>
  );
};

export default CreatePost;
