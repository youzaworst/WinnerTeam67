const Airtable = require('airtable');
require('dotenv').config();

// Initialize Airtable base
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

const TABLE_NAME = process.env.AIRTABLE_TABLE_ID;

/**
 * Map Airtable field names to our schema
 * Note: Adjust these mappings based on your actual Airtable field names
 */
const FIELD_MAPPING = {
  // Our schema -> Airtable field names
  username: 'Username',
  password: 'Password',
  gmail_login: 'gmail_login',
  current_xp_level: 'current_xp_level',
  amount_of_xp: 'amount_of_xp',
  has_autism: 'Autism',
  has_adhd: 'adhd',
  has_dyslexia: 'dyslexia',
  has_epilepsy: 'epilepsy'
};

/**
 * Convert Airtable record to User object
 */
function recordToUser(record) {
  return {
    id: record.id,
    username: record.get(FIELD_MAPPING.username) || '',
    password: record.get(FIELD_MAPPING.password) || '',
    gmail_login: record.get(FIELD_MAPPING.gmail_login) || '',
    current_xp_level: record.get(FIELD_MAPPING.current_xp_level) || 0,
    amount_of_xp: record.get(FIELD_MAPPING.amount_of_xp) || 0,
    has_autism: record.get(FIELD_MAPPING.has_autism) === true,
    has_adhd: record.get(FIELD_MAPPING.has_adhd) === true,
    has_dyslexia: record.get(FIELD_MAPPING.has_dyslexia) === true,
    has_epilepsy: record.get(FIELD_MAPPING.has_epilepsy) === true
  };
}

/**
 * Convert User object to Airtable fields
 */
function userToFields(user) {
  const fields = {};
  
  if (user.username !== undefined) fields[FIELD_MAPPING.username] = user.username;
  if (user.password !== undefined) fields[FIELD_MAPPING.password] = user.password;
  if (user.gmail_login !== undefined) fields[FIELD_MAPPING.gmail_login] = user.gmail_login;
  if (user.current_xp_level !== undefined) fields[FIELD_MAPPING.current_xp_level] = user.current_xp_level;
  if (user.amount_of_xp !== undefined) fields[FIELD_MAPPING.amount_of_xp] = user.amount_of_xp;
  if (user.has_autism !== undefined) fields[FIELD_MAPPING.has_autism] = user.has_autism;
  if (user.has_adhd !== undefined) fields[FIELD_MAPPING.has_adhd] = user.has_adhd;
  if (user.has_dyslexia !== undefined) fields[FIELD_MAPPING.has_dyslexia] = user.has_dyslexia;
  if (user.has_epilepsy !== undefined) fields[FIELD_MAPPING.has_epilepsy] = user.has_epilepsy;
  
  return fields;
}

/**
 * Create a new user in Airtable
 */
async function createUser(userData) {
  try {
    const fields = userToFields(userData);
    const record = await base(TABLE_NAME).create(fields);
    return recordToUser(record);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Get user by Airtable record ID
 */
async function getUserById(id) {
  try {
    const record = await base(TABLE_NAME).find(id);
    return recordToUser(record);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

/**
 * Find user by username
 */
async function getUserByUsername(username) {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{${FIELD_MAPPING.username}} = '${username}'`,
        maxRecords: 1
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    return recordToUser(records[0]);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
}

/**
 * Update user by ID
 */
async function updateUser(id, updates) {
  try {
    const fields = userToFields(updates);
    const record = await base(TABLE_NAME).update(id, fields);
    return recordToUser(record);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Update user XP
 */
async function updateXP(id, newXPAmount, newLevel) {
  try {
    const fields = {
      [FIELD_MAPPING.amount_of_xp]: newXPAmount,
      [FIELD_MAPPING.current_xp_level]: newLevel
    };
    const record = await base(TABLE_NAME).update(id, fields);
    return recordToUser(record);
  } catch (error) {
    console.error('Error updating XP:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  updateXP
};
