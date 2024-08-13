import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

import './ProductDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import images
import imgBlack1 from '../Components/Imgs/0/black1.webp'; 
import imgBabyBlue1 from '../Components/Imgs/0/babyblue1.webp'; 
import imgWhite1 from '../Components/Imgs/0/white1.webp'; 
import imgBlack2 from '../Components/Imgs/0/black2.webp'; 
import imgWhite2 from '../Components/Imgs/0/white2.webp'; 
import imgBlack3 from '../Components/Imgs/0/black3.webp'; 
import imgWhite3 from '../Components/Imgs/0/white3.webp'; 
import blackIndia from '../Components/Imgs/0/india2.webp'; 
import whiteIndia from '../Components/Imgs/0/india3.webp'; 
import babyBlueIndia from '../Components/Imgs/0/india.webp'; 
import backbabyBlueIndia from '../Components/Imgs/0/backBabyBluecIndia.webp'; 
import backwhitefocus from '../Components/Imgs/0/BackFocus.webp'; 
import ImageUpload from '../Components/ImageUpload';

// Inside your component
<ImageUpload />


const products = [
  { id: 1, title: 'Over Size T-shirt Foucs', oldPrice: 700, newPrice: 550, images: { white: imgWhite2, black: imgBlack2, BabyBlue: "out of stock" } },
  { id: 2, title: 'Over Size T-shirt Foucs', oldPrice: 700, newPrice: 550, images: { black: imgBlack2, BabyBlue: "out of stock", white: backwhitefocus }},
  { id: 3, title: 'Over Size T-shirt India', oldPrice: 700, newPrice: 550, images: { black: imgBlack3, BabyBlue: backbabyBlueIndia, white: imgWhite3 }},
  { id: 7, title: 'Over Size T-shirt India', oldPrice: 700, newPrice: 550, images: { black: blackIndia, BabyBlue: babyBlueIndia, white: whiteIndia }},
  { id: 4, title: 'Basic T-Shirt', oldPrice: 600, newPrice: 500, images: { BabyBlue: imgBabyBlue1, black: imgBlack1, white: imgWhite1 }},
  { id: 6, title: 'Basic T-Shirt', oldPrice: 600, newPrice: 500, images: { white: imgWhite1, black: imgBlack1, BabyBlue: imgBabyBlue1 }},
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (color && size && product.images[color] !== "out of stock") {
      const message = `I'm interested in purchasing the "${product.title}".\nHere are the details:\n- Color: ${color}\n- Size: ${size}\n- Quantity: ${quantity}\nPlease let me know how to proceed.`;
      setWhatsappLink(`https://wa.me/+201201728706?text=${encodeURIComponent(message)}`);
      setWhatsappError('');
    } else {
      setWhatsappLink('');
      setWhatsappError('Please select the color and size to make the all buttons work.');
    }
  }, [color, size, quantity, product.title, product.images]);

  const isDisabled = !color || !size || product.images[color] === "out of stock";

  if (!product) return <p>Product not found</p>;

  const availableColors = Object.keys(product.images).filter(colorKey => product.images[colorKey] !== "out of stock");

  const productImage = product.images[color] && product.images[color] !== "out of stock"
    ? product.images[color]
    : Object.values(product.images).find(img => img !== "out of stock");

  const handleAddToCart = () => {
    if (isDisabled) {
      setError('Please select both color and size, and ensure the selected color is in stock.');
      return;
    }

    setError('');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      ...product,
      color,
      size,
      quantity,
      img: product.images[color]
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    setShowModal(true);
  };

  const handleCheckout = () => {
    if (isDisabled || quantity <= 0) {
      setError('Please select color, size, and quantity. Ensure the selected color is in stock.');
      return;
    }

    setError('');
    navigate('/checkout', { state: { cart: [{ ...product, color, size, quantity }], totalPrice: product.newPrice * quantity } });
  };

  const handleColorSelect = (selectedColor) => {
    if (product.images[selectedColor] !== "out of stock") {
      setColor(selectedColor);
      setError('');
    } else {
      setError('Selected color is out of stock.');
    }
  };

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
    setShowModal(false);
  };

  const handleContinueShopping = () => {
    navigate('/products');
    setShowModal(false);
  };

  return (
    <div className="product-details container">
      <div className="row">
        <div className="col-md-6">
          <img src={productImage} alt={product.title} className="product-main-image img-fluid" />
          
        </div>
        <div className="col-md-6">
          
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">
            <span className="old-price"> EGP {product.oldPrice}</span>
            <span className="new-price"> <span className='egp'>EGP</span> {product.newPrice}</span>
          </p>
          <div className="product-options">
            <div className="option-group">
              <label>Color:</label>
              <div className="color-options">
                {availableColors.map((colorKey) => (
                  <div 
                    key={colorKey} 
                    className={`color-option ${color === colorKey ? 'selected' : ''}`} 
                    style={{ backgroundColor: colorKey === 'BabyBlue' ? 'royalblue' : colorKey }} 
                    onClick={() => handleColorSelect(colorKey)}
                    title={colorKey}
                  />
                ))}
              </div>
            </div>
            <div className="option-group">
              <label>Size:</label>
              <div className="size-options">
                {['S', 'M', 'L', 'XL'].map((sizeOption) => (
                  <div 
                    key={sizeOption}
                    className={`size-option ${size === sizeOption ? 'selected' : ''}`} 
                    onClick={() => handleSizeSelect(sizeOption)}
                  >
                    {sizeOption}
                  </div>
                ))}
              </div>
            </div>
            <div className="option-group">
              <label>Quantity:</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange} 
                min="1" 
                className="quantity-input form-control w-25" 
              />
            </div>
          </div>
          {error && (
            <div className="error-message alert alert-danger">
              <i className="error-icon">!</i> 
              <p>{error}</p>
            </div>
          )}
          <div className="button-group">
            <button 
              className='btn btn-primary' 
              onClick={handleAddToCart}
              disabled={isDisabled}
            >
              Add to Cart
            </button>
            <button 
              className='btn btn-secondary' 
              onClick={handleCheckout}
              disabled={isDisabled}
            >
              Checkout
            </button>
            {whatsappLink ? (
              <a 
                href={whatsappLink} 
                className='btn btn-success'
                target="_blank" 
                rel="noopener noreferrer"
              >
                Order on WhatsApp <FaWhatsapp />
              </a>
            ) : (
              <button 
                className='btn btn-danger' 
                disabled
              >
               
               Order on WhatsApp
              </button>
            )}
            {whatsappError && (
              <div className="whatsapp-error alert alert-danger">
                <p>{whatsappError}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Added to Cart</h5>
               
              </div>
              <div className="modal-body">
                <p>Your product has been added to the cart.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleGoToCart}>Go to Cart</button>
                <button type="button" className="btn btn-secondary" onClick={handleContinueShopping}>Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ImageUpload />

    </div>
    
  );
  
};

export default ProductDetails;
