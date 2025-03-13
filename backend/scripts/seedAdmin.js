const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Admin user data
const adminUser = {
  name: 'Admin User',
  email: 'admin@formbuilder.com',
  password: 'Admin123!',
  role: 'admin'
};

// Create admin user
const seedAdmin = async () => {
  try {
    // First check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create new admin user
    const user = await User.create(adminUser);
    
    console.log(`Admin user created with email: ${user.email} and password: ${adminUser.password}`);
    console.log('Please change the password after first login for security reasons');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin(); 