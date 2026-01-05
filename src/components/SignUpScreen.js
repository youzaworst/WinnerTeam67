import React, { useState } from 'react';

function SignUpScreen({ active, onNavigate, onSetUserName }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) {
      onSetUserName(formData.name.split(' ')[0]);
    }
    onNavigate('screen-struggles');
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
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            
            <button type="submit" className="btn btn-primary">
              Continue
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
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
