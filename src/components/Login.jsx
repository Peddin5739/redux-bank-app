import React, { useState } from "react";
import styles from "./stylesfolder/Login.module.css";
import { useSelector,useDispatch } from "react-redux";
import { loginRequest,clickSignin } from "../actions/loginActions";
export default function Login() {
  const authenticateuser=useSelector(state=>state.auth)
  const dispatch=useDispatch();
  
  let userName;
  let password;
  const HandelClick = () => {
    dispatch(loginRequest(userName,password));
  };
  

  

  return (

    <div className={styles.LoginContainer}>
      <h2>Welcome back</h2>
     
        <div className={styles.inputelement}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => userName=e.target.value}
          />
        </div>
        <div className={styles.inputelement}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => password=e.target.value}
          />
        </div>
        <button type="submit" onClick={HandelClick }>Login</button>
        <div className={styles.anchor}>
          <a src="#">Forgot username/password? </a> <br></br>
          <a src="#"> Not enrolled? Sign up now.</a>
        </div>
     
    </div>
  );
}
