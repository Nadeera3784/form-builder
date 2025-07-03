const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, async (req, res, next) => {
  try {
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

router.get('/', protect, async (req, res, next) => {
  try {
    let query;

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

router.get('/:id', protect, async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

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

router.put('/:id', protect, async (req, res, next) => {
  try {
    let form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

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

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

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

router.post('/submit/:shareableLink', async (req, res, next) => {
  try {
    const form = await Form.findOne({ shareableLink: req.params.shareableLink });

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

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