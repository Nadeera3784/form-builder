const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Form = require('../models/Form');
const { protect, authorize } = require('../middleware/auth');

router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const totalForms = await Form.countDocuments();
    
    const forms = await Form.find();
    let totalSubmissions = 0;
    
    forms.forEach(form => {
      if (form.submissions && Array.isArray(form.submissions)) {
        totalSubmissions += form.submissions.length;
      }
    });
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalForms,
        totalSubmissions
      }
    });
  } catch (error) {
    console.error('Error fetching system statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router; 