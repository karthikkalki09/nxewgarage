// components/ProductDetail.js
import React from 'react';

const ProductDetail = ({ product, onContactSeller, onBack, currentUser, onEditProduct, onDeleteProduct, onLogin }) => {
  const isOwner = currentUser && product.seller.id === currentUser.id;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="detail-header">
          <h2 className="detail-title">{product.title}</h2>
          <div className="detail-price">${product.price.toLocaleString()}</div>
        </div>
        
        <span className="detail-category">{product.category}</span>
        <span className="detail-condition">{product.condition}</span>
        
        <div className="product-meta">
          <div className="meta-item">
            <span>📍</span>
            {product.location}
          </div>
          <div className="meta-item">
            <span>📅</span>
            Listed on: {product.date}
          </div>
        </div>
        
        <div className="detail-images">
          {product.images.map((img, index) => (
            <img key={index} src={img} alt={`${product.title} ${index + 1}`} className="detail-image" />
          ))}
        </div>
        
        <p className="detail-description">{product.description}</p>
        
        <div className="seller-info">
          <div className="seller-name">Seller: {product.seller.name}</div>
          <div className="contact-date">Listed on: {product.date}</div>
        </div>
        
        <div className="action-buttons">
          <button className="back-btn" onClick={onBack}>Back to Products</button>
          
          {isOwner ? (
            <>
              <button className="edit-btn" onClick={() => onEditProduct(product)}>Edit Product</button>
              <button className="delete-btn" onClick={() => onDeleteProduct(product.id)}>Delete Product</button>
            </>
          ) : (
            <button className="contact-btn" onClick={onContactSeller}>
              {currentUser ? 'Contact Seller' : 'Login to Contact'}
            </button>
          )}
        </div>

        {!currentUser && (
          <div className="auth-prompt">
            <p>You need to be logged in to contact the seller.</p>
            <button className="link-btn" onClick={onLogin}>Login or create an account</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;