// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/api/users`,
  AUTH: `${API_BASE_URL}/api/auth`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
