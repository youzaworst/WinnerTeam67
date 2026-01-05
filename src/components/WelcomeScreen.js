import React from 'react';

function WelcomeScreen({ active, onNavigate }) {
  return (
    <div id="screen-welcome" className={`screen ${active ? 'active' : ''}`}>
      <div className="onboarding">
        <div className="onboarding-container">
          <div className="logo">
            <div className="logo-icon">🎯</div>
            <span className="logo-text">FocusFlow</span>
          </div>
          <h1>Study Your Way</h1>
          <p>A learning platform designed for how your brain actually works. Built for students with ADHD, dyslexia, autism, and anxiety.</p>
          
          <button className="btn btn-primary" onClick={() => onNavigate('screen-signup')}>
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div className="auth-switch">
            Already have an account? <a onClick={() => onNavigate('screen-login')}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
