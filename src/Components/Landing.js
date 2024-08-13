import React from "react";
import "./Landing.css";
import heroImage from "../Components/Imgs/0/landing.webp"; // Update with the correct path to your image
import ProductGrid from './ProductGrid'; // Import the ProductGrid component
import ImageUpload from '../Components/ImageUpload';
import ScrollToTopButton from '../Components/ScrollToTopButton'; // Import the ScrollToTopButton component

const Landing = () => {
  return (
    
    <div className="landing-container">
            <ImageUpload />
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Wear Your Passion with <span className="highlight">Cerca</span>
          </h1>
          <h5 className="subheading">
            Explore our collection of premium t-shirts 
            designed to fit your lifestyle.
          </h5>
          <button className="cta-button">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Landing" />
        </div>
      </section>
      <ProductGrid />
      <ScrollToTopButton /> {/* Add the ScrollToTopButton component */}
    </div>
  );
};

export default Landing;
