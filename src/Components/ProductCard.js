import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Ensure this file includes card styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS
import ImageUpload from '../Components/ImageUpload';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the product details page or handle the click event
    navigate(`/product/${product.id}`);
  };



  return (
    
    <div className="product-card" onClick={handleClick}>
            <ImageUpload />
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h1 className="product-title text-center mt-0">{product.title}</h1>
        <p className="product-price">
          <span className="old-price"> EGP {product.oldPrice}</span>
          <span className="new-price"> <span className='egp'>EGP</span> {product.newPrice}</span>
        </p>
        
      </div>

      
    </div>
    
  );

};

export default ProductCard;
