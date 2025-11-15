const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a booking date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a booking time'],
  },
  guests: {
    type: Number,
    required: [true, 'Please specify number of guests'],
    min: [1, 'At least 1 guest is required'],
    max: [10, 'Maximum 10 guests per booking'],
  },
  occasion: {
    type: String,
    trim: true,
    default: '',
  },
  specialRequests: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);

