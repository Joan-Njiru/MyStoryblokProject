import React from "react";
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🧶 Cozy Crochet</div>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#gallery">Shop</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#newsletter">Contact</a></li>
      </ul>
    </nav>
  );
}
