// Simple test script to check if Expo Go can connect to your backend
const axios = require('axios');

// The IP address of your computer on your local network
const YOUR_IP = '192.168.1.112';
const PORT = 3000;

// URLs to test - using your computer's IP address
const urls = [
  `http://${YOUR_IP}:${PORT}/api/health-check`,
];

async function testExpoConnection() {
  console.log('Testing Expo Go connectivity to backend...');
  console.log(`Your computer's IP address: ${YOUR_IP}`);
  console.log('----------------------------');
  
  for (const url of urls) {
    try {
      console.log(`Testing URL: ${url}`);
      const response = await axios.get(url, { timeout: 5000 });
      console.log(`✅ SUCCESS: ${url}`);
      console.log(`Response: ${JSON.stringify(response.data)}`);
      
      console.log('\n✅ SUCCESS! Your Expo Go app should be able to connect to the backend.');
      console.log('Make sure your phone and computer are on the same WiFi network.');
      console.log('You should now be able to use both email login and social login.');
    } catch (error) {
      console.log(`❌ FAILED: ${url}`);
      
      if (error.response) {
        // The server responded with an error status
        console.log(`Status: ${error.response.status}`);
        console.log(`Data: ${JSON.stringify(error.response.data)}`);
        
        if (error.response.status === 401) {
          console.log('\n⚠️ PARTIAL SUCCESS: Your server is reachable but returned a 401 error.');
          console.log('This might be expected for some endpoints that require authentication.');
          console.log('Try restarting your app in Expo Go, it should connect properly now.');
        }
      } else if (error.request) {
        // No response was received
        console.log('❌ CONNECTION FAILED - No response received from server');
        console.log('\nTroubleshooting tips:');
        console.log(`1. Make sure your backend is running: cd ../backend && npm start`);
        console.log(`2. Check if your computer's firewall is blocking connections to port ${PORT}`);
        console.log(`3. Verify that your phone and computer are on the same WiFi network`);
        console.log(`4. Try configuring your router to allow internal connections`);
      } else {
        // Something happened in setting up the request
        console.log(`Error: ${error.message}`);
      }
    }
  }
}

testExpoConnection(); 