// components/Signup.js
import React, { useState } from 'react';

const Signup = ({ onSignup, onSwitchToLogin, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const success = onSignup({
      name, email, password, phone, location
    });
    
    if (!success) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Create Your Account</h2>
        <p>Join our marketplace to buy and sell items</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required 
            />
          </div>
          
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
              placeholder="Create a password (min. 6 characters)"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Confirm Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className="form-input" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city"
            />
          </div>
          
          <button type="submit" className="submit-btn full-width">Create Account</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <button className="link-btn" onClick={onSwitchToLogin}>Login here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;