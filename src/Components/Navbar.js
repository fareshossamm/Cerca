import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Imgs/0/logo.png';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar visibility
  const navbarCollapseRef = useRef(null);

  // Function to get cart quantity from local storage
  const getCartQuantity = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, []);

  // Function to update cart quantity
  const updateCartQuantity = useCallback(() => {
    setCartQuantity(getCartQuantity());
  }, [getCartQuantity]);

  useEffect(() => {
    updateCartQuantity(); // Initial load

    // Event listener for custom cartUpdated event
    const handleCartUpdate = () => {
      updateCartQuantity();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [updateCartQuantity]);

  // Toggle navbar on link click (only on small screens)
  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }
  };

  // Handle navbar toggle button click
  const handleNavbarToggle = () => {
    setIsNavOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-5">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Brand Logo" className="logo-img" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`}
          id="navbarSupportedContent"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
                onClick={handleLinkClick}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link id="cart" className="nav-link" to="/cart" onClick={handleLinkClick}>
                <div className="cart-icon-container">
                  <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                  {cartQuantity > 0 && (
                    <span className="cart-quantity">{cartQuantity}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
