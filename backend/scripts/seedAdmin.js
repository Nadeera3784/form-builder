const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');


dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const adminUser = {
  name: 'Admin User',
  email: 'admin@formbuilder.com',
  password: 'Admin123!',
  role: 'admin'
};

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const user = await User.create(adminUser);
    
    console.log(`Admin user created with email: ${user.email} and password: ${adminUser.password}`);
    console.log('Please change the password after first login for security reasons');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin(); 