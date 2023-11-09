import React from "react";
import styles from "./stylesfolder/dashboard.module.css";
import leafImg from "../assets/leafimg.png";
import Imagechange from "./imagechange";
import Login from "./Login";
import CallHandler from "./callHandler";

import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard() {
  // using the login reducer getting the user
  const checkUser = useSelector((state) => state.auth);
  // fetching the user  from the authReducer state
  const getUser = checkUser.user;
  console.log("from dashboard printing user", getUser);
  return (
    <div className={styles["dashboardContainer"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["leftNavbar"]}>
          <a href="#" onClick={CallHandler("home")}>
            Home
          </a>
          <a href="#">Personal</a>
          <a href="#">Business</a>
        </div>
        <div className={styles["rightNavbar"]}>
          <a href="#">Schedule a Meeting</a>
          <a href="#">Customer Service</a>
        </div>
      </nav>
      <div className={styles.logo}>
        <p></p>
      </div>
      {/* -------------- content part  ------------ */}
      <div className={styles["content"]}>
        <div className={`${styles["image"]} ${styles.imageChangeWrapper}`}>
          {/* <Imagechange /> */}
        </div>
        <div className={styles["login"]}>
          <Login />
        </div>
      </div>
      {/* --------------------------------------------------------------------- */}

      {/* -------------------- set the content to sign up when auth object is  true ------------------------*/}

      {/* ------------------------------------------------------------------------- */}
    </div>
  );
}
