const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const base = new Airtable({
  apiKey: 'PASTE_YOUR_AIRTABLE_API_KEY_HERE'
}).base('app7NxnIqWJMvX63L');

const TABLE = 'tblvfB4S5vxFVyGAV';

/* ===================== LOGIN ===================== */
async function loginUser(username, password) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `{Username} = '${username}'`,
      maxRecords: 1
    })
    .firstPage();

  if (records.length === 0) return false;
  return records[0].get('Password') === password;
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const success = await loginUser(username, password);
  res.json({ success });
});

/* ===================== SIGNUP ===================== */
async function createUser(userData) {
  // check if username exists
  const existing = await base(TABLE)
    .select({
      filterByFormula: `{Username} = '${userData.username}'`,
      maxRecords: 1
    })
    .firstPage();

  if (existing.length > 0) {
    throw new Error('Username already exists');
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
    username: created[0].get('Username')
  };
}

app.post('/signup', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ===================== START SERVER ===================== */
app.listen(3001, () =>
  console.log('Backend running on http://localhost:3001')
);
