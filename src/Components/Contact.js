import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { init, send } from "emailjs-com";
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the default stylesheet for toast
import "./Contact.css";
import ContactImage from "./Imgs/0/conact.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Initialize EmailJS
init("Xef_ZmdWDtSJVfU9I");

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Show loader
      send("service_zqw7s5i", "template_okr4jzg", formData)
        .then((response) => {
          setIsLoading(false); // Hide loader
          toast.success("Message sent successfully!"); // Show success toast
          setFormData({ name: "", email: "", message: "" });
          setFormErrors({ name: "", email: "", message: "" }); // Clear errors on success
        })
        .catch((err) => {
          setIsLoading(false); // Hide loader
          toast.error("Failed to send message. Please try again."); // Show error toast
        });
    }
  };

  return (
    <div className="contact-us container my-5">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="contact-content row">
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="about-image">
            <img
              className="m-lg-3 contact-img"
              src={ContactImage}
              alt="Contact Us"
            />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-lg-6 forms">
          <div className="contact-form m-lg-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {formErrors.name && <div className="error alert alert-danger">{formErrors.name}</div>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {formErrors.email && <div className="error alert alert-danger">{formErrors.email}</div>}
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                ></textarea>
                {formErrors.message && <div className="error alert alert-danger">{formErrors.message}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isLoading ? <Spinner animation="border" size="sm" /> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="contact-info text-center mt-4">
        <h1 className="text-uppercase mb-2">
          Contact <span className="color">Us</span>
        </h1>
        <p className="mail">
          <a href="mailto:hosamelwy158@gmail.com" className="contact-link">
            <FaEnvelope className="blue" /> hosamelwy158@gmail.com
          </a>
        </p>
        <p>
          <FaPhone className="blue" /> +2 01201728706 <br />
          <FaPhone className="blue" /> +2 01276884204
        </p>
      </div>
    </div>
  );
}

export default Contact;
