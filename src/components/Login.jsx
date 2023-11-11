import React, { useState } from "react";
import styles from "./stylesfolder/Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest } from "../actions/loginActions";
export default function Login() {
  const authenticateuser = useSelector((state) => state.auth);
  console.log("Login state Befor-logged in ", authenticateuser);
  const dispatch = useDispatch();

  let id;
  let password;
  // ---------------------------- Check the user ---------------------------------------
  const HandelClick = async () => {
    const data = { id, password };
    try {
      const response = await fetch(
        "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/logincheck",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log("data from backend", responseData);

      if (responseData.Login) {
        dispatch(loginRequest(id, responseData.Login));
        console.log("state AFTER logged in ", authenticateuser);
        // Note: The state update (authenticateuser) may not be immediately reflected here due to React's asynchronous state updates
      }
    } catch (error) {
      console.log("error from logincheck", error);
    }
  };

  // ---------------------------------   end-Check-uSER ---------------------------------------

  return (
    <div className={styles.LoginContainer}>
      <h2>Welcome back</h2>

      <div className={styles.inputelement}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={id}
          onChange={(e) => (id = e.target.value)}
        />
      </div>
      <div className={styles.inputelement}>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => (password = e.target.value)}
        />
      </div>
      <button type="submit" onClick={HandelClick}>
        Login
      </button>
      <div className={styles.anchor}>
        <a src="#">Forgot username/password? </a> <br></br>
        <a src="#"> Not enrolled? Sign up now.</a>
      </div>
    </div>
  );
}
