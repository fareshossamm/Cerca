// src/components/ScrollToTopButton.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollToTopButton.css'; // Ensure this CSS file is updated

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 500) { // Show button after scrolling down 500px
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`Btn ${visible ? 'visible' : 'hidden'}`} // Apply visibility classes
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg height="1.2em" className="arrow" viewBox="0 0 512 512">
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
