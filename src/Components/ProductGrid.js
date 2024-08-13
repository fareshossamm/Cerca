import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css'; // Ensure this file includes grid layout styles
import img1 from '../Components/Imgs/0/DSCF1710.webp'; 
import img2 from '../Components/Imgs/0/black2.webp'; 
import img3 from '../Components/Imgs/0/two4.webp'; 
import img4 from '../Components/Imgs/0/babyblue1.webp'; 
import img6 from '../Components/Imgs/0/white1.webp'; 
import img7 from '../Components/Imgs/0/india2.webp'; 
import ImageUpload from '../Components/ImageUpload';


const products = [
  { id: 1, image: img1, title: 'Over Size T-shirt Foucs', oldPrice: 700, newPrice: 550 },
  { id: 2, image: img2, title: 'Over Size T-shirt Foucs', oldPrice: 700, newPrice: 550 },
  { id: 3, image: img3, title: 'Over Size T-shirt India', oldPrice: 700, newPrice: 550 },
  { id: 7, image: img7, title: 'Over Size T-shirt India', oldPrice: 700, newPrice: 550 },
  { id: 4, image: img4, title: 'Basic T-Shirt', oldPrice: 600, newPrice: 500 },
  { id: 6, image: img6, title: 'Basic T-Shirt', oldPrice: 600, newPrice: 500 },
];

const ProductGrid = () => {
  return (

    <div className="product-grid-container">
          <ImageUpload />

      <h2 className="product-grid-title"> <span className='color'>Our</span> Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product) => console.log(`${product.title} added to cart`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
