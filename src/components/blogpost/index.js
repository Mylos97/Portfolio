import React from "react";
import { useState } from "react";
import "./index.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { validateBlogPost } from "../../utils/validateblogpost";


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

  const updateBlogPost = () => {
    if (!validateBlogPost(blogTitle, blogDate, blogContent)) return;
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
