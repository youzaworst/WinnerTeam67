import { useState, useEffect, useCallback } from 'react';
import * as userService from '../services/userService';

/**
 * Custom hook for managing user data
 */
export function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await userService.getUserById(userId);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUserData = useCallback(async (updates) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateUser(userId, updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUserXP = useCallback(async (newXPAmount, newLevel) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateXP(userId, newXPAmount, newLevel);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    updateUser: updateUserData,
    updateXP: updateUserXP,
  };
}

/**
 * Custom hook for user authentication
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error parsing saved user:', err);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.loginUser(username, password);
      setCurrentUser(response.user);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const updateXP = useCallback(async (newXPAmount, newLevel) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateXP(
        currentUser.id,
        newXPAmount,
        newLevel
      );
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateUser = useCallback(async (updates) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateUser(currentUser.id, updates);
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  return {
    user: currentUser,
    loading,
    error,
    login,
    logout,
    updateXP,
    updateUser,
    isAuthenticated: !!currentUser,
  };
}
