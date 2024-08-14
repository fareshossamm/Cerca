import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import ProductGrid from './Components/ProductGrid';
import ProductDetails from './Components/ProductDetails';
import Checkout from './Components/Checkout';
import Styles from './Components/Styles';
import Cart from './Components/Cart';
import NotFound from './Components/NotFound';
import ScrollToTop from './Components/ScrollToTop';
import Loader from './Components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      
      <ScrollToTop /> 

      <Navbar />
      
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductGrid />} />
        <Route path="/product/:id" element={<ProductDetails   />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname === '/' && <Styles />}
      <Footer />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    
    <AppContent />
  </Router>
  
);

export default AppWithRouter;
