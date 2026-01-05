import React, { useState } from 'react';

function LoginScreen({ active, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        onNavigate('screen-dashboard'); // ✅ positive acknowledgement
      } else {
        setError('Invalid email or password'); // ❌ negative
      }
    } catch {
      setError('Unable to connect to server');
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" className="btn btn-primary">
              Sign In
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <a onClick={() => onNavigate('screen-signup')}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
