import React from "react";
import { useState } from "react";
import "./index.css";
import BlogPost from "../blogpost";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { CreatePost } from "..";
const ITEMS_QUERY = gql`
  {
    allBlogPosts {
      data {
        _id
        title
        date
        content
        images
      }
    }
  }
`;

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(true)

  let { data } = useQuery(ITEMS_QUERY);
  var queryBlogPosts = data ? data.allBlogPosts : null;
  const blogPosts = queryBlogPosts
    ? queryBlogPosts.data.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    : null;

  const submitForm = (e) => {
    e.preventDefault();
    checkLogin();
    setUsername("");
    setPassword("");
  };

  const checkLogin = () => {
    if (username === process.env.REACT_APP_ADMIN_USERNAME) {
      if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
        setLoggedIn(true);
      }
    }
  };

  return (
    <div className="login">
      {!loggedIn ? (
        <form onSubmit={() => submitForm()} className="login-form">
          <h1>Admin Login</h1>
          <input
            type="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <button type="submit" onClick={(e) => submitForm(e)}>
            Login
          </button>
        </form>
      ) : [
        (showCreatePost ? (
          <div key='0' className='login-form'>
            <button onClick={() => setShowCreatePost(!showCreatePost)}>Show Blogposts</button>
            <CreatePost/>
          </div>
        ) : (
        <div className="login-form" key='1'>
          <button onClick={() => setShowCreatePost(!showCreatePost)}>Createpost</button>
          {blogPosts && 
          blogPosts.map((b) => {
            return <BlogPost key={b._id} title={b.title} date={b.date} content={b.content} adminLoggedIn={loggedIn} blogId={b._id} imgs={b.images}/>
          })
          }

        </div>
        )
        )]
      }
    </div>
  );
};

export default LoginPage;
