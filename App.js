// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Header from './components/header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import ContactSeller from './components/contactseller';
import UserProfile from './components/userprofile';
import Login from './components/login';
import Signup from './components/signup';

// Sample data
const initialProducts = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    price: 850,
    category: "Electronics",
    description: "Like new iPhone 13 Pro with 256GB storage. Includes original box and accessories.",
    images: ["https://via.placeholder.com/400x300?text=iPhone+13+Pro"],
    seller: {
      name: "John Smith",
      phone: "555-1234",
      email: "john.smith@example.com",
      id: "user1"
    },
    date: "2023-05-15",
    condition: "Excellent",
    location: "New York"
  },
  {
    id: 2,
    title: "Honda Civic 2020",
    price: 18500,
    category: "Vehicles",
    description: "Low mileage Honda Civic in excellent condition. Regularly serviced with full service history.",
    images: ["https://via.placeholder.com/400x300?text=Honda+Civic"],
    seller: {
      name: "Sarah Johnson",
      phone: "555-5678",
      email: "sarahj@example.com",
      id: "user2"
    },
    date: "2023-05-10",
    condition: "Very Good",
    location: "Los Angeles"
  }
];

// Sample users (in a real app, this would be in a database)
const sampleUsers = [
  {
    id: "user1",
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    phone: "555-1234",
    location: "New York"
  },
  {
    id: "user2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    phone: "555-5678",
    location: "Los Angeles"
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authAction, setAuthAction] = useState(null); // 'sell' or 'contact'

  // Load products and user from localStorage on initial render
  useEffect(() => {
    const savedProducts = localStorage.getItem('marketplaceProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedUser = localStorage.getItem('marketplaceUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('marketplaceProducts', JSON.stringify(products));
  }, [products]);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('marketplaceUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('marketplaceUser');
    }
  }, [currentUser]);

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      seller: {
        ...currentUser
      }
    };
    setProducts([...products, product]);
    setShowProductForm(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowContactForm(false);
  };

  const handleContactSeller = () => {
    if (!currentUser) {
      setAuthAction('contact');
      setShowLogin(true);
      return;
    }
    setShowContactForm(true);
  };

  const handleSellItemClick = () => {
    if (!currentUser) {
      setAuthAction('sell');
      setShowLogin(true);
      return;
    }
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setShowContactForm(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleLogin = (email, password) => {
    // In a real app, this would be an API call
    const user = sampleUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      
      // After login, perform the action that required auth
      if (authAction === 'sell') {
        setShowProductForm(true);
      } else if (authAction === 'contact' && selectedProduct) {
        setShowContactForm(true);
      }
      
      setAuthAction(null);
      return true;
    }
    return false;
  };

  const handleSignup = (userData) => {
    // In a real app, this would be an API call
    const newUser = {
      ...userData,
      id: `user${Date.now()}`
    };
    
    setCurrentUser(newUser);
    setShowSignup(false);
    
    // After signup, perform the action that required auth
    if (authAction === 'sell') {
      setShowProductForm(true);
    } else if (authAction === 'contact' && selectedProduct) {
      setShowContactForm(true);
    }
    
    setAuthAction(null);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowUserProfile(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const userProducts = products.filter(product => currentUser && product.seller.id === currentUser.id);

  return (
    <div className="App">
      <Header 
        onAddProduct={handleSellItemClick}
        onSearch={setSearchQuery}
        onFilter={setFilterCategory}
        onShowProfile={() => setShowUserProfile(true)}
        user={currentUser}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
      
      <div className="container">
        {showLogin ? (
          <Login 
            onLogin={handleLogin}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
            onClose={() => {
              setShowLogin(false);
              setAuthAction(null);
            }}
          />
        ) : showSignup ? (
          <Signup 
            onSignup={handleSignup}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            onClose={() => {
              setShowSignup(false);
              setAuthAction(null);
            }}
          />
        ) : showUserProfile ? (
          <UserProfile 
            user={currentUser}
            products={userProducts}
            onEditProduct={handleEditClick}
            onDeleteProduct={handleDeleteProduct}
            onClose={() => setShowUserProfile(false)}
            onLogin={() => setShowLogin(true)}
          />
        ) : showProductForm ? (
          <ProductForm 
            product={editingProduct}
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        ) : selectedProduct ? (
          showContactForm ? (
            <ContactSeller 
              product={selectedProduct}
              onBack={handleBackToList}
              currentUser={currentUser}
            />
          ) : (
            <ProductDetail 
              product={selectedProduct}
              onContactSeller={handleContactSeller}
              onBack={handleBackToList}
              currentUser={currentUser}
              onEditProduct={handleEditClick}
              onDeleteProduct={handleDeleteProduct}
              onLogin={() => {
                setAuthAction('contact');
                setShowLogin(true);
              }}
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