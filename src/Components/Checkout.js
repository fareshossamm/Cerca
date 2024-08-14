import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import './Checkout.css';

const governorates = [
  'Cairo', 'Alexandria', 'Giza', 'Aswan', 'Assiut', 'Beni Suef', 'Dakahlia',
  'Damietta', 'Faiyum', 'Gharbia', 'Ismailia', 'Kafr El Sheikh', 'Minya',
  'Monufia', 'New Valley', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea',
  'Sharqia', 'Suez', 'South Sinai', 'North Sinai', 'Luxor'
];

const Checkout = () => {
  const location = useLocation();
  const { cart = [], totalPrice = 0 } = location.state || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [customDetails, setCustomDetails] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!phone) errors.phone = 'Phone number is required.';
    if (!address) errors.address = 'Address is required.';
    if (cart.length > 0 && cart[0]?.quantity > 1 && !customDetails.trim()) {
      errors.customDetails = 'Please provide size and color details for each t-shirt.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setShowModal(true);
  };

  const handleConfirm = () => {
    emailjs.send('service_zqw7s5i', 'template_batzn9h', {
      title: cart.map(item => item.title).join(', ') || 'N/A',
      color: cart.map(item => item.color).join(', ') || 'N/A',
      size: cart.map(item => item.size).join(', ') || 'N/A',
      quantity: cart.map(item => item.quantity).join(', ') || 0,
      customDetails,
      totalPrice,
      to_name: name,
      to_email: email,
      to_phone: phone,
      address
    }, 'Xef_ZmdWDtSJVfU9I')
      .then((response) => {
        console.log('Success:', response);
        setShowModal(false);
        toast.success('Order confirmed successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, (error) => {
        console.log('Error:', error);
        setShowModal(false);
        toast.error('Failed to send email. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="checkout container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <Row>
      <Col md={6}>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.length === 0 ? (
              <p>No items in the cart.</p>
            ) : (
              cart.map((item, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text><strong>Color:</strong> {item.color}</Card.Text>
                    <Card.Text><strong>Size:</strong> {item.size}</Card.Text>
                    <Card.Text><strong>Quantity:</strong> {item.quantity}</Card.Text>
                    {cart.length > 0 && cart[0]?.quantity > 1 && (
              <Form.Group controlId="formCustomDetails">
                  <Form.Label className='custom-tittle'>
                    Please provide size and color for each t-shirt:
                  </Form.Label>
                <Form.Control className='textarea custom'
                  as="textarea"
                  rows={3}
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  placeholder="e.g., Size L, Color Red ; Size M, Color Blue"
                  isInvalid={!!errors.customDetails}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customDetails}
                </Form.Control.Feedback>
              </Form.Group>
            )}
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Control
                type="text"
                placeholder="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Control
                as="select"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                isInvalid={!!errors.address}
                className="select-style"
              >
                <option value="">Select Governorate</option>
                {governorates.map((gov, index) => (
                  <option key={index} value={gov}>{gov}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className='bg-success w-100 m-2' variant="primary" type="submit">Submit</Button>
            <Card className="mt-3">
              <Card.Body>
              <Card.Title className='price-tittle :'>Total Price : <span className="price-text">EGP {totalPrice.toFixed()}</span></Card.Title>
              </Card.Body>
            </Card>
          </Form>
        </Col>
        
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to confirm this order?</p>
          <div className="order-details">
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Size:</strong> {item.size}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong className='details-capital'>customDetails:</strong> {customDetails}</p>
                <hr />
              </div>
            ))}
            <p><strong>Total Price:</strong> EGP {totalPrice.toFixed()}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className='bg-success' variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
