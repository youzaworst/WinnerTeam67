import React, { useState } from 'react';

function LoginScreen({ active, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('screen-dashboard');
  };

  return (
    <div id="screen-login" className={`screen ${active ? 'active' : ''}`}>
      <div className="onboarding">
        <div className="onboarding-container">
          <div className="logo">
            <div className="logo-icon">🎯</div>
            <span className="logo-text">FocusFlow</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your learning journey.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter your password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Sign In
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
          
          <div className="auth-switch">
            Don't have an account? <a onClick={() => onNavigate('screen-signup')}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
