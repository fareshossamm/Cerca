import React from 'react';
import './Styles.css'; // Import the CSS file for styling
import two from '../Components/Imgs/0/two.webp'; 
import two2 from '../Components/Imgs/0/two2.webp'; 
import two3 from '../Components/Imgs/0/two3.webp'; 
import imgBlack2 from '../Components/Imgs/0/black2.webp'; 
import two4 from '../Components/Imgs/0/two4.webp'; 
import balckIndia from '../Components/Imgs/0/india2.webp'; 
import whiteIndia from '../Components/Imgs/0/india3.webp'; 
import backbabyBlueIndia from '../Components/Imgs/0/backBabyBluecIndia.webp'; 

const Styles = () => {
  return (
    <div className="styles-page">
      <h1>Modern and Elegant Styles with <span className='cerca'>Cerca</span></h1>
      <div className="styles-container">
        <div className="style-card">
          <img src={backbabyBlueIndia} alt="Modern Elegance" className="style-image" />
          <div className="style-overlay">
            <h2>Modern Elegance</h2>
            <p>Discover styles that blend contemporary design with timeless elegance.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={whiteIndia} alt="Sophisticated Chic" className="style-image h-100" />
          <div className="style-overlay">
            <h2>Sophisticated Chic</h2>
            <p>Embrace chic and sophisticated looks for every occasion with Cerca’s elegant designs.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={imgBlack2} alt="Edgy Trends" className="style-image" />
          <div className="style-overlay">
            <h2>Edgy Trends</h2>
            <p>Stay ahead of trends with Cerca’s latest edgy fashion collections.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={two} alt="Timeless Classics" className="style-image" />
          <div className="style-overlay">
            <h2>Timeless Classics</h2>
            <p>Rediscover classic styles with a modern twist. Cerca brings timeless fashion to you.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={two2} alt="Urban Edge" className="style-image" />
          <div className="style-overlay">
            <h2>Urban Edge</h2>
            <p>Capture the essence of urban fashion with Cerca. Styles that speak for themselves.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={two3} alt="Elegant Patterns" className="style-image" />
          <div className="style-overlay">
            <h2>Elegant Patterns</h2>
            <p>Add sophistication to your look with Cerca’s elegant patterns and designs.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={two4} alt="Versatile Picks" className="style-image" />
          <div className="style-overlay">
            <h2>Versatile Picks</h2>
            <p>Find versatile fashion choices with Cerca. Perfect for every occasion and style.</p>
          </div>
        </div>
        <div className="style-card">
          <img src={balckIndia} alt="Bold Statements" className="style-image h-100" />
          <div className="style-overlay">
            <h2>Bold Statements</h2>
            <p>Make bold fashion statements with Cerca. Discover unique designs that stand out.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Styles;
