'use client'
import React, { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">🧶 Cozy Crochet</div>

  
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#hero">Home</a></li>
        <li><a href="#gallery">Shop</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#newsletter">Contact</a></li>
      </ul>
    </nav>
  );
}
