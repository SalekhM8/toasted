const mongoose = require('mongoose');
const config = require('../src/config/config');
const User = require('../src/models/User');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    const users = await User.find({});
    console.log('Total users:', users.length);
    
    users.forEach(user => {
      console.log('----------------------------');
      console.log(`ID: ${user._id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Google ID: ${user.googleId || 'None'}`);
      console.log(`Apple ID: ${user.appleId || 'None'}`);
      console.log(`Created At: ${user.createdAt}`);
      console.log('----------------------------');
    });
  } catch (error) {
    console.error('Error listing users:', error);
  }
  
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 