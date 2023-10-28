import React from "react";
import styles from "./stylesfolder/dashboard.module.css";

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

      <content className={styles["content"]}>
        <div className="immage"></div>
        <div className="login"></div>
      </content>
    </div>
  );
}
