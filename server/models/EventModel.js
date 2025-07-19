import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save middleware to log the data
eventSchema.pre('save', function(next) {
  console.log('Attempting to save event with data:', this.toObject());
  this.updatedAt = new Date();
  next();
});

// Add pre-validate middleware to log validation attempts
eventSchema.pre('validate', function(next) {
  console.log('Validating event with data:', this.toObject());
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event; 