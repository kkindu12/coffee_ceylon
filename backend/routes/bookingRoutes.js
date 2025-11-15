const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if booking date is in the past
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book for a past date',
      });
    }

    // Check for existing booking at same date and time
    const existingBooking = await Booking.findOne({
      date: bookingDate,
      time: time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.',
      });
    }

    // Create new booking
    const booking = new Booking({
      name,
      email,
      phone,
      date: bookingDate,
      time,
      guests: parseInt(guests),
      occasion: occasion || '',
      specialRequests: specialRequests || '',
      status: 'pending',
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully! We will confirm your reservation via email shortly.',
      data: savedBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get all bookings (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { date, status, email } = req.query;
    const query = {};

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (status) {
      query.status = status;
    }

    if (email) {
      query.email = email.toLowerCase();
    }

    const bookings = await Booking.find(query)
      .sort({ date: 1, time: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).select('-__v');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Update booking status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status',
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    ).select('-__v');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get available time slots for a specific date
router.get('/availability/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    // Get all bookings for this date
    const bookings = await Booking.find({
      date: {
        $gte: bookingDate,
        $lt: new Date(bookingDate.getTime() + 24 * 60 * 60 * 1000),
      },
      status: { $in: ['pending', 'confirmed'] },
    }).select('time');

    const bookedTimes = bookings.map((b) => b.time);

    // Generate all available times (7:00 AM to 8:00 PM, 30-minute intervals)
    const allTimes = [];
    for (let hour = 7; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        allTimes.push(timeString);
      }
    }

    const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

    res.status(200).json({
      success: true,
      date: date,
      availableTimes,
      bookedTimes,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;

