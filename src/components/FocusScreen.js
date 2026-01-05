import React, { useState, useEffect, useRef } from 'react';

function FocusScreen({ active, onNavigate, onCompleteSession, startBreakTimer, onBreakTimerStarted }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState(25);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const [activePreset, setActivePreset] = useState('25/5');
  const [microTasks, setMicroTasks] = useState([
    { id: 1, text: 'Read pages 45-50', completed: false },
    { id: 2, text: 'Solve 5 practice problems', completed: false },
    { id: 3, text: 'Review key formulas', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  
  const timerIntervalRef = useRef(null);
  const timerCircleRef = useRef(null);

  const updateTimerDisplay = () => {
    const totalSeconds = isBreak ? breakMinutes * 60 : focusMinutes * 60;
    const remainingSeconds = currentMinutes * 60 + currentSeconds;
    const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    
    if (timerCircleRef.current) {
      timerCircleRef.current.style.setProperty('--progress', progress + '%');
    }
  };

  const handleTimerComplete = () => {
    setTimerRunning(false);
    if (!isBreak) {
      onCompleteSession();
    } else {
      setIsBreak(false);
      setCurrentMinutes(focusMinutes);
      setCurrentSeconds(0);
    }
  };

  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev === 0) {
            setCurrentMinutes(prevMin => {
              if (prevMin === 0) {
                handleTimerComplete();
                return 0;
              }
              return prevMin - 1;
            });
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning, isBreak, focusMinutes, breakMinutes]);

  useEffect(() => {
    updateTimerDisplay();
  }, [currentMinutes, currentSeconds, isBreak, focusMinutes, breakMinutes]);

  useEffect(() => {
    if (startBreakTimer) {
      setIsBreak(true);
      setCurrentMinutes(breakMinutes);
      setCurrentSeconds(0);
      setTimerRunning(true);
      onBreakTimerStarted();
    }
  }, [startBreakTimer, breakMinutes, onBreakTimerStarted]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setIsBreak(false);
    setCurrentMinutes(focusMinutes);
    setCurrentSeconds(0);
  };

  const skipTimer = () => {
    handleTimerComplete();
  };

  const setPreset = (focus, breakTime, presetName) => {
    setFocusMinutes(focus);
    setBreakMinutes(breakTime);
    setActivePreset(presetName);
    setCurrentMinutes(focus);
    setCurrentSeconds(0);
    setIsBreak(false);
    setTimerRunning(false);
  };

  const toggleMicroTask = (id) => {
    setMicroTasks(tasks => 
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addMicroTask = () => {
    if (newTaskText.trim()) {
      setMicroTasks(tasks => [
        ...tasks,
        { id: Date.now(), text: newTaskText.trim(), completed: false }
      ]);
      setNewTaskText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMicroTask();
    }
  };

  const timeStr = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
  const timerLabel = isBreak ? 'Break Time' : 'Focus Time';

  return (
    <div id="screen-focus" className={`screen ${active ? 'active' : ''}`}>
      <div className="focus-session">
        <button className="exit-focus" onClick={() => onNavigate('screen-dashboard')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Exit
        </button>
        
        <div className="focus-container">
          <div className="focus-header">
            <h1>Focus Session 🎯</h1>
            <p>Stay focused, take breaks, earn rewards</p>
          </div>
          
          <div className="timer-display">
            <div className="timer-circle" ref={timerCircleRef}>
              <div className="timer-time">{timeStr}</div>
              <div className="timer-label">{timerLabel}</div>
            </div>
            
            <div className="timer-presets">
              <button 
                className={`preset-btn ${activePreset === '25/5' ? 'active' : ''}`}
                onClick={() => setPreset(25, 5, '25/5')}
              >
                25/5
              </button>
              <button 
                className={`preset-btn ${activePreset === '45/10' ? 'active' : ''}`}
                onClick={() => setPreset(45, 10, '45/10')}
              >
                45/10
              </button>
              <button 
                className={`preset-btn ${activePreset === '50/15' ? 'active' : ''}`}
                onClick={() => setPreset(50, 15, '50/15')}
              >
                50/15
              </button>
            </div>
            
            <div className="timer-controls">
              <button className="timer-btn secondary" onClick={resetTimer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
              <button className="timer-btn play" onClick={toggleTimer}>
                {timerRunning ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              <button className="timer-btn secondary" onClick={skipTimer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,4 15,12 5,20"/>
                  <line x1="19" y1="5" x2="19" y2="19"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="micro-tasks">
            <h3>📋 Session Tasks</h3>
            <div className="micro-task-list">
              {microTasks.map(task => (
                <div 
                  key={task.id}
                  className={`micro-task ${task.completed ? 'completed' : ''}`}
                  onClick={() => toggleMicroTask(task.id)}
                >
                  <div className="micro-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="12" height="12">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span>{task.text}</span>
                </div>
              ))}
            </div>
            <div className="add-task-input">
              <input 
                type="text" 
                placeholder="Add a micro-task..." 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="add-task-btn" onClick={addMicroTask}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusScreen;
