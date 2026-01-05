import React from 'react';

function RewardScreen({ active, onClose, onStartNew }) {
  if (!active) return null;

  return (
    <div id="reward-screen" className={`reward-screen ${active ? 'active' : ''}`}>
      <div className="reward-content">
        <div className="reward-emoji">🎉</div>
        <h1 className="reward-title">Session Complete!</h1>
        <p className="reward-message">Amazing work! You stayed focused for 25 minutes.</p>
        
        <div className="reward-stats">
          <div className="reward-stat">
            <div className="reward-stat-value">+50</div>
            <div className="reward-stat-label">XP Earned</div>
          </div>
          <div className="reward-stat">
            <div className="reward-stat-value">3/3</div>
            <div className="reward-stat-label">Tasks Done</div>
          </div>
        </div>
        
        <div className="reward-badge">
          <span className="reward-badge-icon">🏆</span>
          <div className="reward-badge-text">
            <div className="reward-badge-title">Focus Champion</div>
            <div className="reward-badge-desc">Complete 5 focus sessions</div>
          </div>
        </div>
        
        <div className="reward-buttons">
          <button className="btn btn-secondary" onClick={onClose}>Take a Break</button>
          <button className="btn btn-primary" onClick={onStartNew}>Start Another Session</button>
        </div>
      </div>
    </div>
  );
}

export default RewardScreen;
