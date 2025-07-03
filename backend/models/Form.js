const mongoose = require('mongoose');
const crypto = require('crypto');

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  formFields: {
    type: Array,
    required: [true, 'Form must have at least one field']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  shareableLink: {
    type: String,
    unique: true
  },
  submissions: [{
    data: Object,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FormSchema.pre('save', function(next) {
  if (!this.shareableLink) {
    const randomString = crypto.randomBytes(8).toString('hex');
    this.shareableLink = `${randomString}`;
  }
  next();
});

module.exports = mongoose.model('Form', FormSchema); 