import React, { useState } from 'react';
import { loginUser } from '../services/userService';

function LoginScreen({ active, onNavigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData.username, formData.password);
      
      if (onLoginSuccess) {
        onLoginSuccess(response.user);
      }
      
      onNavigate('screen-dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
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
          
          {error && (
            <div style={{ 
              padding: '12px', 
              background: 'rgba(248, 113, 113, 0.15)', 
              border: '1px solid rgba(248, 113, 113, 0.3)',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#f87171'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter your username" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
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
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
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
