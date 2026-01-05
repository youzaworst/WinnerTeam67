import React, { useState, useEffect } from 'react';
import './index.css';
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import StrugglesScreen from './components/StrugglesScreen';
import BoardScreen from './components/BoardScreen';
import DashboardScreen from './components/DashboardScreen';
import LibraryScreen from './components/LibraryScreen';
import FocusScreen from './components/FocusScreen';
import RewardScreen from './components/RewardScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('screen-welcome');
  const [userName, setUserName] = useState('Alex');
  const [streak, setStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(1250);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [visualScheduleMode, setVisualScheduleMode] = useState(false);
  const [readAloudMode, setReadAloudMode] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [startBreakTimer, setStartBreakTimer] = useState(false);

  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [dyslexiaMode]);

  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  return (
    <div className="App">
      <div className="bg-mesh"></div>
      
      <WelcomeScreen 
        active={currentScreen === 'screen-welcome'} 
        onNavigate={showScreen} 
      />
      
      <SignUpScreen 
        active={currentScreen === 'screen-signup'} 
        onNavigate={showScreen}
        onSetUserName={setUserName}
      />
      
      <LoginScreen 
        active={currentScreen === 'screen-login'} 
        onNavigate={showScreen} 
      />
      
      <StrugglesScreen 
        active={currentScreen === 'screen-struggles'} 
        onNavigate={showScreen} 
      />
      
      <BoardScreen 
        active={currentScreen === 'screen-board'} 
        onNavigate={showScreen}
        onSetUserName={setUserName}
      />
      
      <DashboardScreen 
        active={currentScreen === 'screen-dashboard'} 
        onNavigate={showScreen}
        userName={userName}
        streak={streak}
        totalXP={totalXP}
        dyslexiaMode={dyslexiaMode}
        visualScheduleMode={visualScheduleMode}
        readAloudMode={readAloudMode}
        onToggleDyslexia={() => setDyslexiaMode(!dyslexiaMode)}
        onToggleVisualSchedule={() => setVisualScheduleMode(!visualScheduleMode)}
        onToggleReadAloud={() => setReadAloudMode(!readAloudMode)}
      />
      
      <LibraryScreen 
        active={currentScreen === 'screen-library'} 
        onNavigate={showScreen}
        streak={streak}
        totalXP={totalXP}
      />
      
      <FocusScreen 
        active={currentScreen === 'screen-focus'} 
        onNavigate={showScreen}
        onCompleteSession={() => {
          setTotalXP(prev => prev + 50);
          setShowReward(true);
        }}
        startBreakTimer={startBreakTimer}
        onBreakTimerStarted={() => setStartBreakTimer(false)}
      />
      
      <RewardScreen 
        active={showReward}
        onClose={() => {
          setShowReward(false);
          setStartBreakTimer(true);
          showScreen('screen-focus');
        }}
        onStartNew={() => {
          setShowReward(false);
          showScreen('screen-focus');
        }}
      />
    </div>
  );
}

export default App;
