# Database Migration Scripts

This directory contains scripts for migrating data in the database when schema changes are made.

## Migration Scripts

### migrate_user_plans.js

This script adds the `customWorkoutPlanId` field to existing UserPlan documents when there's a matching CustomWorkoutPlan for the user. This is needed after adding the `customWorkoutPlanId` field to the UserPlan schema.

**How to run:**

Navigate to the backend directory and run:

```bash
node src/scripts/migrate_user_plans.js
```

Make sure your MongoDB connection is configured correctly in the `.env` file.

**What it does:**

1. Connects to the MongoDB database
2. Finds all UserPlan documents
3. Finds all CustomWorkoutPlan documents
4. For each user with a custom workout plan, updates their UserPlan document to include the customWorkoutPlanId reference
5. Logs the number of updated documents

**When to run:**

Run this script after deploying the updated schema that includes the `customWorkoutPlanId` field in the UserPlan model.

## Creating New Migration Scripts

When making schema changes that require data migration:

1. Create a new script in this directory
2. Use the existing scripts as templates
3. Make sure to check if a migration is necessary before making changes
4. Add appropriate error handling
5. Document the script in this README 