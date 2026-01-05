const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  updateXP
} = require('./airtable');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FocusFlow API is running' });
});

// POST /api/users - Create new user
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    
    // Validate required fields
    if (!userData.username || !userData.password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await getUserByUsername(userData.username);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this username already exists' 
      });
    }

    // Set default values
    const newUser = {
      username: userData.username,
      password: userData.password,
      gmail_login: userData.gmail_login || '',
      current_xp_level: userData.current_xp_level || 1,
      amount_of_xp: userData.amount_of_xp || 0,
      has_autism: userData.has_autism || false,
      has_adhd: userData.has_adhd || false,
      has_dyslexia: userData.has_dyslexia || false,
      has_epilepsy: userData.has_epilepsy || false
    };

    const createdUser = await createUser(newUser);
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = createdUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.message && error.message.includes('Could not find')) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
  }
});

// GET /api/users/lookup?username= - Find user by username
app.get('/api/users/lookup', async (req, res) => {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: 'Username query parameter is required' });
    }

    const user = await getUserByUsername(username);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't send password in response
    const { password, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error looking up user:', error);
    res.status(500).json({ error: 'Failed to lookup user', details: error.message });
  }
});

// PUT /api/users/:id - Update user data
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Don't allow updating password through this endpoint
    // Use a separate endpoint for password updates if needed
    delete updates.password;
    
    const updatedUser = await updateUser(id, updates);
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.message && error.message.includes('Could not find')) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
  }
});

// POST /api/auth/login - Verify username and password
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    const user = await getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});

// POST /api/users/:id/xp - Update user XP
app.post('/api/users/:id/xp', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount_of_xp, current_xp_level } = req.body;
    
    if (amount_of_xp === undefined || current_xp_level === undefined) {
      return res.status(400).json({ 
        error: 'amount_of_xp and current_xp_level are required' 
      });
    }

    const updatedUser = await updateXP(id, amount_of_xp, current_xp_level);
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating XP:', error);
    if (error.message && error.message.includes('Could not find')) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to update XP', details: error.message });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`FocusFlow API server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
