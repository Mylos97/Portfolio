import React from "react";
import "./index.css";
 
const BlogPost = ({ title, date, content, images }) => {
  //const [blogTitle, setBlogTitle] = useState(title);
  //const [blogDate, setBlogDate] = useState(date);
  //const [blogContent, setBlogContent] = useState(content);

  return (
    <div className='blog-post'>
        <h2>{title}</h2>
        <h3>{date}</h3>
        <p>{content}</p>
    </div>
  );
};

export default BlogPost;
