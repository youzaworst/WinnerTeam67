import React, { useState } from 'react';

function StrugglesScreen({ active, onNavigate, currentUserId, onUpdateUser }) {
  const [selectedStruggles, setSelectedStruggles] = useState([]);
  const [loading, setLoading] = useState(false);

  const struggles = [
    { id: 'adhd', title: 'Focus & Attention (ADHD)', desc: 'Difficulty concentrating, easily distracted', icon: '🧠' },
    { id: 'dyslexia', title: 'Reading & Processing (Dyslexia)', desc: 'Challenges with reading, text processing', icon: '📖' },
    { id: 'autism', title: 'Routine & Predictability (Autism)', desc: 'Need for structure, overwhelm with changes', icon: '📅' },
    { id: 'anxiety', title: 'Anxiety & Stress', desc: 'Test anxiety, performance pressure', icon: '💭' },
    { id: 'memory', title: 'Memory & Recall', desc: 'Trouble remembering information', icon: '🔄' }
  ];

  const toggleStruggle = (id) => {
    setSelectedStruggles(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (currentUserId && onUpdateUser) {
      setLoading(true);
      try {
        await onUpdateUser({
          has_adhd: selectedStruggles.includes('adhd'),
          has_dyslexia: selectedStruggles.includes('dyslexia'),
          has_autism: selectedStruggles.includes('autism'),
          has_epilepsy: selectedStruggles.includes('epilepsy')
        });
      } catch (err) {
        console.error('Error updating user struggles:', err);
      } finally {
        setLoading(false);
      }
    }
    onNavigate('screen-board');
  };

  return (
    <div id="screen-struggles" className={`screen ${active ? 'active' : ''}`}>
      <div className="onboarding">
        <div className="onboarding-container">
          <div className="progress-steps">
            <div className="progress-step completed"></div>
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
          </div>
          
          <h1>How Can We Help?</h1>
          <p>Select what you struggle with. We'll customize your experience accordingly.</p>
          
          <div className="checklist">
            {struggles.map(struggle => (
              <div 
                key={struggle.id}
                className={`checklist-item ${selectedStruggles.includes(struggle.id) ? 'selected' : ''}`}
                onClick={() => toggleStruggle(struggle.id)}
              >
                <div className="checklist-checkbox">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">{struggle.title}</div>
                  <div className="checklist-desc">{struggle.desc}</div>
                </div>
                <span className="checklist-icon">{struggle.icon}</span>
              </div>
            ))}
          </div>
          
          <button className="btn btn-primary" onClick={handleContinue} disabled={loading}>
            {loading ? 'Saving...' : 'Continue'}
            {!loading && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
          
          <button className="btn btn-ghost" onClick={() => onNavigate('screen-board')} disabled={loading}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

export default StrugglesScreen;
