import React from "react";
import { useState, useEffect } from "react";
import postRequest from "./PostRequest";
// import { useNavigate } from "react-router-dom";
export default function Register() {
  //   const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [validatePassword, setValidatePassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword === password) {
      console.log(username);
      console.log(password);

      const userObj = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      console.log("userObj: ", userObj);
      const url = `http://localhost:8080/register`;
      const response = await postRequest(userObj, url);
      console.log("response.res: ", response.res);

      console.log("response: ", response);
      if (response.status === 400) {
        var text = response.res.text;
        console.log("text: ", text);
        setError(text);
        setEmail("");
        setName("");
        setPhone("");
        setUsername("");
        setPassword("");
        setValidatePassword("");
      } else {
        //navigate to home;
        localStorage.setItem("currentUser", JSON.stringify(response.res));
        setError(`hello ${username}`);
      }
    } else {
      setError("password verification failed, please try again");
      setEmail("");
      setName("");
      setPhone("");
      setUsername("");
      setPassword("");
      setValidatePassword("");
    }
  };

  return (
    <>
      {
        /////////////change!!!!!!
        error && alert(error)
      }
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Enter username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Enter password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Verify your password:
          <input
            type="password"
            name="verifyPassword"
            onChange={(e) => setValidatePassword(e.target.value)}
            value={validatePassword}
          />
        </label>
        <br />
        <label>
          Enter your email:
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Enter your phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
