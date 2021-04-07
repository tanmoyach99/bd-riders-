import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/Home">Home</Link>
        <Link to="/destination">Destination</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
        <Link>{loggedInUser.name}</Link>
        {loggedInUser ? (
          <Link to="/login">
            <button className="sign-up">Log out</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="sign-up">Login</button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
