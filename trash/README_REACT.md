# FocusFlow React Application

This is the React version of the FocusFlow application, converted from the original HTML file.

## Features

All features from the original HTML application have been preserved:

- ✅ **Onboarding Flow**: Welcome, Sign Up, Login, Struggles selection, Board selection
- ✅ **Dashboard**: Task management, progress tracking, streak counter, XP system
- ✅ **Study Library**: Subject cards with progress tracking
- ✅ **Focus Session**: Pomodoro timer with presets (25/5, 45/10, 50/15)
- ✅ **Micro Tasks**: Add and complete tasks during focus sessions
- ✅ **Reward Screen**: Celebration screen after completing focus sessions
- ✅ **Accessibility Features**: Dyslexia mode, Visual schedule mode, Read aloud toggle
- ✅ **Responsive Design**: Mobile-friendly layout

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── App.js                 # Main app component with state management
├── index.js               # React entry point
├── index.css              # All styles (converted from HTML)
└── components/
    ├── WelcomeScreen.js   # Welcome/landing screen
    ├── SignUpScreen.js    # User registration
    ├── LoginScreen.js     # User login
    ├── StrugglesScreen.js # Onboarding: select struggles
    ├── BoardScreen.js     # Onboarding: select board/grade/subjects
    ├── DashboardScreen.js # Main dashboard with tasks
    ├── LibraryScreen.js   # Study library with subjects
    ├── FocusScreen.js     # Pomodoro timer and micro tasks
    └── RewardScreen.js    # Completion celebration screen
```

## Key React Conversions

### State Management
- All global state moved to `App.js` using `useState`
- Component-specific state managed locally with hooks
- Timer state managed with `useState` and `useEffect`

### Navigation
- Screen switching handled via props and state in `App.js`
- No DOM manipulation - pure React state updates

### Timer Functionality
- Converted to React hooks (`useState`, `useEffect`, `useRef`)
- Proper cleanup of intervals on unmount
- Progress calculation for circular timer display

### Forms
- Controlled components with React state
- Form validation preserved
- User name extraction and state updates

### Interactive Features
- Task toggling with state updates
- Checklist selections with array state
- Toggle switches for accessibility features
- Micro task management with dynamic list

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Notes

- All CSS has been preserved exactly as in the original HTML file
- All animations and transitions work identically
- The app maintains the same visual design and user experience
- All interactive features are fully functional
