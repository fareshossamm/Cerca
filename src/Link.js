import React from 'react';
import { Link } from 'react-router-dom';

const MyComponent = ({ productId }) => {
  return (
    <nav>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
      <Link to="/contact">Contact</Link>
      {productId && (
        <Link to={`/product/${productId}`}>Product Details</Link>
      )}
      <Link to="/cart">Cart</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
  );
};

export default MyComponent;
