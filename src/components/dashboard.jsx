import React from "react";
import styles from "./stylesfolder/dashboard.module.css";
import leafImg from "../assets/leafimg.png";
import Imagechange from "./imagechange";
import Login from "./Login";
import SignupForm from "./signup";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard() {
  const checkSigninClick=useSelector(state=>state.auth)
 
  const signin=checkSigninClick.signin;
  console.log(signin);
  return (
    <div className={styles["dashboardContainer"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["leftNavbar"]}>
          <a href="#">Home</a>
          <a href="#">Personal</a>
          <a href="#">Business</a>
        </div>
        <div className={styles["rightNavbar"]}>
          <a href="#">Schedule a Meeting</a>
          <a href="#">Customer Service</a>
        </div>
      </nav>
      <div className={styles.logo}>
        <h4>FINANCE WITH </h4>
        <img src={leafImg} alt="Leaf Logo" />
      </div>
      { /* content part */ }

      { !signin && (<div className={styles["content"]}>
        <div className={styles["image"]}>
          <Imagechange />
        </div>
        <div className={styles["login"]}>
          <Login />
        </div>
       
      </div>) }

      { signin && <SignupForm />}
    </div>
  );
}
