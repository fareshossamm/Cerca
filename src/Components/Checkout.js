import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import emailjs from 'emailjs-com';
import './Checkout.css';

emailjs.init("PCCXB3f2MWb-iS__1");

const colorOptions = ["Black", "White", "RoyalBlue"];
const governorates = [
  "Cairo", "Alexandria", "Giza", "Dakahlia", "Sharqia", "Kafr El Sheikh", "Qalyubia",
  "Aswan", "Luxor", "Suez", "Port Said", "Red Sea", "New Valley", "Minya", "Beni Suef"
];

const Checkout = () => {
  const { state } = useLocation();
  const { cart, totalPrice } = state || {};

  const initialColors = cart.map(item => Array(item.quantity).fill(''));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [colors, setColors] = useState(initialColors);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (!phone || !/^\d{11}$/.test(phone)) newErrors.phone = 'Please enter a valid 11-digit phone number.';

    // Validate color selection
    const colorErrors = colors.map(colorArr => colorArr.every(color => color !== ''));
    if (colorErrors.some(hasColor => !hasColor)) {
      newErrors.colors = 'Please select a color for each item.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    const emailData = {
      cartItems: cart.map((item, index) => ({
        title: item.title,
        price: item.newPrice * item.quantity,
        size: item.size,
        quantity: item.quantity,
        color: colors[index], // Use selected color here
        image: item.img
      })),
      totalPrice: totalPrice,
      name: name,
      email: email,
      address: address,
      phone: phone
    };

    emailjs.send("service_jcwdubp", 'template_e1999ya', emailData, 'PCCXB3f2MWb-iS__1')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setShowConfirmModal(false);
        setShowModal(true);
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setColors(cart.map(() => []));
      }, (error) => {
        console.log('Email sending error:', error.text);
        setErrors({ global: 'There was an error sending your order. Please try again.' });
        setShowConfirmModal(false);
      });
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleColorChange = (itemIndex, colorIndex, color) => {
    const newColors = [...colors];
    newColors[itemIndex][colorIndex] = color;
    setColors(newColors);
  };

  return (
    <div className="checkout container my-4">
      <h1 className="text-center mb-4">Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          {cart.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <p><strong>Product:</strong> {item.title}</p>
              <p><strong>Price:</strong> EGP {item.newPrice.toFixed()}</p>
              <p><strong>Size:</strong> {item.size}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>

              {Array.from({ length: item.quantity }).map((_, colorIndex) => (
                <div key={colorIndex} className="mb-3">
                  <p>Item {colorIndex + 1}:</p>
                  <div className="color-picker">
                    {colorOptions.map(option => (
                      <div
                        key={option}
                        className={`color-circle ${colors[index][colorIndex] === option ? 'selected' : ''}`}
                        style={{ backgroundColor: option.toLowerCase() }}
                        onClick={() => handleColorChange(index, colorIndex, option)}
                      />
                    ))}
                  </div>
                  {errors.colors && colors[index][colorIndex] === '' && (
                    <div className="error-message">Color selection is required for this item.</div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {errors.colors && <div className="error-message">{errors.colors}</div>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <select
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          >
            <option value="">Select Address</option>
            {governorates.map(gov => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number (11 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="button-container">
          <Button type="submit" variant="primary">Place Order</Button>
          <p className='total'><strong className='str'>Total Price :</strong> EGP {totalPrice.toFixed()}</p>
        </div>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to place this order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for your order! We will contact you shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;
