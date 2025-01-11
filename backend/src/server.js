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


// Initialize express app first
const app = express();
app.set('trust proxy', 1);

// Load env vars
dotenv.config();

// Connect to database
connectDB();

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
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));




// Regular middleware
app.use(express.json());
app.use('/api', limiter);

// Import and seed plans
const { workoutPlans, dietPlans } = require('./data/seedPlans');
const { WorkoutPlan, DietPlan } = require('./models/Plan');

// Seed plans if they don't exist
const seedPlans = async () => {
  try {
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

seedPlans();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', progressRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/plans', planRoutes);



// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});