// src/Components/ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle image upload logic here (e.g., send to server)
    console.log('Image:', image);
  };

  return (
    <div className="image-upload">
      <form onSubmit={handleSubmit}>
        {preview && <img src={preview} alt="Preview" className="image-preview" />}
      </form>
    </div>
  );
};

export default ImageUpload;
