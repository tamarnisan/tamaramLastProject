import React from "react";
import { useState, useEffect } from "react";
import postRequest from "./PostRequest";
// import { useNavigate } from "react-router-dom";
export default function LogIn() {
//   const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
   const [password, setPassword] = useState("");
  
   const handleSubmit =async (e) => {
    console.log(username);
    console.log(password)
        e.preventDefault();
      const userObj={
        username:username,
          password:password
          
        }
        console.log('userObj: ', userObj);
      const url= `http://localhost:8080/logIn`
      const response= await postRequest(userObj, url);
      console.log('response.res: ', response.res);
      
      console.log('response: ', response);
      if(response.status===401){
        var text=response.res.text;
        console.log('text: ', text);
        setError(text)
      }
      else{
        //navigate to home;
        localStorage.setItem("currentUser", JSON.stringify(response.res))
        setError(`hello ${response.res.username}`)

      }
      
    
      }

  
  return (
    <>{/////////////change!!!!!!
        error&&<h1>{error}</h1>
    }
      <form onSubmit={handleSubmit}>
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
        <br/>
        <input type="submit" />
      </form>
    </>
  );
}