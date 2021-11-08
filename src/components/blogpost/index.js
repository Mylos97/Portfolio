import React from "react";
import { useState } from "react";
import "./index.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { validateBlogPost } from "../../utils/validateblogpost";

const UPDATE_BLOG_POST = gql`
  mutation UpdateBlogPost($id: ID!, $data: BlogPostInput!) {
    updateBlogPost(id: $id, data: $data) {
      _id
      title
      date
      content
      images
    }
  }
`;

const BlogPost = ({ blogId, title, date, content, imgs, adminLoggedIn }) => {
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogDate, setBlogDate] = useState(date);
  const [blogContent, setBlogContent] = useState(content);
  const [images, setImages] = useState(imgs);
  const [editable, setEditable] = useState(false);
  const [files, setFiles] = useState();
  const [submitEditBLogPost] = useMutation(UPDATE_BLOG_POST);

  const updateBlogPost = () => {
    if (!validateBlogPost(blogTitle, blogDate, blogContent)) return;
    setEditable(false);
    let deleteImg = deleteImages();
    submitEditBLogPost({
      variables: {
        id: blogId,
        data: {
          title: blogTitle,
          date: blogDate,
          content: blogContent,
          images: images,
        },
      },
    });
  };

  async function deleteImages() {
    const url = "http://localhost:5000/delete";
    let promise = new Promise((resolve, reject) => {
      for (let i = 0; i < images.length; i++) {
        let tmpImage = images[i];
        const formData = new FormData();
        formData.append("image", tmpImage);
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            console.log(res);
          })
          .then(() => {
            if (i === images.length - 1) resolve("Removed the correct images");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return promise;
  }

  async function changeUploaded(e) {
    e.preventDefault();
    let imagesNames = [];
    const url = "https://secret-spire-88724.herokuapp.com/upload";
    if (!files) return;
    let promise = new Promise((resolve, reject) => {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const formData = new FormData();
        formData.append("image", file);
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            imagesNames.push(data.url);
            if (i === files.length - 1) resolve("done");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    promise.then(() => window.alert("Finished uploading"));
    setImages(imagesNames);
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
      {images && (
        <ul className="images">
          {images.map((url, index) => {
            return (
              <li key={index}>
                <img src={url} alt="Cannot load"></img>
              </li>
            );
          })}
        </ul>
      )}
      {adminLoggedIn && (
        <div className="edit-btns">
          <button onClick={() => setEditable(!editable)}>Edit Me!</button>
          {editable && (
            <>
              <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                accept=".jpg, .png, .jpeg"
                multiple={true}
              ></input>
              <button onClick={(e) => changeUploaded(e)}>Upload Images</button>
            </>
          )}
          <button onClick={() => updateBlogPost()}>Submit changes</button>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
