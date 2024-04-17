import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px", // Adjusted height
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#6453de",
        color: "#fff", // Text color
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999", // Added z-index
      }}
    >
      © 2024 Task Manager {/* Updated content */}
    </div>
  );
};

export default Footer;
