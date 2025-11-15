# Backend Setup Guide

This guide will help you set up and run the Node.js backend for the Coffee Ceylon booking system.

## Prerequisites

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB**
   - Option 1: Local MongoDB installation
     - Download from: https://www.mongodb.com/try/download/community
   - Option 2: MongoDB Atlas (Cloud - Free tier available)
     - Sign up at: https://www.mongodb.com/cloud/atlas

## Installation Steps

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Express (web framework)
- Mongoose (MongoDB ODM)
- CORS (Cross-Origin Resource Sharing)
- dotenv (environment variables)
- body-parser (request parsing)

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

**For Local MongoDB:**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/coffee_ceylon
NODE_ENV=development
```

**For MongoDB Atlas:**
```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coffee_ceylon
NODE_ENV=development
```

Replace `username` and `password` with your MongoDB Atlas credentials.

### 4. Start MongoDB (Local Installation Only)

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or start manually:
mongod
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or
brew services start mongodb-community
```

### 5. Run the Backend Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## Testing the Backend

### 1. Health Check

Open your browser or use curl:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Coffee Ceylon API is running",
  "timestamp": "2024-11-14T15:30:00.000Z"
}
```

### 2. Test Booking Creation

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+94 11 234 5678",
    "date": "2024-12-15",
    "time": "14:00",
    "guests": 2,
    "occasion": "Casual Visit"
  }'
```

## Frontend Connection

The Angular frontend is already configured to connect to the backend at `http://localhost:3000`.

Make sure:
1. Backend is running on port 3000
2. MongoDB is running and connected
3. Frontend can access the backend (CORS is enabled)

## API Endpoints

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (with optional filters)
- `GET /api/bookings/:id` - Get a single booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel a booking
- `GET /api/bookings/availability/:date` - Check available time slots

## Troubleshooting

### MongoDB Connection Issues

1. **Local MongoDB:**
   - Ensure MongoDB service is running
   - Check connection string in `.env`
   - Verify MongoDB is listening on port 27017

2. **MongoDB Atlas:**
   - Check your IP is whitelisted in Atlas
   - Verify username and password are correct
   - Ensure network access is configured

### Port Already in Use

If port 3000 is already in use:
1. Change PORT in `.env` file
2. Update Angular service URL in `src/app/services/booking.service.ts`

### CORS Issues

CORS is already enabled in the backend. If you still have issues:
- Check that the frontend URL is allowed
- Verify backend is running
- Check browser console for specific errors

## Next Steps

1. Start the backend: `npm run dev`
2. Start the frontend: `npm start` (in the main coffee_ceylon directory)
3. Open browser: `http://localhost:4200`
4. Navigate to the Booking page and test the form

## Production Deployment

For production:
1. Set `NODE_ENV=production` in `.env`
2. Use a secure MongoDB connection string
3. Configure proper CORS origins
4. Use environment variables for sensitive data
5. Consider adding authentication/authorization
6. Set up proper logging and monitoring

