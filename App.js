// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Header from './components/header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import ContactSeller from './components/contactseller';

// Sample data
const initialProducts = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    price: 850,
    category: "Electronics",
    description: "Like new iPhone 13 Pro with 256GB storage. Includes original box and accessories.",
    images: ["https://i.pinimg.com/736x/f0/82/4c/f0824cf33dc11aee51bd5ff104266d70.jpg"],
    seller: {
      name: "John Smith",
      phone: "555-1234",
      email: "john.smith@example.com"
    },
    date: "2023-05-15"
  },
  {
    id: 2,
    title: "Honda Civic 2020",
    price: 18500,
    category: "Vehicles",
    description: "Low mileage Honda Civic in excellent condition. Regularly serviced with full service history.",
    images: ["https://i.pinimg.com/1200x/92/ab/ec/92abec10f7b4991688fb2c5695d46d89.jpg"],
    seller: {
      name: "Sarah Johnson",
      phone: "555-5678",
      email: "sarahj@example.com"
    },
    date: "2023-05-10"
  },
  {
    id: 3,
    title: "Samsung 4K Smart TV",
    price: 600,
    category: "Electronics",
    description: "55 inch Samsung 4K Smart TV. Perfect condition with remote and stand included.",
    images: ["https://i.pinimg.com/1200x/e5/72/42/e57242476c69b83ad60a1b52e19fc03a.jpg"],
    seller: {
      name: "Mike Thompson",
      phone: "555-9012",
      email: "mike.t@example.com"
    },
    date: "2023-05-08"
  },
  {
    id: 4,
    title: "Canon EOS R5 Camera",
    price: 3200,
    category: "Electronics",
    description: "Professional mirrorless camera with 45MP. Includes two lenses and camera bag.",
    images: ["https://i.pinimg.com/1200x/6c/cf/7e/6ccf7e7308a0900f02bb33fac6798b29.jpg"],
    seller: {
      name: "Alex Rivera",
      phone: "555-3456",
      email: "alex.rivera@example.com"
    },
    date: "2023-05-05"
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load products from localStorage on initial render
  useEffect(() => {
    const savedProducts = localStorage.getItem('marketplaceProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('marketplaceProducts', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, product]);
    setShowProductForm(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowContactForm(false);
  };

  const handleContactSeller = () => {
    setShowContactForm(true);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setShowContactForm(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="App">
      <Header 
        onAddProduct={() => setShowProductForm(true)} 
        onSearch={setSearchQuery}
        onFilter={setFilterCategory}
      />
      
      <div className="container">
        {showProductForm ? (
          <ProductForm 
            onSubmit={handleAddProduct}
            onCancel={() => setShowProductForm(false)}
          />
        ) : selectedProduct ? (
          showContactForm ? (
            <ContactSeller 
              product={selectedProduct}
              onBack={handleBackToList}
            />
          ) : (
            <ProductDetail 
              product={selectedProduct}
              onContactSeller={handleContactSeller}
              onBack={handleBackToList}
            />
          )
        ) : (
          <ProductList 
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;