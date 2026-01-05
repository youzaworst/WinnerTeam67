import React, { useState } from 'react';

function BoardScreen({ active, onNavigate, onSetUserName }) {
  const [selectedBoard, setSelectedBoard] = useState('cbse');
  const [grade, setGrade] = useState('Grade 9');
  const [selectedSubjects, setSelectedSubjects] = useState(['Mathematics', 'Science', 'English']);

  const boards = [
    { id: 'cbse', icon: '🇮🇳', title: 'CBSE', desc: 'Central Board' },
    { id: 'igcse', icon: '🌍', title: 'IGCSE', desc: 'International' },
    { id: 'icse', icon: '📚', title: 'ICSE', desc: 'Indian Certificate' },
    { id: 'state', icon: '🏫', title: 'State Board', desc: 'Regional' }
  ];

  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

  const toggleSubject = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleComplete = () => {
    onNavigate('screen-dashboard');
  };

  return (
    <div id="screen-board" className={`screen ${active ? 'active' : ''}`}>
      <div className="onboarding">
        <div className="onboarding-container">
          <div className="progress-steps">
            <div className="progress-step completed"></div>
            <div className="progress-step completed"></div>
            <div className="progress-step active"></div>
          </div>
          
          <h1>Your Curriculum</h1>
          <p>Select your board and grade so we can show relevant content.</p>
          
          <div className="board-grid">
            {boards.map(board => (
              <div 
                key={board.id}
                className={`board-option ${selectedBoard === board.id ? 'selected' : ''}`}
                onClick={() => setSelectedBoard(board.id)}
              >
                <div className="board-option-icon">{board.icon}</div>
                <div className="board-option-title">{board.title}</div>
                <div className="board-option-desc">{board.desc}</div>
              </div>
            ))}
          </div>
          
          <div className="form-group">
            <label>Grade</label>
            <div className="select-wrapper">
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Subjects (select all that apply)</label>
            <div className="subject-pills">
              {subjects.map(subject => (
                <span 
                  key={subject}
                  className={`subject-pill ${selectedSubjects.includes(subject) ? 'selected' : ''}`}
                  onClick={() => toggleSubject(subject)}
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={handleComplete}>
            Start Learning
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardScreen;
