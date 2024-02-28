import React, { useState, useEffect } from "react";
import "./userdeatils.css";
import { Link } from "react-router-dom";

const UserDetailsComponent = () => {
  const [user, setUser] = useState({ name: "", email: "", date: "" }); // Modify based on your user structure
  const host = "http://localhost:5000";

  const getuser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await response.json();

      // Format the date and time
      const formattedDate = new Date(userData.date);
      userData.date = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

      setUser(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getuser();
  }, []); // Fetch user details when the component mounts

  return (
    <div className="container cont">
      <div className="left-info">
        <div className="info-img">
          <h2>profile Image</h2>
        </div>
        <p>
        <Link to='/'><i className="fa-solid fa-house"></i> Back to Notes</Link>
        </p>
      </div>
      <div className="right-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Account Created: {user.date}</p>
      </div>
      {/* Add additional user details as needed */}
    </div>
  );
};

export default UserDetailsComponent;
