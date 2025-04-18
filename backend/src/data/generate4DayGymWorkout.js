// Function to generate 4-day gym workout plan
const generate4DayGymWorkout = () => ([
  // Week 1
  [
    // Day 1
    {
      dayNumber: 1,
      focus: "Upper Body Power & Strength",
      exercises: [
        {
          name: "Bench Press",
          sets: 4,
          reps: "5-8",
          progression: "Increase weight by 2.5kg when all reps completed with good form",
          notes: "Focus on explosive concentric phase",
          tempo: "2-0-X",
          rest: "2-3min",
          cues: [
            "Retract scapula",
            "Create full-body tension",
            "Drive feet into floor",
            "Explosive press"
          ],
          alternativeExerciseNames: ["Dumbbell Press", "Floor Press", "Close Grip Bench", "Incline Press", "Push-Up"]
        },
        {
          name: "Weighted Pull-Up",
          sets: 4,
          reps: "5-8",
          progression: "Add 2.5kg when all reps completed with good form",
          notes: "Full range of motion priority",
          tempo: "2-0-X",
          rest: "2-3min",
          cues: [
            "Initiate with lats",
            "Pull through elbows",
            "Full extension at bottom",
            "Control the movement"
          ],
          alternativeExerciseNames: ["Chin-Up", "Lat Pulldown", "Ring Row", "Barbell Row", "TRX Row"]
        },
        {
          name: "Overhead Press",
          sets: 3,
          reps: "6-10",
          progression: "Increase by 2kg when form is perfect across all sets",
          notes: "Strict form, no leg drive",
          tempo: "2-1-X",
          rest: "90sec",
          cues: [
            "Brace core tight",
            "Vertical forearms at start",
            "Press directly overhead",
            "Full lockout at top"
          ],
          alternativeExerciseNames: ["Push Press", "Dumbbell Press", "Landmine Press", "Z-Press", "Pike Push-Up"]
        },
        {
          name: "Pendlay Row",
          sets: 3,
          reps: "6-10",
          progression: "Increase by 2.5kg when form remains strict",
          notes: "Reset each rep on floor",
          tempo: "X-1-2",
          rest: "90sec",
          cues: [
            "Flat back position",
            "Explosive pull",
            "Elbows past torso",
            "Control descent"
          ],
          alternativeExerciseNames: ["Barbell Row", "T-Bar Row", "Chest Supported Row", "Dumbbell Row", "Meadows Row"]
        },
        {
          name: "Lateral Raise",
          sets: 3,
          reps: "10-15",
          progression: "Increase weight when all reps can be performed with perfect form",
          notes: "Focus on isolation and mind-muscle connection",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Slight forward lean",
            "Lead with elbows",
            "Thumbs slightly down",
            "Control the eccentric"
          ],
          alternativeExerciseNames: ["Cable Lateral Raise", "Leaning Lateral Raise", "Upright Row", "Face Pull", "Plate Raise"]
        },
        {
          name: "Face Pull",
          sets: 3,
          reps: "12-15",
          progression: "Increase resistance when form is perfect",
          notes: "Focus on external rotation and retraction",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Pull to forehead",
            "Elbows above hands",
            "External rotate at end",
            "Control the return"
          ],
          alternativeExerciseNames: ["Band Pull Apart", "Reverse Fly", "YTW Raises", "Cuban Rotation", "Prone I-Y-T"]
        },
        {
          name: "Tricep Extension",
          sets: 3,
          reps: "10-15",
          progression: "Increase weight when all reps are performed with good form",
          notes: "Focus on mind-muscle connection",
          tempo: "2-0-2",
          rest: "60sec",
          cues: [
            "Keep elbows still",
            "Full extension",
            "Control negative",
            "Feel tricep stretch"
          ],
          alternativeExerciseNames: ["Tricep Pushdown", "Close Grip Bench", "Diamond Push-Up", "Overhead Extension", "JM Press"]
        }
      ]
    },
    // Day 2
    {
      dayNumber: 2,
      focus: "Lower Body Power & Strength",
      exercises: [
        {
          name: "Back Squat",
          sets: 4,
          reps: "5-8",
          progression: "Increase weight by 2.5-5kg when all reps completed with good form",
          notes: "Focus on depth and form",
          tempo: "2-1-X",
          rest: "2-3min",
          cues: [
            "Brace core 360°",
            "Knees track over toes",
            "Maintain neutral spine",
            "Drive through heels"
          ],
          alternativeExerciseNames: ["Front Squat", "Goblet Squat", "Safety Bar Squat", "Hack Squat", "Bulgarian Split Squat"]
        },
        {
          name: "Deadlift",
          sets: 4,
          reps: "5-8",
          progression: "Increase weight by 5kg when form is perfect across all sets",
          notes: "Reset between reps",
          tempo: "X-1-2",
          rest: "2-3min",
          cues: [
            "Engage lats",
            "Push floor away",
            "Maintain neutral spine",
            "Hinge at hips"
          ],
          alternativeExerciseNames: ["Trap Bar Deadlift", "Sumo Deadlift", "Romanian Deadlift", "Rack Pull", "Good Morning"]
        },
        {
          name: "Bulgarian Split Squat",
          sets: 3,
          reps: "8-12 each side",
          progression: "Add weight when balance and form are solid",
          notes: "Focus on knee tracking and balance",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Vertical torso",
            "Front knee tracks toe",
            "Hip hinge slightly",
            "Control through full ROM"
          ],
          alternativeExerciseNames: ["Lunges", "Step-ups", "Single Leg Squat", "Pistol Squat", "Reverse Lunge"]
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: "8-12",
          progression: "Increase weight when all reps are completed with good form",
          notes: "Focus on full range of motion",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Feet shoulder-width",
            "Lower back pressed into seat",
            "Control descent",
            "Don't lock knees at top"
          ],
          alternativeExerciseNames: ["Hack Squat", "Belt Squat", "V-Squat", "Pendulum Squat", "Safety Bar Squat"]
        },
        {
          name: "Standing Calf Raise",
          sets: 3,
          reps: "12-15",
          progression: "Increase weight when form is perfect",
          notes: "Focus on full stretch and contraction",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Full stretch at bottom",
            "Pause at top contraction",
            "Control throughout",
            "Straight knees"
          ],
          alternativeExerciseNames: ["Seated Calf Raise", "Donkey Calf Raise", "Single Leg Calf Raise", "Leg Press Calf Raise", "Smith Machine Calf Raise"]
        },
        {
          name: "Hanging Leg Raise",
          sets: 3,
          reps: "10-15",
          progression: "Work toward straight leg variation",
          notes: "Focus on hip flexion, not momentum",
          tempo: "2-0-2",
          rest: "60sec",
          cues: [
            "Prevent swing",
            "Initiate with lower abs",
            "Control descent",
            "Posterior pelvic tilt"
          ],
          alternativeExerciseNames: ["Captain's Chair Leg Raise", "Decline Reverse Crunch", "Ab Wheel Rollout", "Dragon Flag", "Toes to Bar"]
        }
      ]
    },
    // Day 3
    {
      dayNumber: 3,
      focus: "Rest Day",
      exercises: []
    },
    // Day 4
    {
      dayNumber: 4,
      focus: "Full Body Power & Strength",
      exercises: [
        {
          name: "Incline Bench Press",
          sets: 4,
          reps: "6-8",
          progression: "Increase weight by 2.5kg when all reps completed with good form",
          notes: "Focus on upper chest contraction",
          tempo: "2-1-X",
          rest: "2-3min",
          cues: [
            "Retract scapula",
            "Tuck elbows slightly",
            "Drive through chest",
            "Full range of motion"
          ],
          alternativeExerciseNames: ["Incline Dumbbell Press", "Landmine Press", "Low-to-High Cable Fly", "Weighted Dips", "Push-Up Plus"]
        },
        {
          name: "Weighted Chin-up",
          sets: 4,
          reps: "6-8",
          progression: "Add 2.5kg when all reps are completed with good form",
          notes: "Focus on bicep and lat engagement",
          tempo: "2-0-X",
          rest: "2-3min",
          cues: [
            "Supinated grip",
            "Pull with elbows",
            "Full range of motion",
            "Control descent"
          ],
          alternativeExerciseNames: ["Pull-Up", "Lat Pulldown", "Assisted Chin-Up", "Inverted Row", "Machine High Row"]
        },
        {
          name: "Barbell Hip Thrust",
          sets: 4,
          reps: "8-12",
          progression: "Increase weight by 5kg when form is perfect across all sets",
          notes: "Focus on glute contraction",
          tempo: "1-2-1",
          rest: "90sec",
          cues: [
            "Shoulders on bench",
            "Drive through heels",
            "Posterior pelvic tilt at top",
            "Squeeze glutes hard"
          ],
          alternativeExerciseNames: ["Glute Bridge", "Single Leg Hip Thrust", "Cable Pull Through", "Kettlebell Swing", "Romanian Deadlift"]
        },
        {
          name: "Dumbbell Row",
          sets: 3,
          reps: "8-12 each side",
          progression: "Increase weight when form is maintained",
          notes: "Focus on full lat contraction",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Flat back",
            "Pull to hip",
            "Squeeze shoulder blade",
            "Control descent"
          ],
          alternativeExerciseNames: ["Meadows Row", "Chest Supported Row", "Cable Row", "TRX Row", "Machine Row"]
        },
        {
          name: "Walking Lunges",
          sets: 3,
          reps: "10-12 each leg",
          progression: "Add weight when balance is solid",
          notes: "Focus on stride length and knee position",
          tempo: "2-0-1",
          rest: "90sec",
          cues: [
            "Step naturally",
            "Vertical torso",
            "Front knee tracks toe",
            "Drive through heel"
          ],
          alternativeExerciseNames: ["Reverse Lunges", "Step-Ups", "Split Squats", "Forward Lunges", "Curtsy Lunges"]
        },
        {
          name: "Dumbbell Shoulder Press",
          sets: 3,
          reps: "8-12",
          progression: "Increase weight when form is perfect",
          notes: "Focus on full range of motion",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Start at shoulder height",
            "Press directly up",
            "Full lockout",
            "Control descent"
          ],
          alternativeExerciseNames: ["Arnold Press", "Machine Shoulder Press", "Push Press", "Landmine Press", "Z-Press"]
        }
      ]
    }
  ],
  // Week 2
  [
    // Day 1
    {
      dayNumber: 1,
      focus: "Upper Body Strength & Hypertrophy",
      exercises: [
        {
          name: "Incline Dumbbell Press",
          sets: 4,
          reps: "8-12",
          progression: "Increase weight by 1-2kg when all reps completed with good form",
          notes: "Focus on upper chest contraction",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Slight arch in back",
            "Elbows at 45°",
            "Press up and slightly in",
            "Full stretch at bottom"
          ],
          alternativeExerciseNames: ["Incline Barbell Press", "Incline Machine Press", "Low-to-High Cable Fly", "Landmine Press", "Push-Up Plus"]
        },
        {
          name: "Lat Pulldown",
          sets: 4,
          reps: "8-12",
          progression: "Increase weight when form is maintained",
          notes: "Focus on full range of motion",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Chest up tall",
            "Drive elbows down",
            "Slight lean back",
            "Full stretch at top"
          ],
          alternativeExerciseNames: ["Pull-Up", "Chin-Up", "Straight Arm Pulldown", "Machine Row", "Cable Row"]
        },
        {
          name: "Dumbbell Shoulder Press",
          sets: 3,
          reps: "10-12",
          progression: "Increase weight when form is perfect",
          notes: "Focus on full range of motion",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Start at shoulder height",
            "Press directly up",
            "Full lockout",
            "Control descent"
          ],
          alternativeExerciseNames: ["Arnold Press", "Machine Shoulder Press", "Push Press", "Landmine Press", "Z-Press"]
        },
        {
          name: "Cable Row",
          sets: 3,
          reps: "10-12",
          progression: "Increase weight when all reps maintain form",
          notes: "Focus on retraction and depression",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Chest up",
            "Pull to sternum",
            "Squeeze shoulder blades",
            "Control return"
          ],
          alternativeExerciseNames: ["Seated Row", "Chest Supported Row", "Inverted Row", "Dumbbell Row", "Machine Row"]
        },
        {
          name: "Dumbbell Lateral Raise",
          sets: 3,
          reps: "12-15",
          progression: "Increase weight when form is perfect",
          notes: "Focus on form over weight",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Slight forward lean",
            "Lead with elbows",
            "Thumbs slightly down",
            "Control entire movement"
          ],
          alternativeExerciseNames: ["Cable Lateral Raise", "Machine Lateral Raise", "Upright Row", "Band Lateral Raise", "Lateral Plank Raise"]
        },
        {
          name: "Skull Crusher",
          sets: 3,
          reps: "10-15",
          progression: "Increase weight when form is perfect",
          notes: "Keep elbows pointed at ceiling",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Elbows fixed position",
            "Lower to forehead",
            "Extend fully",
            "Control descent"
          ],
          alternativeExerciseNames: ["Tricep Pushdown", "Overhead Extension", "Close Grip Bench", "Tricep Dips", "Diamond Push-Up"]
        }
      ]
    },
    // Day 2
    {
      dayNumber: 2,
      focus: "Lower Body Strength & Hypertrophy",
      exercises: [
        {
          name: "Front Squat",
          sets: 4,
          reps: "8-10",
          progression: "Increase weight by 2.5kg when all reps completed with good form",
          notes: "Focus on upright posture",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Elbows high",
            "Chest up",
            "Knees track over toes",
            "Full depth"
          ],
          alternativeExerciseNames: ["Back Squat", "Zercher Squat", "Goblet Squat", "Safety Bar Squat", "Hack Squat"]
        },
        {
          name: "Romanian Deadlift",
          sets: 4,
          reps: "8-10",
          progression: "Increase weight by 2.5-5kg when form is perfect",
          notes: "Focus on hamstring stretch",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Soft knee bend",
            "Hip hinge",
            "Bar close to legs",
            "Neutral spine throughout"
          ],
          alternativeExerciseNames: ["Stiff-Legged Deadlift", "Single Leg RDL", "Good Morning", "Cable Pull Through", "Hyperextension"]
        },
        {
          name: "Hack Squat",
          sets: 3,
          reps: "10-12",
          progression: "Increase weight when form is maintained",
          notes: "Focus on quad development",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Feet forward on platform",
            "Control descent",
            "Push through midfoot",
            "Don't lock knees"
          ],
          alternativeExerciseNames: ["Leg Press", "Pendulum Squat", "Belt Squat", "Split Squat", "Machine Squat"]
        },
        {
          name: "Glute-Ham Raise",
          sets: 3,
          reps: "8-12",
          progression: "Add weight if needed",
          notes: "Focus on hamstring contraction",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Anchor feet firmly",
            "Maintain hip extension",
            "Control throughout",
            "Full range of motion"
          ],
          alternativeExerciseNames: ["Nordic Curl", "Lying Leg Curl", "Seated Leg Curl", "Swiss Ball Hamstring Curl", "Sliding Leg Curl"]
        },
        {
          name: "Seated Calf Raise",
          sets: 3,
          reps: "12-15",
          progression: "Increase weight when form is perfect",
          notes: "Focus on soleus development",
          tempo: "2-2-2",
          rest: "60sec",
          cues: [
            "Full stretch at bottom",
            "Pause at top contraction",
            "Control throughout",
            "Bent knees throughout"
          ],
          alternativeExerciseNames: ["Standing Calf Raise", "Single Leg Calf Raise", "Leg Press Calf Raise", "Donkey Calf Raise", "Smith Machine Calf Raise"]
        },
        {
          name: "Cable Crunch",
          sets: 3,
          reps: "12-15",
          progression: "Increase resistance when form is perfect",
          notes: "Focus on spinal flexion",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Hips stationary",
            "Curl torso down",
            "Round spine",
            "Control extension"
          ],
          alternativeExerciseNames: ["Crunch", "Decline Sit-Up", "Machine Crunch", "Stability Ball Crunch", "Hanging Knee Raise"]
        }
      ]
    },
    // Day 3
    {
      dayNumber: 3,
      focus: "Rest Day",
      exercises: []
    },
    // Day 4
    {
      dayNumber: 4,
      focus: "Full Body Strength & Hypertrophy",
      exercises: [
        {
          name: "Trap Bar Deadlift",
          sets: 4,
          reps: "6-10",
          progression: "Increase weight by 5kg when form is perfect",
          notes: "Focus on leg drive and back position",
          tempo: "2-1-X",
          rest: "2min",
          cues: [
            "Hips back then down",
            "Push floor away",
            "Maintain neutral spine",
            "Drive hips forward"
          ],
          alternativeExerciseNames: ["Conventional Deadlift", "Sumo Deadlift", "Rack Pull", "Clean Pull", "Power Clean"]
        },
        {
          name: "Dumbbell Bench Press",
          sets: 4,
          reps: "8-12",
          progression: "Increase weight by 2kg when form is maintained",
          notes: "Focus on chest contraction",
          tempo: "2-1-2",
          rest: "2min",
          cues: [
            "Retract shoulder blades",
            "Elbows at 45°",
            "Press up and in slightly",
            "Full ROM"
          ],
          alternativeExerciseNames: ["Barbell Bench", "Machine Press", "Push-Up", "Cable Fly", "Floor Press"]
        },
        {
          name: "Bulgarian Split Squat",
          sets: 3,
          reps: "10-12 each leg",
          progression: "Add weight when balance is perfect",
          notes: "Focus on stability and quad engagement",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Upright torso",
            "Front knee tracks toe",
            "Back leg for balance",
            "Drive through front heel"
          ],
          alternativeExerciseNames: ["Lunges", "Step-Ups", "Pistol Squat", "Single Leg Squat", "Rear Foot Elevated Split Squat"]
        },
        {
          name: "Pullover",
          sets: 3,
          reps: "10-12",
          progression: "Increase weight when form is maintained",
          notes: "Focus on lat stretch and serratus engagement",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Bridge hips up",
            "Keep arms slightly bent",
            "Feel stretch in lats",
            "Control the arc"
          ],
          alternativeExerciseNames: ["Straight Arm Pulldown", "Cable Pullover", "Machine Pullover", "Band Pullover", "TRX Fallout"]
        },
        {
          name: "Leg Extension",
          sets: 3,
          reps: "12-15",
          progression: "Increase weight when form is perfect",
          notes: "Focus on quad contraction",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Sit tall",
            "Extend fully",
            "Squeeze at top",
            "Control descent"
          ],
          alternativeExerciseNames: ["Sissy Squat", "Spanish Squat", "Front Foot Elevated Split Squat", "Terminal Knee Extension", "Wall Sit"]
        },
        {
          name: "Lateral Raise",
          sets: 3,
          reps: "12-15",
          progression: "Increase weight when form is perfect",
          notes: "Focus on delt isolation",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Slight forward lean",
            "Lead with elbows",
            "Thumbs down",
            "Control descent"
          ],
          alternativeExerciseNames: ["Cable Lateral Raise", "Machine Lateral Raise", "Upright Row", "Kettlebell High Pull", "Band Lateral Raise"]
        }
      ]
    }
  ]
]);

module.exports = generate4DayGymWorkout; 