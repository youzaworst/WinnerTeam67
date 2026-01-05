# FocusFlow - Complete Setup Guide

This guide will help you set up both the React frontend and Express backend with Airtable integration.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Airtable account with API key and base set up

## Step 1: Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install backend dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file should already exist with your Airtable credentials
   - If not, create `.env` file in the `server/` directory:
     ```
     AIRTABLE_API_KEY=patb3fPXQKPUBoVH6.be7485ea834ba7c14cb1e67a8a47b213b1479f22b0df3b5becb9200689213e21
     AIRTABLE_BASE_ID=app7NxnIqWJMvX63L
     AIRTABLE_TABLE_ID=tblvfB4S5vxFVyGAV
     PORT=3001
     ```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend API will be available at `http://localhost:3001`

## Step 2: Frontend Setup

1. Navigate back to the root directory:
```bash
cd ..
```

2. Install frontend dependencies (if not already done):
```bash
npm install
```

3. Configure frontend environment variables:
   - Create a `.env` file in the root directory:
     ```
     REACT_APP_API_URL=http://localhost:3001
     ```

4. Start the React development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Step 3: Running Both Servers

### Option 1: Run separately (recommended for development)

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm start
```

### Option 2: Run together (requires concurrently)

Install concurrently:
```bash
npm install --save-dev concurrently
```

Then run both:
```bash
npm run dev
```

## Airtable Table Structure

Ensure your Airtable table has the following fields:

| Field Name | Type | Description |
|------------|------|-------------|
| Username | Single line text | User's username |
| Password | Single line text | User's password |
| gmail_login | Email | User's email |
| current_xp_level | Number | Current XP level |
| amount_of_xp | Number | Total XP amount |
| Autism | Checkbox | Has autism |
| adhd | Checkbox | Has ADHD |
| dyslexia | Checkbox | Has dyslexia |
| epilepsy | Checkbox | Has epilepsy |

**Note:** The field names in Airtable may differ. Update the `FIELD_MAPPING` in `server/airtable.js` to match your actual Airtable field names.

## Testing the Integration

1. Start both servers (backend on port 3001, frontend on port 3000)

2. Test backend API directly:
```bash
# Health check
curl http://localhost:3001/api/health

# Create a user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass","gmail_login":"test@example.com"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

3. Test in the React app:
   - Open `http://localhost:3000`
   - Try signing up a new user
   - Try logging in with existing credentials
   - Complete a focus session to see XP update

## Troubleshooting

### Backend Issues

1. **Port already in use**: Change `PORT` in `server/.env`
2. **Airtable connection errors**: Verify API key and Base ID
3. **Field not found**: Check field names in `server/airtable.js`

### Frontend Issues

1. **CORS errors**: Ensure backend is running and `REACT_APP_API_URL` is correct
2. **API connection failed**: Check that backend is running on port 3001
3. **Environment variables not loading**: Restart the React dev server after creating `.env`

### Common Issues

- **Module not found**: Run `npm install` in both root and `server/` directories
- **Port conflicts**: Ensure ports 3000 and 3001 are available
- **Airtable rate limits**: Airtable has rate limits on free plans (5 requests/second)

## Project Structure

```
WinnerTeam67/
├── server/                 # Backend Express server
│   ├── server.js          # Main server file
│   ├── airtable.js        # Airtable integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Backend environment variables
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── services/         # API service functions
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript interfaces
│   └── config/           # Configuration files
├── public/               # Static assets
├── package.json          # Frontend dependencies
└── .env                  # Frontend environment variables
```

## Next Steps

- Add authentication tokens (JWT) for better security
- Implement streak tracking in Airtable
- Add more user preferences and settings
- Implement data persistence for tasks and progress
- Add error boundaries and better error handling

## Support

For issues or questions:
1. Check the console logs in both frontend and backend
2. Verify Airtable credentials and table structure
3. Ensure all environment variables are set correctly
