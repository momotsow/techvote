import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../imgs/happiness.png'; 
import voteIcon from '../imgs/ballot.png'; 
import menuIcon from '../imgs/menu.png'; 
import closeIcon from '../imgs/close.png'; 
import logoutIcon from '../imgs/logout.png';


function Sidebar() {
    const [isOpen, setIsOpen] = useState(true); // Default open for desktop
    const [isMobile, setIsMobile] = useState(false); // Detect mobile or desktop view
  
    useEffect(() => {
      // Check the initial window width
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
          setIsOpen(false); // Close by default on mobile
        } else {
          setIsMobile(false);
          setIsOpen(true); // Open by default on desktop
        }
      };
  
      // Initial check
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    {/* Menu button for mobile */}
    {isMobile && (
      <button className="menu-btn" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" />
      </button>
    )}

    {/* Sidebar */}
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {isMobile && (
        <button className="close-btn" onClick={toggleSidebar}>
          <img src={closeIcon} alt="Close" />
        </button>
      )}
      <ul>
        <li>
          <Link to="/profile" onClick={toggleSidebar}>
            <img src={profileIcon} alt="Profile Icon" className="sidebar-icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/voting" onClick={toggleSidebar}>
            <img src={voteIcon} alt="Vote Icon" className="sidebar-icon" /> Voting
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={toggleSidebar}>
            <img src={logoutIcon} alt="Logout Icon" className="sidebar-icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  </>
);
}

export default Sidebar;
