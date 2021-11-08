import React from "react";
import { useState } from "react";
import "./index.css";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="contact">
    <h1>Contact Me!</h1>
      <form onSubmit={submitForm}>
        <input
          type={"text"}
          placeholder={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <input
          type={"text"}
          placeholder={"E-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br></br>
        <textarea
          type={"text"}
          placeholder={"Write your message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="20"
          cols="80"
          id="textarea"
        ></textarea>
        <br></br>
        <button type={'submit'}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
