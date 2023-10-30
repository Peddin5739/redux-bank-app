import React from "react";
import styles from "./stylesfolder/dashboard.module.css";
import leafImg from "../assets/leafimg.png";
import Imagechange from "./imagechange";
import Login from "./Login";

export default function Dashboard() {
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

      <content className={styles["content"]}>
        <div className={styles["image"]}>
          <Imagechange />
        </div>
        <div className={styles["login"]}>
          <Login />
        </div>
      </content>
    </div>
  );
}
