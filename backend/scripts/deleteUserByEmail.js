const mongoose = require('mongoose');
const config = require('../src/config/config');
const User = require('../src/models/User');

// Get email from command line argument
const emailToDelete = process.argv[2];

if (!emailToDelete) {
  console.error('Please provide an email to delete');
  console.error('Usage: node deleteUserByEmail.js <email>');
  process.exit(1);
}

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    console.log(`Attempting to delete user with email: ${emailToDelete}`);
    
    // Find user first to confirm
    const user = await User.findOne({ email: emailToDelete.toLowerCase() });
    
    if (!user) {
      console.log('User not found with this email');
      return;
    }
    
    console.log('Found user:');
    console.log(`ID: ${user._id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Google ID: ${user.googleId || 'None'}`);
    console.log(`Apple ID: ${user.appleId || 'None'}`);
    
    // Confirm deletion
    if (process.argv.includes('--confirm')) {
      const result = await User.deleteOne({ email: emailToDelete.toLowerCase() });
      
      if (result.deletedCount === 1) {
        console.log(`User ${emailToDelete} deleted successfully`);
      } else {
        console.log('User could not be deleted');
      }
    } else {
      console.log('\nTo confirm deletion, run again with --confirm:');
      console.log(`node deleteUserByEmail.js ${emailToDelete} --confirm`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 