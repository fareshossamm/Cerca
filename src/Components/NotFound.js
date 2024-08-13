import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Optional: for custom styles

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>You can:</p>
      <ul>
        <li><Link to="/">Go back to the homepage</Link></li>
        <li><Link to="/contact">Contact us for help</Link></li>
        <li><Link to="/products">Browse our products</Link></li>
      </ul>
    </div>
  );
};

export default NotFound;
