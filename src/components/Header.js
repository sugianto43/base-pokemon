import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header" style={{ position: "fixed" }}>
      <Link to="/" style={{textDecoration: "none"}}>
          
        <h2 className="logo">POKE-APP</h2>
      </Link>
    </div>
  );
}

export default Header;
