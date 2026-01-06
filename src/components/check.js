const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// =====================
// Airtable configuration
// =====================
const base = new Airtable({
  apiKey: 'PASTE_YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN_HERE'
}).base('app7NxnIqWJMvX63L');

const TABLE = 'tblvfB4S5vxFVyGAV';

// =====================
// LOGIN — CHECK EMAIL ONLY
// =====================
async function loginUserByEmail(email) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `{gmail_login} = '${email}'`,
      maxRecords: 1
    })
    .firstPage();

  // ✅ true if email exists in DB
  return records.length > 0;
}

app.post('/login', async (req, res) => {
  const { username } = req.body; // frontend sends email as "username"

  try {
    const success = await loginUserByEmail(username);
    res.json({ success });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false });
  }
});

// =====================
// SIGNUP
// =====================
async function createUser(userData) {
  // Check if email already exists
  const existing = await base(TABLE)
    .select({
      filterByFormula: `{gmail_login} = '${userData.gmail_login}'`,
      maxRecords: 1
    })
    .firstPage();

  if (existing.length > 0) {
    throw new Error('Email already exists');
  }

  const created = await base(TABLE).create([
    {
      fields: {
        Username: userData.username,
        Password: userData.password,
        gmail_login: userData.gmail_login,
        Level: userData.current_xp_level,
        hours: userData.amount_of_xp,
        Autism: userData.has_autism,
        adhd: userData.has_adhd,
        dyslexia: userData.has_dyslexia,
        epilepsy: userData.has_epilepsy,
        streak: 0,
        'tasks done': 0
      }
    }
  ]);

  return {
    username: created[0].get('Username'),
    gmail_login: created[0].get('gmail_login')
  };
}

app.post('/signup', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ message: err.message });
  }
});

// =====================
// START SERVER
// =====================
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
