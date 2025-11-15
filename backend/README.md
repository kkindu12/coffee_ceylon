# Coffee Ceylon Backend API

Backend API for Coffee Ceylon booking system built with Node.js, Express, and MongoDB.

## Features

- RESTful API for booking management
- MongoDB database integration
- CORS enabled for frontend communication
- Input validation and error handling
- Booking availability checking
- Status management (pending, confirmed, cancelled, completed)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (or copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/coffee_ceylon
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coffee_ceylon
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

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Bookings

- `POST /api/bookings` - Create a new booking
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+94 11 234 5678",
    "date": "2024-12-15",
    "time": "14:00",
    "guests": 2,
    "occasion": "Casual Visit",
    "specialRequests": "Window seat preferred"
  }
  ```

- `GET /api/bookings` - Get all bookings (with optional query params)
  - Query params: `date`, `status`, `email`
  - Example: `/api/bookings?date=2024-12-15&status=confirmed`

- `GET /api/bookings/:id` - Get a single booking by ID

- `PUT /api/bookings/:id` - Update booking status
  ```json
  {
    "status": "confirmed"
  }
  ```

- `DELETE /api/bookings/:id` - Cancel a booking

- `GET /api/bookings/availability/:date` - Get available time slots for a date
  - Example: `/api/bookings/availability/2024-12-15`

## Booking Status

- `pending` - New booking, awaiting confirmation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Booking completed

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Database Schema

The Booking model includes:
- Personal information (name, email, phone)
- Booking details (date, time, guests)
- Optional fields (occasion, specialRequests)
- Status tracking
- Timestamps (createdAt, updatedAt)

