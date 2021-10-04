import React from "react";
import { useState } from "react";
import "./index.css";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault()
    checkLogin()
    setUsername("")
    setPassword("")
  };

  const checkLogin = () => {
    if (username === process.env.REACT_APP_ADMIN_USERNAME){
      if(password === process.env.REACT_APP_ADMIN_PASSWORD){
        console.log("hello")
        setLoggedIn(true)
      }
    }
  }



  return (
    <div className="login">
    {!loggedIn &&
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
    }
    </div>

  );
};

export default LoginPage;
