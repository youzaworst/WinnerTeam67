import React from 'react';

function LibraryScreen({ active, onNavigate, streak, totalXP }) {
  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐', chapters: 15, completed: 7, progress: 45 },
    { id: 'science', name: 'Science', icon: '🔬', chapters: 14, completed: 8, progress: 60 },
    { id: 'english', name: 'English', icon: '📝', chapters: 12, completed: 9, progress: 75 },
    { id: 'social', name: 'Social Studies', icon: '🌍', chapters: 10, completed: 3, progress: 30 },
    { id: 'hindi', name: 'Hindi', icon: '🇮🇳', chapters: 10, completed: 5, progress: 50 }
  ];

  const handleSubjectClick = (subjectId) => {
    alert(`Opening ${subjectId} chapters... (In MVP, this would navigate to chapter list)`);
  };

  return (
    <div id="screen-library" className={`screen ${active ? 'active' : ''}`}>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="header-logo">
              <div className="header-logo-icon">🎯</div>
              <span className="header-logo-text">FocusFlow</span>
            </div>
            <nav className="header-nav">
              <div className="nav-item" onClick={() => onNavigate('screen-dashboard')}>Dashboard</div>
              <div className="nav-item active">Library</div>
              <div className="nav-item" onClick={() => onNavigate('screen-focus')}>Focus</div>
            </nav>
          </div>
          <div className="header-right">
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <span className="stat-value">{streak}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⚡</span>
                <span className="stat-value">{totalXP.toLocaleString()}</span>
                <span className="stat-label">XP</span>
              </div>
            </div>
            <div className="avatar">A</div>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="library-header">
            <h1>Study Library 📚</h1>
            <p>Access your subjects, chapters, and resources</p>
            <div className="library-search">
              <div className="search-input-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="Search chapters, topics, resources..." />
              </div>
              <button className="filter-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
                </svg>
                Filter
              </button>
            </div>
          </div>
          
          <div className="subject-grid">
            {subjects.map(subject => (
              <div 
                key={subject.id}
                className="subject-card" 
                onClick={() => handleSubjectClick(subject.id)}
              >
                <div className="subject-header">
                  <div className={`subject-icon ${subject.id}`}>{subject.icon}</div>
                  <div>
                    <div className="subject-name">{subject.name}</div>
                    <div className="subject-chapters">{subject.chapters} Chapters</div>
                  </div>
                </div>
                <div className="subject-progress">
                  <div className="subject-progress-fill" style={{width: `${subject.progress}%`}}></div>
                </div>
                <div className="subject-stats">
                  <span>{subject.progress}% Complete</span>
                  <span>{subject.completed}/{subject.chapters} Chapters</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryScreen;
