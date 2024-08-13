import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './CartIcon.css'; // Ensure this file includes custom styles

const CartIcon = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/cart'); // Navigate to cart page
  };

  return (
    <div className="cart-icon" onClick={handleClick}>
      <FaShoppingCart />
    </div>
  );
};

export default CartIcon;
