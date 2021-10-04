import React from "react";
import { useState } from "react";
import "./index.css";
 
const BlogPost = ({ title, date, content, images }) => {
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogDate, setBlogDate] = useState(date);
  const [blogContent, setBlogContent] = useState(content);

  return (
    <div className='blog-post'>
        <h2>{blogTitle}</h2>
        <h3>{blogDate}</h3>
        <p>{blogContent}</p>
    </div>
  );
};

export default BlogPost;
