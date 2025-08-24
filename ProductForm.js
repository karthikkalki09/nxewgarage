// components/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Excellent');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setCategory(product.category);
      setCondition(product.condition);
      setLocation(product.location);
      setDescription(product.description);
      setImages(product.images);
    }
  }, [product]);

  const handleImageChange = (e) => {
    // In a real app, you would upload images to a server
    // For this demo, we'll just use placeholder URLs
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      price: parseFloat(price),
      category,
      condition,
      location,
      description,
      images: images.length > 0 ? images : ['https://via.placeholder.com/400x300?text=Product+Image']
    });
  };

  return (
    <div className="container">
      <div className="product-form">
        <h2 className="form-title">{product ? 'Edit Product' : 'List a New Product'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Product Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., iPhone 13 Pro, Honda Civic 2020"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Price ($)</label>
            <input 
              type="number" 
              className="form-input" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Category</label>
            <select 
              className="form-select" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Vehicles">Vehicles</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label required">Condition</label>
            <select 
              className="form-select" 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="Brand New">Brand New</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label required">Location</label>
            <input 
              type="text" 
              className="form-input" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Description</label>
            <textarea 
              className="form-textarea" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product in detail..."
              required 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Product Images</label>
            <input 
              type="file" 
              multiple 
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="image-preview">
              {images.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img src={img} alt="Preview" className="preview-image" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="submit-btn">
              {product ? 'Update Product' : 'List Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;