import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/Home.module.css";
export default function Home() {
  const userDetails = useSelector((state) => state.auth);
  const username = userDetails.user.Username;

  return (
    <div>
      <div className={styles["greeting"]}>
        <h2> Welcome Back, {username} </h2>

        <p>
          Your financial well-being is our top priority. We're here to assist
          you in managing your finances effortlessly and securely. Explore your
          accounts, track your spending, and discover our latest features
          designed to put you in control of your financial journey. Remember,
          our team is just a click away if you need any assistance. Stay safe
          and secure with NKP-BANK.
        </p>
      </div>
    </div>
  );
}
