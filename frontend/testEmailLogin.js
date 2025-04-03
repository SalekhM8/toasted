// Simple test to check email/password login
const axios = require('axios');

// The URL that matched our API configuration for iOS
const API_URL = 'http://127.0.0.1:3000/api';

async function testEmailLogin() {
  console.log('Testing email login via API...');
  console.log(`Using API URL: ${API_URL}`);
  console.log('----------------------------');
  
  const credentials = {
    email: 'test@example.com', // Use a test account that exists in your DB
    password: 'password123'    // Replace with the actual password
  };
  
  try {
    console.log(`Attempting login with: ${credentials.email}`);
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ LOGIN SUCCESSFUL!');
    console.log('----------------------------');
    console.log('User data:', response.data.user);
    console.log('Token available:', !!response.data.token);
  } catch (error) {
    console.log('❌ LOGIN FAILED');
    
    if (error.response) {
      // The server responded with an error status
      console.log(`Status: ${error.response.status}`);
      console.log(`Data: ${JSON.stringify(error.response.data)}`);
      
      if (error.response.status === 401) {
        console.log('\nNote: 401 Unauthorized usually means wrong email/password');
        console.log('This is expected if the test account doesn\'t exist');
        console.log('Your API is working correctly if you see this error!');
      }
    } else if (error.request) {
      // No response was received
      console.log('No response received from server');
    } else {
      // Something happened in setting up the request
      console.log(`Error: ${error.message}`);
    }
  }
  
  console.log('\nWhat to do next:');
  console.log('1. If you got a 401 error, that\'s normal! It means the connection works but the test credentials are wrong');
  console.log('2. Try the app login now, it should work with your real credentials');
  console.log('3. For social login, make sure your OAuth settings are correct in Google/Apple console');
}

testEmailLogin(); 