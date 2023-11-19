import React, { useEffect } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import styles from "./stylesfolder/dashboard.module.css";
import Business from "./Business";
import Personal from "./Personal";
import MeetingSchedule from "./MeetingSchedule";
import CustomerService from "./CustomerService";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";

import { useSelector } from "react-redux";

export default function Dashboard() {
  // Redux state and other logic
  const checkUser = useSelector((state) => state.auth);
  const getUser = checkUser.user;
  console.log("CHECK USER FROM DASHBOARD", checkUser);

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = getUser;

    if (!isAuthenticated) {
      // Redirect to the specified path if the user is not authenticated
      return <Navigate to="/login" replace />;
    }

    // Render children if the user is authenticated
    return children;
  };

  return (
    <div className={styles["dashboardContainer"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["leftNavbar"]}>
          <Link to="/home">Home</Link>
          <Link to="/personal">Personal</Link>
          <Link to="/business">Business</Link>
        </div>
        <div className={styles["rightNavbar"]}>
          <Link to="/schedule-meeting">Schedule a Meeting</Link>
          <Link to="/customer-service">Customer Service</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      <div className={styles.logo}>
        <p></p> {/* Assuming your logo or branding goes here */}
      </div>

      {/* Content Area for Routing */}
      <div className={styles["content"]}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <Personal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/business"
            element={
              <ProtectedRoute>
                <Business />
              </ProtectedRoute>
            }
          />
          <Route path="/schedule-meeting" element={<MeetingSchedule />} />
          <Route path="/customer-service" element={<CustomerService />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </div>
  );
}
