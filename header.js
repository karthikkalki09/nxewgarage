// components/Header.js
import React from 'react';

const Header = ({ onAddProduct, onSearch, onFilter, onShowProfile, user, onLogin, onLogout }) => {
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🏪</span>
          MarketPlace
        </div>
        
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
            onChange={(e) => onSearch(e.target.value)}
          />
          
          <select className="filter-select" onChange={(e) => onFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Vehicles">Vehicles</option>
          </select>
        </div>
        
        <div className="header-right">
          <button className="add-product-btn" onClick={onAddProduct}>
            + Sell Item
          </button>
          
          {user ? (
            <div className="user-profile" onClick={onShowProfile}>
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <span>{user.name}</span>
              <button className="logout-btn" onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={onLogin}>Login</button>
              <button className="signup-btn" onClick={onLogin}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;