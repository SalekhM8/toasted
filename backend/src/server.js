const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const progressRoutes = require('./routes/progressRoutes');
const profileRoutes = require('./routes/profileRoutes');
const planRoutes = require('./routes/planRoutes');
const foodRoutes = require('./routes/foodRoutes');
const { runSeedDataScript } = require('./data/seedSwapMeals');
const { WorkoutPlan, DietPlan } = require('./models/Plan');
// Import plans directly since seedData.js doesn't exist
const { workoutPlans, dietPlans } = require('./data/seedPlans');
// Import the food item seed function
const { seedFoodItems } = require('./data/seedFoodItems');

// Initialize express app first
const app = express();
app.set('trust proxy', 1);

// Load env vars
dotenv.config();

// Security middleware
app.use(helmet());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// CORS setup
app.use(cors({
  origin: '*',  // Allow requests from any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Regular middleware
app.use(express.json());
app.use('/api', limiter);

// Public health check endpoint - NO AUTH REQUIRED
// Defining this BEFORE other routes ensures it doesn't get blocked by auth middleware
app.get('/api/health-check', (req, res) => {
  // Allow CORS specifically for this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', progressRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/food-items', foodRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Helper function to seed plans
const seedPlans = async () => {
  try {
    // Check if plans already exist
    const workoutPlanExists = await WorkoutPlan.findOne();
    const dietPlanExists = await DietPlan.findOne();

    if (!workoutPlanExists) {
      await WorkoutPlan.insertMany(workoutPlans);
      console.log('Workout plans seeded');
    }
    
    if (!dietPlanExists) {
      await DietPlan.insertMany(dietPlans);
      console.log('Diet plans seeded');
    }
  } catch (error) {
    console.error('Error seeding plans:', error);
  }
};

// Import the quality meal script only if not in production to avoid errors
let seedQualityMeals;
try {
  seedQualityMeals = require('./data/seedQualityMeals').seedQualityMeals;
} catch (err) {
  console.log('Quality meal script not available, will skip this step');
  seedQualityMeals = async () => console.log('Skipping quality meal seeding');
}

// Comprehensive server startup function that handles everything
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed workout and diet plans if they don't exist
    await seedPlans();
    
    // Run the meal data scripts
    console.log('Running meal alternative seeding scripts...');
    
    // First run the existing meal script for compatibility
    try {
      await runSeedDataScript();
    } catch (error) {
      console.error('Error running seed data script:', error.message);
    }
    
    // Then run our new quality meal script for enhanced alternatives
    try {
      await seedQualityMeals();
    } catch (error) {
      console.error('Error running quality meal script:', error.message);
    }
    
    // Seed the food database with 1000+ items
    try {
      console.log('Seeding food database...');
      await seedFoodItems();
    } catch (error) {
      console.error('Error seeding food database:', error.message);
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer();