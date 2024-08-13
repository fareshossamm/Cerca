import React from 'react';
import './About.css'; // Import the CSS file for styling
import about from '../Components/Imgs/0/about.webp';

const About = () => {
  return (
    <section className="about">
      <div className="containere">
        <div className="text-content">
          <h1 className="color">About Cerca</h1>
          <p>Welcome to Cerca, where fashion meets comfort in our exclusive range of unisex t-shirts. Our mission is to provide apparel that fits seamlessly into every wardrobe, combining high-quality materials with contemporary designs.</p>
          <p>At Cerca, we believe in inclusivity and versatility. Each piece is crafted with care to ensure that everyone finds something they love. Our t-shirts are not only stylish but also designed to be worn and enjoyed by everyone.</p>
          <p>We are committed to sustainability and ethical practices, ensuring that each product is made with respect for people and the planet. Join us in making fashion that feels good and does good.</p>
          <p>Thank you for being part of the Cerca community. Explore our collection and experience the perfect blend of style and comfort.</p>
        </div>
        <div className="image-content">
          <img src={about} alt="Cerca Logo" className="logo-img" />
        </div>
      </div>
    </section>
  );
};

export default About;
