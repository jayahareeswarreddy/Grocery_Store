const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const ADMIN_EMAIL = 'admin@basketbloom.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_USERNAME = 'admin';

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      phone: '1234567890',
      address: 'Admin Address',
      userType: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 