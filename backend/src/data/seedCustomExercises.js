const { Exercise } = require('../models/Exercise');

/**
 * This seed file creates exercises specifically formatted for the custom workout plan generator.
 * These exercises follow the exact schema expected by the query mechanism.
 */

// Create exercise seed data that matches the expected format
const customExercises = [
  // CHEST EXERCISES - COMPOUND
  {
    name: 'Barbell Bench Press',
    primaryMuscleGroup: 'chest',
    secondaryMuscleGroups: ['triceps', 'shoulders'],
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'moderate',
    alternativeExerciseNames: ['Flat Bench Press'],
    instructions: [
      'Lie on a flat bench with feet planted firmly on the ground',
      'Grip the barbell slightly wider than shoulder width',
      'Lower the bar to the middle of your chest',
      'Press the bar back up to full arm extension'
    ],
    defaultRest: '120s',
    cues: ['Drive feet into floor', 'Keep chest up', 'Tuck elbows at 45 degrees'],
    needsSpotter: true
  },
  {
    name: 'Incline Dumbbell Press',
    primaryMuscleGroup: 'chest',
    secondaryMuscleGroups: ['shoulders', 'triceps'],
    equipment: ['dumbbell', 'bench'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'moderate',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at shoulder level',
      'Press dumbbells up until arms are extended',
      'Lower under control back to starting position'
    ],
    defaultRest: '90s',
    cues: ['Keep wrists straight', 'Drive elbows down']
  },
  {
    name: 'Push-Up',
    primaryMuscleGroup: 'chest',
    secondaryMuscleGroups: ['triceps', 'shoulders', 'core'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'low',
    alternativeExerciseNames: ['Press-Up'],
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to the starting position'
    ],
    defaultRest: '60s',
    cues: ['Engage core', 'Keep body straight'],
    isBodyweightOnly: true
  },
  
  // CHEST EXERCISES - ISOLATION
  {
    name: 'Cable Fly',
    primaryMuscleGroup: 'chest',
    secondaryMuscleGroups: [],
    equipment: ['cable'],
    difficulty: 'intermediate',
    exerciseType: 'isolation',
    movementPattern: 'push',
    jointStress: 'low',
    instructions: [
      'Stand between cable stations with arms extended to sides',
      'Keeping slight elbow bend, bring hands together in front of chest',
      'Control the return to starting position'
    ],
    defaultRest: '60s',
    cues: ['Keep elbows soft', 'Squeeze chest at contraction']
  },
  
  // BACK EXERCISES - COMPOUND
  {
    name: 'Pull-Up',
    primaryMuscleGroup: 'back',
    secondaryMuscleGroups: ['biceps', 'shoulders'],
    equipment: ['pull-up bar'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'pull',
    jointStress: 'moderate',
    alternativeExerciseNames: ['Chin-Up'],
    instructions: [
      'Grip bar with hands wider than shoulder width',
      'Pull yourself up until chin clears the bar',
      'Lower back to starting position with control'
    ],
    defaultRest: '90s',
    cues: ['Engage lats before pulling', 'Lead with chest'],
    isBodyweightOnly: true
  },
  {
    name: 'Barbell Row',
    primaryMuscleGroup: 'back',
    secondaryMuscleGroups: ['biceps', 'traps'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'pull',
    jointStress: 'moderate',
    alternativeExerciseNames: ['Bent-Over Row'],
    instructions: [
      'Bend at hips and knees, keeping back flat',
      'Pull bar to lower abdomen',
      'Lower with control and repeat'
    ],
    defaultRest: '90s',
    cues: ['Chest up', 'Pinch shoulder blades']
  },
  {
    name: 'Cable Row',
    primaryMuscleGroup: 'back',
    secondaryMuscleGroups: ['biceps', 'traps'],
    equipment: ['cable', 'machine'],
    difficulty: 'beginner',
    exerciseType: 'compound',
    movementPattern: 'pull',
    jointStress: 'low',
    instructions: [
      'Sit at cable row machine with feet braced',
      'Pull handle to lower abdomen',
      'Extend arms fully between reps'
    ],
    defaultRest: '90s',
    cues: ['Keep chest up', 'Drive elbows back']
  },
  
  // BACK EXERCISES - ISOLATION
  {
    name: 'Lat Pulldown',
    primaryMuscleGroup: 'back',
    secondaryMuscleGroups: ['biceps'],
    equipment: ['cable', 'machine'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'pull',
    jointStress: 'low',
    instructions: [
      'Grip bar wider than shoulder width',
      'Pull bar down to chest level',
      'Extend arms fully between reps'
    ],
    defaultRest: '60s',
    cues: ['Keep chest up', 'Drive elbows down']
  },
  
  // SHOULDER EXERCISES - COMPOUND
  {
    name: 'Overhead Press',
    primaryMuscleGroup: 'shoulders',
    secondaryMuscleGroups: ['triceps', 'traps'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'moderate',
    alternativeExerciseNames: ['Military Press', 'Shoulder Press'],
    instructions: [
      'Hold barbell at shoulder height',
      'Press bar overhead until arms are extended',
      'Lower back to shoulders under control'
    ],
    defaultRest: '90s',
    cues: ['Brace core', 'Drive head through at top']
  },
  {
    name: 'Dumbbell Shoulder Press',
    primaryMuscleGroup: 'shoulders',
    secondaryMuscleGroups: ['triceps'],
    equipment: ['dumbbell'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'moderate',
    instructions: [
      'Sit with back supported and dumbbells at shoulder height',
      'Press weights overhead until arms are extended',
      'Lower dumbbells back to shoulders'
    ],
    defaultRest: '90s',
    cues: ['Keep core tight', 'Press slightly forward']
  },
  
  // SHOULDER EXERCISES - ISOLATION
  {
    name: 'Lateral Raise',
    primaryMuscleGroup: 'shoulders',
    secondaryMuscleGroups: [],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'push',
    jointStress: 'low',
    instructions: [
      'Stand holding dumbbells at sides',
      'Raise arms to sides until parallel with floor',
      'Lower slowly back to start'
    ],
    defaultRest: '60s',
    cues: ['Keep slight elbow bend', 'Lead with elbows']
  },
  
  // TRICEPS EXERCISES
  {
    name: 'Tricep Dip',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: ['chest', 'shoulders'],
    equipment: ['bench', 'dip bars'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'push',
    jointStress: 'moderate',
    instructions: [
      'Support body on parallel bars with arms extended',
      'Lower body by bending arms until elbows reach 90°',
      'Push back up to starting position'
    ],
    defaultRest: '90s',
    cues: ['Keep elbows close to body', 'Maintain upright posture']
  },
  {
    name: 'Tricep Pushdown',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: [],
    equipment: ['cable'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'push',
    jointStress: 'low',
    alternativeExerciseNames: ['Cable Pushdown'],
    instructions: [
      'Stand at cable machine with attachment at shoulder height',
      'Push attachment down until arms are fully extended',
      'Control the return to starting position'
    ],
    defaultRest: '60s',
    cues: ['Keep elbows at sides', 'Full extension at bottom']
  },
  
  // BICEPS EXERCISES
  {
    name: 'Barbell Curl',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['forearms'],
    equipment: ['barbell'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'pull',
    jointStress: 'low',
    instructions: [
      'Stand holding barbell with shoulder-width grip',
      'Curl bar to shoulder level',
      'Lower with control back to starting position'
    ],
    defaultRest: '60s',
    cues: ['Keep elbows at sides', 'Squeeze at top']
  },
  {
    name: 'Dumbbell Curl',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['forearms'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'pull',
    jointStress: 'low',
    instructions: [
      'Stand holding dumbbells at sides',
      'Curl weights to shoulder level',
      'Lower with control back to starting position'
    ],
    defaultRest: '60s',
    cues: ['Keep upper arms stationary', 'Supinate wrists during curl']
  },
  
  // QUAD EXERCISES - COMPOUND
  {
    name: 'Barbell Back Squat',
    primaryMuscleGroup: 'quads',
    secondaryMuscleGroups: ['glutes', 'hamstrings', 'core'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'squat',
    jointStress: 'moderate',
    alternativeExerciseNames: ['Back Squat', 'Squat'],
    instructions: [
      'Position bar on upper traps/rear shoulders',
      'Squat down until thighs are parallel to ground',
      'Drive through heels to return to standing'
    ],
    defaultRest: '120s',
    cues: ['Chest up', 'Knees out', 'Maintain neutral spine']
  },
  {
    name: 'Leg Press',
    primaryMuscleGroup: 'quads',
    secondaryMuscleGroups: ['glutes', 'hamstrings'],
    equipment: ['machine'],
    difficulty: 'beginner',
    exerciseType: 'compound',
    movementPattern: 'squat',
    jointStress: 'moderate',
    instructions: [
      'Sit in leg press machine with feet shoulder-width on platform',
      'Lower weight by bending knees',
      'Push platform away until legs are extended'
    ],
    defaultRest: '120s',
    cues: ['Keep lower back against seat', 'Don\'t lock out knees']
  },
  
  // HAMSTRING EXERCISES - COMPOUND
  {
    name: 'Romanian Deadlift',
    primaryMuscleGroup: 'hamstrings',
    secondaryMuscleGroups: ['glutes', 'back'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'hinge',
    jointStress: 'moderate',
    alternativeExerciseNames: ['RDL', 'Stiff-Legged Deadlift'],
    instructions: [
      'Stand holding barbell against thighs',
      'Hinge at hips while maintaining slight knee bend',
      'Lower bar along legs until feel stretch in hamstrings',
      'Return to standing by driving hips forward'
    ],
    defaultRest: '90s',
    cues: ['Hinge at hips', 'Keep back flat', 'Bar close to legs']
  },
  {
    name: 'Leg Curl',
    primaryMuscleGroup: 'hamstrings',
    secondaryMuscleGroups: [],
    equipment: ['machine'],
    difficulty: 'beginner',
    exerciseType: 'isolation',
    movementPattern: 'pull',
    jointStress: 'low',
    instructions: [
      'Lie face down on leg curl machine',
      'Curl heels toward buttocks',
      'Lower with control'
    ],
    defaultRest: '60s',
    cues: ['Full range of motion', 'Squeeze at top']
  },
  
  // GLUTE EXERCISES - COMPOUND
  {
    name: 'Hip Thrust',
    primaryMuscleGroup: 'glutes',
    secondaryMuscleGroups: ['hamstrings', 'quads'],
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'hinge',
    jointStress: 'low',
    instructions: [
      'Sit on ground with upper back against bench and barbell over hips',
      'Drive through heels to lift hips until body forms straight line',
      'Lower with control and repeat'
    ],
    defaultRest: '90s',
    cues: ['Squeeze glutes at top', 'Keep chin tucked']
  },
  
  // CORE EXERCISES - COMPOUND
  {
    name: 'Plank',
    primaryMuscleGroup: 'core',
    secondaryMuscleGroups: ['shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    exerciseType: 'compound',
    movementPattern: 'isometric',
    jointStress: 'low',
    instructions: [
      'Start in push-up position with forearms on ground',
      'Hold position while maintaining straight body line',
      'Breathe normally and engage core throughout'
    ],
    defaultRest: '60s',
    cues: ['Squeeze glutes', 'Keep neck neutral'],
    isBodyweightOnly: true
  },
  {
    name: 'Cable Woodchop',
    primaryMuscleGroup: 'core',
    secondaryMuscleGroups: ['shoulders'],
    equipment: ['cable'],
    difficulty: 'intermediate',
    exerciseType: 'compound',
    movementPattern: 'rotate',
    jointStress: 'low',
    instructions: [
      'Set cable at high position',
      'Pull handle diagonally across body to opposite hip',
      'Return with control to starting position'
    ],
    defaultRest: '60s',
    cues: ['Rotate through torso', 'Keep arms extended']
  }
];

// Add more exercises as needed to ensure good selection for all muscle groups

/**
 * Seed the custom exercises to the database
 */
const seedCustomExercises = async () => {
  try {
    console.log('Checking for custom exercises in database...');
    
    // Check if first custom exercise exists (to avoid duplicate seeding)
    const existingExercise = await Exercise.findOne({ name: 'Barbell Bench Press' });
    
    if (existingExercise) {
      console.log('Custom exercises already exist in database, checking format...');
      
      // Verify the format is correct
      if (existingExercise.primaryMuscleGroup === 'chest' && 
          Array.isArray(existingExercise.equipment) && 
          existingExercise.equipment.includes('barbell')) {
        console.log('Custom exercises are properly formatted.');
        return;
      } else {
        console.log('Existing exercises found but in incorrect format. Updating...');
        // Delete and recreate if format is wrong
        await Exercise.deleteMany({ name: { $in: customExercises.map(ex => ex.name) } });
      }
    }
    
    // If we get here, we need to create the exercises
    console.log(`Seeding ${customExercises.length} custom exercises...`);
    
    await Exercise.insertMany(customExercises);
    
    console.log('Custom exercises successfully seeded!');
    
    // Log information about total available exercises
    const exerciseCount = await Exercise.countDocuments();
    console.log(`Total exercises in database: ${exerciseCount}`);
    
    // Verify the data is correctly accessible
    const muscleGroups = await Exercise.distinct('primaryMuscleGroup');
    const equipment = await Exercise.distinct('equipment');
    
    console.log(`Available muscle groups: ${muscleGroups.join(', ')}`);
    console.log(`Available equipment (flattened): ${equipment.flat().filter((v, i, a) => a.indexOf(v) === i).join(', ')}`);
    
  } catch (error) {
    console.error('Error seeding custom exercises:', error);
  }
};

module.exports = { seedCustomExercises }; 