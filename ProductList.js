// components/ProductList.js
import React from 'react';

const ProductList = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>No products found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Latest Products ({products.length})</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductClick(product)}>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;