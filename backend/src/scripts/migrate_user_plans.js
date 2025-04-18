// scripts/migrate_user_plans.js
// A migration script to update UserPlan documents to include the customWorkoutPlanId field

require('dotenv').config();
const mongoose = require('mongoose');
const { UserPlan } = require('../models/Plan');
const { CustomWorkoutPlan } = require('../models/CustomWorkoutPlan');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const migrateUserPlans = async () => {
  try {
    await connectDB();
    
    console.log('Checking for UserPlan documents that might need migration...');
    
    // Find all UserPlan documents
    const userPlans = await UserPlan.find({});
    console.log(`Found ${userPlans.length} UserPlan documents to check`);
    
    // Find all CustomWorkoutPlan documents to see if they should be linked
    const customWorkoutPlans = await CustomWorkoutPlan.find({});
    console.log(`Found ${customWorkoutPlans.length} CustomWorkoutPlan documents`);
    
    // Create a map of userId to customWorkoutPlanId for easy lookup
    const customPlanMap = new Map();
    customWorkoutPlans.forEach(plan => {
      customPlanMap.set(plan.userId.toString(), plan._id);
    });
    
    // Count how many updates we'll need to make
    let updateCount = 0;
    
    // Process each user plan
    for (const userPlan of userPlans) {
      const userId = userPlan.userId.toString();
      const hasCustomWorkoutPlan = customPlanMap.has(userId);
      
      if (hasCustomWorkoutPlan) {
        updateCount++;
        // Get the custom workout plan ID for this user
        const customWorkoutPlanId = customPlanMap.get(userId);
        
        // Update the user plan document
        await UserPlan.updateOne(
          { _id: userPlan._id },
          { $set: { customWorkoutPlanId: customWorkoutPlanId } }
        );
        
        console.log(`Updated UserPlan for user ${userId} to include customWorkoutPlanId: ${customWorkoutPlanId}`);
      }
    }
    
    console.log(`Migration complete. Updated ${updateCount} UserPlan documents.`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (error) {
    console.error(`Error during migration: ${error.message}`);
    process.exit(1);
  }
};

// Run the migration
migrateUserPlans(); 