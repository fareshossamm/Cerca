import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import './Footer.css'; // Ensure this file includes custom styles
import Logo from './Imgs/0/logo.png'; // Verify the path to your logo image

const Footer = () => {
  const phoneNumber = "+201201728706"; // Your phone number
  const message = "Hello! I would like to chat."; // Optional pre-filled message

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-logo">
          <img src={Logo} alt="Cerca Logo" className="footer-logo-img" />
          <p className="footer-description">
            Cerca is your go-to brand for stylish and comfortable unisex t-shirts. Embrace fashion with our unique and trendy designs.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/cart">cart</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4 className='follow'>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/cerca.eg/" className="social-icon insta-icon" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
              className="social-icon whatsapp-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <div className="bottom">
      <h6>&copy; {new Date().getFullYear()} Cerca , All rights reserved. Developed by Fares Hossam</h6>
      </div>
    </footer>
  );
}

export default Footer;
