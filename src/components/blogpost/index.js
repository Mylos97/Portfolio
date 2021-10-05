import React from "react";
import { useState } from "react";
import "./index.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const UPDATE_BLOG_POST = gql`
  mutation UpdateBlogPost($id: ID!, $data:BlogPostInput!) {
    updateBlogPost(id: $id, data: $data) {
      _id
      title
      date
      content
    }
  }
`;


const BlogPost = ({ blogId, title, date, content, images, adminLoggedIn }) => {
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogDate, setBlogDate] = useState(date);
  const [blogContent, setBlogContent] = useState(content);
  const [editable, setEditable] = useState(false);
  const [submitEditBLogPost] = useMutation(UPDATE_BLOG_POST)

  const checkForDate = (dateString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  };

  const checkForTitle = (title) => {
    if (title.length < 6){
      console.log("Please add a longer title")
      return false
    }
    return true
  }

  const checkForContent = (content) => {
    if (content.length < 320) {
      console.log("Please add a more text")
      return false
    }
    return true
  }

  const updateBlogPost = () => {
    if(!checkForTitle(blogTitle)) return;
    if(!checkForDate(blogDate)) return;
    if(!checkForContent(blogContent)) return;
    setEditable(false)
    submitEditBLogPost({variables:{id:blogId, data:{title:blogTitle, date:blogDate, content:blogContent}}})
  }

  return (
    <div
      className="blog-post"
      style={editable ? { outline: "2px solid green" } : {}}
    >
      <h2
        contentEditable={editable}
        onBlur={(e) => setBlogTitle(e.currentTarget.textContent)}
        suppressContentEditableWarning={true}
      >
        {blogTitle}
      </h2>
      <h3
        contentEditable={editable}
        onBlur={(e) => setBlogDate(e.currentTarget.textContent)}
        suppressContentEditableWarning={true}
      >
        {blogDate}
      </h3>
      <p
        contentEditable={editable}
        onBlur={(e) => setBlogContent(e.currentTarget.textContent)}
        suppressContentEditableWarning={true}
      >
        {blogContent}
      </p>
      {adminLoggedIn && (
        <div className="edit-btns">
          <button onClick={() => setEditable(!editable)}>Edit Me!</button>
          <button onClick={() => updateBlogPost()}>Submit changes</button>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
