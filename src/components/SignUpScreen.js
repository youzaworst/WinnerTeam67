import React, { useState } from 'react';

function SignUpScreen({ active, onNavigate, onSetUserName, onUserCreated }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ IDENTICAL CODE (moved here, unchanged except no export)
  async function createUser(userData) {
    const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = {
        username: formData.username,
        password: formData.password,
        gmail_login: formData.email,
        current_xp_level: 1,
        amount_of_xp: 0,
        has_autism: false,
        has_adhd: false,
        has_dyslexia: false,
        has_epilepsy: false
      };

      const createdUser = await createUser(userData);
      
      if (onSetUserName) {
        onSetUserName(createdUser.username);
      }
      if (onUserCreated) {
        onUserCreated(createdUser);
      }
      
      onNavigate('screen-struggles');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="screen-signup" className={`screen ${active ? 'active' : ''}`}>
      <div className="onboarding">
        <div className="onboarding-container">
          <div className="progress-steps">
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
          </div>
          
          <h1>Create Account</h1>
          <p>Let's get you set up in just a few steps.</p>
          
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
                placeholder="Choose a username" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
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
                placeholder="Create a password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Continue'}
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>
          
          <div className="auth-switch">
            Already have an account? <a onClick={() => onNavigate('screen-login')}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
