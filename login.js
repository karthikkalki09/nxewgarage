// components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToSignup, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Login to Your Account</h2>
        <p>Access your account to sell items and contact sellers</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn full-width">Login</button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <button className="link-btn" onClick={onSwitchToSignup}>Sign up here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;