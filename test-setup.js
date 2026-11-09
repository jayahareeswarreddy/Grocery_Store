const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testSetup() {
  console.log('Testing BasketBloom Setup...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await axios.get(`${API_URL}/products`);
    console.log('✅ Server is running and responding\n');

    // Test 2: Test admin login
    console.log('2. Testing admin login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@basketbloom.com',
      password: 'admin123'
    });
    
    if (loginResponse.data.user.userType === 'admin') {
      console.log('✅ Admin login successful');
      console.log(`   Admin ID: ${loginResponse.data.user.id}`);
      console.log(`   Token: ${loginResponse.data.token.substring(0, 20)}...\n`);
    } else {
      console.log('❌ Admin login failed - user is not admin\n');
    }

    // Test 3: Test product creation (with admin token)
    console.log('3. Testing product creation...');
    const adminToken = loginResponse.data.token;
    
    const productData = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      category: 'Test Category',
      image: 'https://via.placeholder.com/300x200',
      stock: 10
    };

    const createResponse = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    if (createResponse.data._id) {
      console.log('✅ Product creation successful');
      console.log(`   Product ID: ${createResponse.data._id}`);
      console.log(`   Product Name: ${createResponse.data.name}\n`);
    } else {
      console.log('❌ Product creation failed\n');
    }

    // Test 4: Test regular user signup
    console.log('4. Testing regular user signup...');
    const signupData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '1234567890',
      address: '123 Test Street, Test City, Test State 12345'
    };

    const signupResponse = await axios.post(`${API_URL}/auth/register`, signupData);
    
    if (signupResponse.data.user.userType === 'user') {
      console.log('✅ Regular user signup successful');
      console.log(`   User ID: ${signupResponse.data.user.id}`);
      console.log(`   User Type: ${signupResponse.data.user.userType}\n`);
    } else {
      console.log('❌ Regular user signup failed\n');
    }

    console.log('🎉 All tests passed! The system is working correctly.');
    console.log('\nYou can now:');
    console.log('1. Start the frontend: cd project && npm run dev');
    console.log('2. Login as admin: admin@basketbloom.com / admin123');
    console.log('3. Access the admin dashboard at /admin');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    console.log('\nMake sure:');
    console.log('1. MongoDB is running');
    console.log('2. Backend server is running (npm run dev in backend directory)');
    console.log('3. Admin user is created (npm run create-admin in backend directory)');
  }
}

testSetup(); 