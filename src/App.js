import React, { useState, useEffect } from 'react';
import './index.css';
import { useAuth } from './hooks/useUser';
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
  const [currentUserId, setCurrentUserId] = useState(null);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [visualScheduleMode, setVisualScheduleMode] = useState(false);
  const [readAloudMode, setReadAloudMode] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [startBreakTimer, setStartBreakTimer] = useState(false);
  
  const { user, login, updateXP, updateUser } = useAuth();

  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [dyslexiaMode]);

  useEffect(() => {
    // Sync dyslexia mode with user preferences
    if (user && user.has_dyslexia !== undefined) {
      setDyslexiaMode(user.has_dyslexia);
    }
  }, [user]);

  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  const handleUserCreated = (createdUser) => {
    setCurrentUserId(createdUser.id);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUserId(userData.id);
  };

  const handleCompleteSession = async () => {
    if (user) {
      const newXP = (user.amount_of_xp || 0) + 50;
      const newLevel = Math.floor(newXP / 100) + 1; // Simple level calculation
      try {
        await updateXP(newXP, newLevel);
      } catch (err) {
        console.error('Error updating XP:', err);
      }
    }
    setShowReward(true);
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
        onSetUserName={(name) => {}}
        onUserCreated={handleUserCreated}
      />
      
      <LoginScreen 
        active={currentScreen === 'screen-login'} 
        onNavigate={showScreen}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <StrugglesScreen 
        active={currentScreen === 'screen-struggles'} 
        onNavigate={showScreen}
        currentUserId={currentUserId}
        onUpdateUser={updateUser}
      />
      
      <BoardScreen 
        active={currentScreen === 'screen-board'} 
        onNavigate={showScreen}
        onSetUserName={(name) => {}}
      />
      
      <DashboardScreen 
        active={currentScreen === 'screen-dashboard'} 
        onNavigate={showScreen}
        user={user}
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
        user={user}
      />
      
      <FocusScreen 
        active={currentScreen === 'screen-focus'} 
        onNavigate={showScreen}
        onCompleteSession={handleCompleteSession}
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
