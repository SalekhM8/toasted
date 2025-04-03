const fetch = require('node-fetch');

// Try multiple possible backend URLs
const POSSIBLE_URLS = [
  'http://localhost:3000/api',
  'http://127.0.0.1:3000/api',
  'http://10.0.2.2:3000/api',  // Android emulator
  'http://192.168.1.112:3000/api' // IP address
];

async function testUrl(url) {
  try {
    console.log(`Testing connection to: ${url}/health-check`);
    const response = await fetch(`${url}/health-check`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000 // 5 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Connection to ${url} successful:`, data);
      return { success: true, url };
    } else {
      console.log(`❌ Connection to ${url} failed with status: ${response.status}`);
      return { success: false };
    }
  } catch (error) {
    console.log(`❌ Connection to ${url} error:`, error.message);
    return { success: false };
  }
}

async function testBackendConnectivity() {
  console.log('Testing backend connectivity...');
  
  for (const url of POSSIBLE_URLS) {
    const result = await testUrl(url);
    if (result.success) {
      return result;
    }
  }
  
  return { success: false };
}

// Run the test
testBackendConnectivity().then(result => {
  if (result.success) {
    console.log('\n✅ SUCCESS: Your backend is reachable at:', result.url);
    console.log('Social authentication should work if configured correctly.');
    console.log('\nFor Google Authentication:');
    console.log('- Make sure your Google Cloud Console project has the correct OAuth credentials');
    console.log('- During development, expect to see the "app not verified" warning (you can bypass it)');
    console.log('\nFor Apple Authentication:');
    console.log('- Only works on iOS devices');
    console.log('- Requires proper configuration in your Apple Developer account');
  } else {
    console.log('\n❌ FAILED: Connection to backend failed. Please check:');
    console.log('1. Is your backend running? Try: cd ../backend && npm start');
    console.log('2. Check your backend terminal for any errors');
    console.log('3. Ensure you have no firewall blocking the connection');
    
    console.log('\nMake these changes to fix API connectivity:');
    console.log('1. In frontend/src/services/api.ts: Update the IP address if needed');
    console.log('2. Start backend with: cd ../backend && npm start');
    console.log('3. Start frontend with: cd frontend && npm start');
  }
}); 