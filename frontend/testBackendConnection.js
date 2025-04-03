// Simple test script to check all possible backend connections
const axios = require('axios');

// URLs to test
const urls = [
  'http://localhost:3000/api/health-check',
  'http://127.0.0.1:3000/api/health-check',
  'http://0.0.0.0:3000/api/health-check'
];

async function testUrls() {
  console.log('Testing backend connectivity...');
  console.log('----------------------------');
  
  let anySuccess = false;
  
  for (const url of urls) {
    try {
      console.log(`Testing URL: ${url}`);
      const response = await axios.get(url, { timeout: 5000 });
      console.log(`✅ SUCCESS: ${url}`);
      console.log(`Response: ${JSON.stringify(response.data)}`);
      console.log('----------------------------');
      anySuccess = true;
    } catch (error) {
      console.log(`❌ FAILED: ${url}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Data: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.log('No response received from server');
      } else {
        console.log(`Error: ${error.message}`);
      }
      console.log('----------------------------');
    }
  }
  
  if (anySuccess) {
    console.log('✅ CONNECTION SUCCESSFUL: At least one URL worked!');
  } else {
    console.log('❌ CONNECTION FAILED: None of the URLs worked.');
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure backend is running (cd backend && npm start)');
    console.log('2. Check for error messages in the backend terminal');
    console.log('3. Try editing frontend/src/services/api.ts to use a working URL');
  }
}

testUrls(); 