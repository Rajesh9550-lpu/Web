import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBarSA = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Company</Link>
        </li>
        <li className="nav-item">
          <span className="nav-link">Personal</span>
        </li>
        <li className="nav-item">
          <Link to="/educational" className="nav-link">Educational</Link>
        </li>
        <li className="nav-item">
          <Link to="/professional" className="nav-link">Professional</Link>
        </li>
        <li className="nav-item">
          <Link to="/documents" className="nav-link">Documents</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBarSA
