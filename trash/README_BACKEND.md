# FocusFlow Backend API

Express.js backend server that connects the React frontend to Airtable database.

## Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (if not already created)
   - Update the `.env` file with your Airtable credentials:
     ```
     AIRTABLE_API_KEY=your_api_key_here
     AIRTABLE_BASE_ID=your_base_id_here
     AIRTABLE_TABLE_ID=your_table_id_here
     PORT=3001
     ```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3001` (or the PORT specified in .env)

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server status

### User Management

- **POST** `/api/users`
  - Create a new user
  - Body: `{ username, password, gmail_login?, current_xp_level?, amount_of_xp?, has_autism?, has_adhd?, has_dyslexia?, has_epilepsy? }`
  - Returns: User object (without password)

- **GET** `/api/users/:id`
  - Get user by Airtable record ID
  - Returns: User object (without password)

- **GET** `/api/users/lookup?username=`
  - Find user by username
  - Query params: `username` (required)
  - Returns: User object (without password) or 404 if not found

- **PUT** `/api/users/:id`
  - Update user data
  - Body: `{ gmail_login?, current_xp_level?, amount_of_xp?, has_autism?, has_adhd?, has_dyslexia?, has_epilepsy? }`
  - Note: Password cannot be updated through this endpoint
  - Returns: Updated user object (without password)

- **POST** `/api/users/:id/xp`
  - Update user XP and level
  - Body: `{ amount_of_xp, current_xp_level }`
  - Returns: Updated user object (without password)

### Authentication

- **POST** `/api/auth/login`
  - Verify username and password
  - Body: `{ username, password }`
  - Returns: `{ success: true, user: {...} }` or error

## Airtable Field Mapping

The backend maps between our schema and Airtable field names:

| Our Schema | Airtable Field |
|------------|----------------|
| username | Username |
| password | Password |
| gmail_login | gmail_login |
| current_xp_level | current_xp_level |
| amount_of_xp | amount_of_xp |
| has_autism | Autism |
| has_adhd | adhd |
| has_dyslexia | dyslexia |
| has_epilepsy | epilepsy |

**Note:** Adjust the `FIELD_MAPPING` in `server/airtable.js` if your Airtable field names differ.

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `409` - Conflict (user already exists)
- `500` - Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "details": "Additional error details (in development)"
}
```

## Security Notes

- Passwords are never returned in API responses
- CORS is enabled for frontend communication
- Consider adding rate limiting and authentication tokens in production
- Store sensitive credentials in environment variables (never commit `.env`)

## Development

The server uses:
- **Express.js** - Web framework
- **Airtable** - Database client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Troubleshooting

1. **Connection errors**: Verify your Airtable API key and Base ID in `.env`
2. **Field not found**: Check that your Airtable table has the expected field names
3. **CORS errors**: Ensure the frontend `REACT_APP_API_URL` matches the backend URL
