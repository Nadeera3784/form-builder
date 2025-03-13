const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Form = require('../models/Form');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get total forms count
    const totalForms = await Form.countDocuments();
    
    // Get total submissions count (assuming submissions are stored in forms)
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