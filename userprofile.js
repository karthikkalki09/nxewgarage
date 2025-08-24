// components/UserProfile.js
import React from 'react';

const UserProfile = ({ user, products, onEditProduct, onDeleteProduct, onClose, onLogin }) => {
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  if (!user) {
    return (
      <div className="container">
        <div className="user-profile-page">
          <div className="auth-prompt">
            <h2>Please Log In</h2>
            <p>You need to be logged in to view your profile.</p>
            <button className="login-btn" onClick={onLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="user-profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>📍 {user.location}</p>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{products.length}</div>
            <div className="stat-label">Products Listed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {products.filter(p => p.category === 'Electronics').length}
            </div>
            <div className="stat-label">Electronics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {products.filter(p => p.category === 'Vehicles').length}
            </div>
            <div className="stat-label">Vehicles</div>
          </div>
        </div>
        
        <div className="user-products-header">
          <h2 className="user-products-title">Your Listed Products</h2>
          <button className="back-btn" onClick={onClose}>Back to Marketplace</button>
        </div>
        
        {products.length === 0 ? (
          <div className="no-products">
            <h3>You haven't listed any products yet</h3>
            <p>Start selling by listing your first item!</p>
          </div>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.images[0]} alt={product.title} className="product-image" />
                <div className="product-condition">{product.condition}</div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">${product.price.toLocaleString()}</div>
                  <span className="product-category">{product.category}</span>
                  <p className="product-description">{product.description}</p>
                  <div className="product-location">
                    <span>📍</span>
                    {product.location}
                  </div>
                  
                  <div className="action-buttons" style={{ marginTop: '15px' }}>
                    <button className="edit-btn" onClick={() => onEditProduct(product)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => onDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;