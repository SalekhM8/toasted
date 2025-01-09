// middleware/planCheck.js
const asyncHandler = require('express-async-handler');
const { UserPlan } = require('../models/Plan');

const checkPlan = asyncHandler(async (req, res, next) => {
  // Will only run after protect middleware, so we know we have req.user
  const userPlan = await UserPlan.findOne({ userId: req.user._id });
  
  // Allow plan selection even if no plan exists
  if (!userPlan && req.path !== '/select') {
    res.status(404);
    throw new Error('No active plan found');
  }

  req.userPlan = userPlan; // Attach to req for convenience in controllers
  next();
});

module.exports = { checkPlan };