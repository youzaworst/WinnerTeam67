/**
 * User interface matching the Airtable schema
 */
export interface User {
  id: string;
  username: string;
  password?: string; // Optional in responses (never sent from API)
  gmail_login: string;
  current_xp_level: number;
  amount_of_xp: number;
  has_autism: boolean;
  has_adhd: boolean;
  has_dyslexia: boolean;
  has_epilepsy: boolean;
}

/**
 * User data for creating a new user
 */
export interface CreateUserData {
  username: string;
  password: string;
  gmail_login?: string;
  current_xp_level?: number;
  amount_of_xp?: number;
  has_autism?: boolean;
  has_adhd?: boolean;
  has_dyslexia?: boolean;
  has_epilepsy?: boolean;
}

/**
 * User data for updating an existing user
 */
export interface UpdateUserData {
  gmail_login?: string;
  current_xp_level?: number;
  amount_of_xp?: number;
  has_autism?: boolean;
  has_adhd?: boolean;
  has_dyslexia?: boolean;
  has_epilepsy?: boolean;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  success: boolean;
  user: User;
}

/**
 * XP update data
 */
export interface XPUpdateData {
  amount_of_xp: number;
  current_xp_level: number;
}
