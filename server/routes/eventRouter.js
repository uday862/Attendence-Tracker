import express from 'express';
import Event from '../models/EventModel.js';
import userAuth from '../middleware/userAuth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Check database connection middleware
const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('Database not connected. State:', mongoose.connection.readyState);
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
      state: mongoose.connection.readyState
    });
  }
  next();
};

// Get all events
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ success: false, message: 'Database not connected' });
    }

    const events = await Event.find().sort({ date: -1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new event
router.post('/', userAuth, async (req, res) => {
  try {
    console.log('Received event creation request body:', req.body);
    console.log('User from auth:', req.user);

    const { name, description, date } = req.body;
    
    // Log the extracted values
    console.log('Extracted values:', { name, description, date });
    
    // Validate required fields
    if (!name) {
      console.log('Name is missing or empty');
      return res.status(400).json({
        success: false,
        message: 'Event name is required'
      });
    }

    if (!description) {
      console.log('Description is missing or empty');
      return res.status(400).json({
        success: false,
        message: 'Event description is required'
      });
    }

    if (!date) {
      console.log('Date is missing or empty');
      return res.status(400).json({
        success: false,
        message: 'Event date is required'
      });
    }

    // Create new event object
    const newEvent = new Event({
      name: name.trim(),
      description: description.trim(),
      date: new Date(date),
      createdBy: req.user._id
    });

    console.log('Created new event object:', newEvent.toObject());

    // Save the event
    const savedEvent = await newEvent.save();
    console.log('Event saved successfully:', savedEvent.toObject());
    
    res.status(201).json({ success: true, event: savedEvent });
  } catch (error) {
    console.error('Error in event creation:', error);
    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update an event
router.put('/:id', userAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, event: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete an event
router.delete('/:id', userAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 