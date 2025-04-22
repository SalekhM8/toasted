#!/usr/bin/env node

/**
 * Script to seed the exercise database
 * Usage: node seedExerciseDb.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the standalone exercise database seeder
const seederPath = path.join(__dirname, '../src/scripts/StandaloneExerciseDb.js');

// Check if the seeder file exists
if (!fs.existsSync(seederPath)) {
  console.error(`Error: Seeder file not found at ${seederPath}`);
  process.exit(1);
}

console.log('Starting to seed exercise database...');

// Run the seeder script
const seeder = spawn('node', [seederPath], { stdio: 'inherit' });

seeder.on('close', (code) => {
  if (code === 0) {
    console.log('Exercise database seeding completed successfully');
  } else {
    console.error(`Exercise database seeding failed with code ${code}`);
    process.exit(code);
  }
});

seeder.on('error', (err) => {
  console.error('Failed to start seeder process:', err);
  process.exit(1);
}); 