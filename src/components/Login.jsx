import React, { useState } from "react";
import styles from "./stylesfolder/Login.module.css";
import { useSelector,useDispatch } from "react-redux";
import { loginRequest,loginSuccess, loginFailure } from "../actions/loginActions";
export default function Login() {
  const authenticateuser=useSelector(state=>state.auth)
  console.log(authenticateuser)
  
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const handelClick = () => {
    console.log(userName);
    console.log(password);
  };
  return (
    <div className={styles.LoginContainer}>
      <h2>Welcome back</h2>
      <form onSubmit={handelClick}>
        <div className={styles.inputelement}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
        </div>
        <div className={styles.inputelement}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className={styles.anchor}>
          <a src="#">Forgot username/password? </a> <br></br>
          <a src="#"> Not enrolled? Sign up now.</a>
        </div>
      </form>
    </div>
  );
}
