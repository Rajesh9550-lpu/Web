import React from 'react';
import './NavigationBar.css'
  
    
    const NavigationBar = () => {
      return (
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link">Company</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Personal</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Educational</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Professional</span>
            </li>
            <li className="nav-item nav-item-left">
              <span className="nav-link">Documents</span>
            </li>
          </ul>
        </nav>
      );
    };
    
export default NavigationBar;