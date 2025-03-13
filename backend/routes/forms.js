const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/forms
// @desc    Create a new form
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const form = await Form.create(req.body);

    res.status(201).json({
      success: true,
      data: form
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/forms
// @desc    Get all forms for logged in user or all forms for admin
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    let query;

    // If user is admin, get all forms, else get only user's forms
    if (req.user.role === 'admin') {
      query = Form.find().populate({
        path: 'user',
        select: 'name email'
      });
    } else {
      query = Form.find({ user: req.user.id });
    }

    const forms = await query;

    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/forms/:id
// @desc    Get single form
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

    // Make sure user owns the form or is admin
    if (form.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this form'
      });
    }

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/forms/:id
// @desc    Update form
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

    // Make sure user owns the form or is admin
    if (form.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this form'
      });
    }

    form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/forms/:id
// @desc    Delete form
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

    // Make sure user owns the form or is admin
    if (form.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this form'
      });
    }

    await form.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/forms/public/:shareableLink
// @desc    Get form by shareable link (public access)
// @access  Public
router.get('/public/:shareableLink', async (req, res, next) => {
  try {
    const form = await Form.findOne({ 
      shareableLink: req.params.shareableLink 
    }).select('title description formFields');

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/forms/submit/:shareableLink
// @desc    Submit a form response
// @access  Public
router.post('/submit/:shareableLink', async (req, res, next) => {
  try {
    const form = await Form.findOne({ shareableLink: req.params.shareableLink });

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

    // Add submission to form
    form.submissions.push({
      data: req.body
    });

    await form.save();

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router; 