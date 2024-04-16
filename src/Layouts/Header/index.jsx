import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "80px", // Adjusted height
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        backgroundColor: "#343a40", // Dark background color
        color: "#fff", // Text color
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px", // Added padding
        zIndex: "999", // Added z-index
      }}
    >
      <h3 style={{ margin: "0" }}>Task Manager</h3> {/* Changed title */}
      <div>
        <Link to="/profile" style={{ marginRight: "20px", color: "#fff" }}>
          Profile {/* Added profile button */}
        </Link>
        <Link to="/" style={{ color: "#fff" }}>
          Logout {/* Added logout button */}
        </Link>
      </div>
    </div>
  );
};

export default Header;
