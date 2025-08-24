// components/ContactSeller.js
import React, { useState } from 'react';

const ContactSeller = ({ product, onBack }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your message has been sent to ${product.seller.name}! They will contact you soon.`);
    onBack();
  };

  return (
    <div className="container">
      <div className="contact-form">
        <h2 className="form-title">Contact Seller</h2>
        
        <div className="product-info">
          <h3>Regarding: {product.title}</h3>
          <p>Price: ${product.price.toLocaleString()}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Your Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Your Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Your Phone</label>
            <input 
              type="tel" 
              className="form-input" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Message to Seller</label>
            <textarea 
              className="form-textarea" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hello, I'm interested in your ${product.title}...`}
              required 
            ></textarea>
          </div>
          
          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onBack}>Cancel</button>
            <button type="submit" className="submit-btn">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSeller;