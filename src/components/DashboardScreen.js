import React, { useState } from 'react';

function DashboardScreen({ 
  active, 
  onNavigate, 
  user,
  dyslexiaMode,
  visualScheduleMode,
  readAloudMode,
  onToggleDyslexia,
  onToggleVisualSchedule,
  onToggleReadAloud
}) {
  const userName = user?.username || 'User';
  const streak = 0; // TODO: Add streak tracking to Airtable
  const totalXP = user?.amount_of_xp || 0;
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review Chapter 3: Quadratic Equations', tag: 'Math', duration: '25 min', completed: true },
    { id: 2, title: 'Practice problems: Photosynthesis', tag: 'Science', duration: '20 min', completed: false },
    { id: 3, title: 'Read Essay: The Indian Constitution', tag: 'Social', duration: '30 min', completed: false },
    { id: 4, title: 'Grammar exercises: Tenses', tag: 'English', duration: '15 min', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div id="screen-dashboard" className={`screen ${active ? 'active' : ''}`}>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="header-logo">
              <div className="header-logo-icon">🎯</div>
              <span className="header-logo-text">FocusFlow</span>
            </div>
            <nav className="header-nav">
              <div className="nav-item active">Dashboard</div>
              <div className="nav-item" onClick={() => onNavigate('screen-library')}>Library</div>
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
            <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="greeting">
            <h1>Good morning, {userName}! 👋</h1>
            <p>You have {remainingCount} tasks planned for today. Let's make progress!</p>
          </div>
          
          <div className={`dashboard-grid ${visualScheduleMode ? 'visual-schedule-mode' : ''}`}>
            <div className="main-content">
              <div className="card focus-card">
                <h3>Ready to Focus?</h3>
                <p>Start a timed study session with your micro-tasks</p>
                <button className="start-focus-btn" onClick={() => onNavigate('screen-focus')}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Start Focus Session
                </button>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">Today's Plan</h3>
                    <p className="card-subtitle">{remainingCount} of {tasks.length} tasks remaining</p>
                  </div>
                  <span className="card-action">+ Add Task</span>
                </div>
                <div className={`task-list ${visualScheduleMode ? 'visual-schedule-mode' : ''}`}>
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="task-checkbox">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div className="task-content">
                        <div className="task-title">{task.title}</div>
                        <div className="task-meta">
                          <span className="task-tag">{task.tag}</span>
                          <span className="task-duration">⏱ {task.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card progress-card">
                <div className="card-header">
                  <h3 className="card-title">Weekly Progress</h3>
                  <span className="card-action">View Details</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: '68%'}}></div>
                </div>
                <div className="progress-stats">
                  <div className="progress-stat">
                    <div className="progress-stat-value">12</div>
                    <div className="progress-stat-label">Sessions</div>
                  </div>
                  <div className="progress-stat">
                    <div className="progress-stat-value">4.5h</div>
                    <div className="progress-stat-label">Focus Time</div>
                  </div>
                  <div className="progress-stat">
                    <div className="progress-stat-value">24</div>
                    <div className="progress-stat-label">Tasks Done</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sidebar">
              <div className="card streak-card">
                <div className="streak-icon">🔥</div>
                <div className="streak-count">{streak}</div>
                <div className="streak-label">Day Streak</div>
                <div className="streak-message">Keep it up! You're on fire!</div>
              </div>
              
              <div className="card">
                <h3 className="card-title" style={{marginBottom: '16px'}}>Quick Access</h3>
                <div className="quick-access">
                  <div className="quick-item" onClick={() => onNavigate('screen-library')}>
                    <div className="quick-item-icon">📚</div>
                    <div className="quick-item-label">Library</div>
                  </div>
                  <div className="quick-item">
                    <div className="quick-item-icon">🎴</div>
                    <div className="quick-item-label">Flashcards</div>
                  </div>
                  <div className="quick-item">
                    <div className="quick-item-icon">📝</div>
                    <div className="quick-item-label">Notes</div>
                  </div>
                  <div className="quick-item">
                    <div className="quick-item-icon">❓</div>
                    <div className="quick-item-label">Quiz</div>
                  </div>
                </div>
              </div>
              
              <div className="card accessibility-card">
                <h3 className="card-title" style={{marginBottom: '16px'}}>Learning Modes</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-icon">📖</span>
                      <span className="toggle-label">Dyslexia-Friendly</span>
                    </div>
                    <div 
                      className={`toggle-switch ${dyslexiaMode ? 'active' : ''}`}
                      onClick={onToggleDyslexia}
                    ></div>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-icon">📅</span>
                      <span className="toggle-label">Visual Schedule</span>
                    </div>
                    <div 
                      className={`toggle-switch ${visualScheduleMode ? 'active' : ''}`}
                      onClick={onToggleVisualSchedule}
                    ></div>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-icon">🔊</span>
                      <span className="toggle-label">Read Aloud</span>
                    </div>
                    <div 
                      className={`toggle-switch ${readAloudMode ? 'active' : ''}`}
                      onClick={onToggleReadAloud}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
