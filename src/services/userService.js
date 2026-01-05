import { API_ENDPOINTS } from '../config/api';

/**
 * Create a new user
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} Created user object (without password)
 */
export async function createUser(userData) {
  try {
    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Get user by Airtable record ID
 * @param {string} id - Airtable record ID
 * @returns {Promise<Object>} User object (without password)
 */
export async function getUserById(id) {
  try {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

/**
 * Find user by username
 * @param {string} username - Username to search for
 * @returns {Promise<Object|null>} User object (without password) or null if not found
 */
export async function getUserByUsername(username) {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.USERS}/lookup?username=${encodeURIComponent(username)}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to lookup user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error looking up user:', error);
    throw error;
  }
}

/**
 * Update user data
 * @param {string} id - Airtable record ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user object (without password)
 */
export async function updateUser(id, updates) {
  try {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Login user with username and password
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<Object>} Login response with user data
 */
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_ENDPOINTS.AUTH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

/**
 * Update user XP and level
 * @param {string} id - Airtable record ID
 * @param {number} newXPAmount - New XP amount
 * @param {number} newLevel - New XP level
 * @returns {Promise<Object>} Updated user object (without password)
 */
export async function updateXP(id, newXPAmount, newLevel) {
  try {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}/xp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount_of_xp: newXPAmount,
        current_xp_level: newLevel,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update XP');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating XP:', error);
    throw error;
  }
}
