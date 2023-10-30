import bankimg from "../assets/bankimg.jpg";
import React from "react";
import styles from "./stylesfolder/immagechange.module.css";

export default function Imagechange() {
  return (
    <div className={styles.imgbox}>
      <img src={bankimg}></img>
    </div>
  );
}
