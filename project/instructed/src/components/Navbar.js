import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <nav className="navbar-container">
          <Link to="/" className="navbar-logo">
            hello
          </Link>
        </nav>
      </nav>
    </>
  )
}

export default Navbar
