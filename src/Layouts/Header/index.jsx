import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Import the external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header-container">
      <h3 style={{textAlign:"center"}}>Task Manager</h3>
      <div className={`links-container ${showMenu ? 'show-menu' : ''}`}>
        <Link to="/add">Add Task</Link>
        <Link to="/tasks">All Tasks</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Logout</Link>
      </div>
      <div className={`menu-icon ${showMenu ? 'show' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default Header;
