// data/seedPlans.js

// Helper function to generate 2-week workout cycle for different frequencies
const generate1DayWorkout = () => ([
  // Week 1
  [
    {
      dayNumber: 1,
      focus: "Full Body Power & Strength - Extended Session",
      exercises: [
        {
          name: "Front Squat",
          sets: 4,
          reps: "5-8",
          progression: "When all sets completed with perfect form at RPE 8, increase weight by 2.5kg. Deload 10% every 4th week.",
          notes: "Focus on bar speed in concentric phase. If last rep feels below RPE 8, increase weight next session.",
          tempo: "3-1-1",
          rest: "2-3min based on RPE of previous set",
          cues: [
            "Create full-body tension before unrack",
            "Elbows high, upper arms parallel to floor",
            "Initiate with hip hinge while maintaining torso angle",
            "Knees track over toes throughout movement",
            "Drive through full foot, emphasize mid-foot pressure"
          ],
          alternativeExerciseNames: ["Back Squat", "Goblet Squat", "Hack Squat", "Belt Squat", "Safety Bar Squat"]
        },
        {
          name: "Box Jump",
          sets: 4,
          reps: "5",
          progression: "Increase box height by 2-3 inches when all landings are stable and controlled",
          notes: "Focus on explosive hip extension. Always step down, never jump down.",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Load hips and arms for takeoff",
            "Extend explosively through hips",
            "Land soft and controlled",
            "Step down and reset between reps"
          ],
          alternativeExerciseNames: ["Broad Jump", "Depth Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "Standing Military Press",
          sets: 4,
          reps: "6-8",
          progression: "Increase by 1.25kg when all sets are completed with perfect form",
          notes: "Focus on full body tension and strict form",
          tempo: "2-0-1",
          rest: "2min",
          cues: [
            "Generate full body tension",
            "Clear chin with slight lean back",
            "Drive head through at top",
            "Stack joints at lockout"
          ],
          alternativeExerciseNames: ["Seated Military Press", "Dumbbell Shoulder Press", "Landmine Press", "Machine Shoulder Press", "Single Arm Press"]
        },
        {
          name: "Pendlay Row",
          sets: 3,
          reps: "8-10",
          progression: "Increase weight by 2.5kg when form is perfect across all sets",
          notes: "Reset each rep on floor. Focus on explosive pull.",
          tempo: "1-0-X",
          rest: "90sec",
          cues: [
            "Set flat back before each rep",
            "Pull explosively to lower chest",
            "Control descent",
            "Reset tension each rep"
          ],
          alternativeExerciseNames: ["Bent Over Row", "T-Bar Row", "Seal Row", "Chest Supported Row", "Single Arm Row"]
        },
        {
          name: "Medicine Ball Rotational Throw",
          sets: 3,
          reps: "6 each side",
          progression: "Increase ball weight when power output is consistent",
          notes: "Focus on hip rotation and power transfer",
          tempo: "X-0-X",
          rest: "60sec",
          cues: [
            "Load hips fully in backswing",
            "Drive from ground up",
            "Transfer power through core",
            "Follow through with rotation"
          ],
          alternativeExerciseNames: ["Cable Woodchop", "Landmine Rotation", "Russian Twist", "Standing Oblique Twist", "Cross-Body Chop"]
        },
        {
          name: "Romanian Deadlift",
          sets: 4,
          reps: "8-10",
          progression: "Increase by 2.5kg when form is perfect across all sets",
          notes: "Focus on hamstring tension and hip hinge pattern",
          tempo: "3-0-2",
          rest: "2min",
          cues: [
            "Push hips back first",
            "Maintain slight knee bend",
            "Bar close to legs",
            "Feel hamstring stretch"
          ],
          alternativeExerciseNames: ["Stiff Leg Deadlift", "Good Morning", "Single Leg RDL", "Glute Ham Raise", "Seated Leg Curl"]
        },
        {
          name: "Dips",
          sets: 4,
          reps: "8-12",
          progression: "Add weight when bodyweight becomes easy",
          notes: "Full range of motion priority",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Lock out at top",
            "Control descent",
            "Chest forward slightly",
            "Full depth at bottom"
          ],
          alternativeExerciseNames: ["Close Grip Bench Press", "Pushup", "Cable Pushdown", "Bench Press", "Incline Bench Press"]
        },
        {
          name: "Barbell Hip Thrust",
          sets: 3,
          reps: "12-15",
          progression: "Add 5kg when all reps are powerful and controlled",
          notes: "Focus on glute contraction at top",
          tempo: "2-1-1",
          rest: "90sec",
          cues: [
            "Feet placed for vertical shins",
            "Drive through heels",
            "Full hip extension",
            "Hold contraction briefly"
          ],
          alternativeExerciseNames: ["Glute Bridge", "Single Leg Glute Bridge", "Hip Extension", "Donkey Kick", "Clamshell"]
        },
        {
          name: "Face Pull",
          sets: 3,
          reps: "15-20",
          progression: "Increase weight when form is perfect",
          notes: "Focus on rotator cuff and rear delt engagement",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Pull to forehead level",
            "Lead with elbows high",
            "External rotate at end",
            "Control return"
          ],
          alternativeExerciseNames: ["Rear Delt Fly", "Band Pull Apart", "Reverse Pec Deck", "YTWLs", "W-Raises"]
        },
        {
          name: "Hanging Leg Raise",
          sets: 3,
          reps: "12-15",
          progression: "Move to straight legs when controlled",
          notes: "No swinging, strict form",
          tempo: "2-0-2",
          rest: "60sec",
          cues: [
            "Maintain hollow body",
            "Control the descent",
            "No momentum",
            "Full range of motion"
          ],
          alternativeExerciseNames: ["Hanging Knee Raise", "Hanging V-Up", "Hanging L-Sit", "Hanging Pike", "Hanging Split"]
        },
        {
          name: "Farmers Walk",
          sets: 3,
          reps: "30m",
          progression: "Increase weight when grip is solid",
          notes: "Focus on posture and grip strength",
          tempo: "Steady pace",
          rest: "90sec",
          cues: [
            "Chest up, shoulders back",
            "Breathe consistently",
            "Maintain strong grip",
            "Take controlled steps"
          ],
          alternativeExerciseNames: ["Farmer Carry", "Kettlebell Walk", "Suitcase Carry", "Dumbbell Walk", "Sandbag Walk"]
        }
      ]
    }
  ],
  // Week 2
  [
    {
      dayNumber: 1,
      focus: "Full Body Strength & Power",
      exercises: [
        {
          name: "Trap Bar Deadlift",
          sets: 4,
          reps: "5",
          progression: "Add 5kg when all reps are explosive and technically sound",
          notes: "Focus on power production. Every rep from dead stop.",
          tempo: "2-0-X",
          rest: "2-3min",
          cues: [
            "Build tension before pull",
            "Push floor away",
            "Drive hips through",
            "Control descent"
          ],
          alternativeExerciseNames: ["Conventional Deadlift", "Sumo Deadlift", "Rack Pull", "Hex Bar Deadlift", "Deficit Deadlift"]
        },
        {
          name: "Depth Jump to Box Jump",
          sets: 4,
          reps: "4",
          progression: "Increase drop height when contact time is minimal",
          notes: "Minimize ground contact time. Quality over quantity.",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Land soft and springy",
            "Minimize contact time",
            "Explode up immediately",
            "Land controlled on box"
          ],
          alternativeExerciseNames: ["Depth Jump", "Box Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "Incline Bench Press",
          sets: 4,
          reps: "6-8",
          progression: "2.5kg increase when all reps are strong and controlled",
          notes: "Focus on chest engagement and bar path",
          tempo: "2-1-1",
          rest: "2min",
          cues: [
            "Retract shoulder blades",
            "Tuck elbows slightly",
            "Drive bar up and back",
            "Maintain arch"
          ],
          alternativeExerciseNames: ["Incline Dumbbell Press", "Incline Machine Press", "Incline Cable Fly", "Push Up", "Dips"]
        },
        {
          name: "Weighted Pull-up",
          sets: 3,
          reps: "6-8",
          progression: "Add 1.25kg when form is perfect across all sets",
          notes: "Full range of motion priority. Dead hang start.",
          tempo: "2-0-1",
          rest: "2min",
          cues: [
            "Start from dead hang",
            "Lead with chest to bar",
            "Drive elbows down",
            "Control descent"
          ],
          alternativeExerciseNames: ["Chin Up", "Lat Pulldown", "Neutral Grip Pull Up", "Machine Pull Up", "Banded Pull Up"]
        },
        {
          name: "Plyo Push-up",
          sets: 3,
          reps: "5",
          progression: "Progress to clap push-ups when height is consistent",
          notes: "Focus on explosive power. Quality over quantity.",
          tempo: "X-0-X",
          rest: "90sec",
          cues: [
            "Create full body tension",
            "Push explosively",
            "Land soft and controlled",
            "Reset between reps"
          ],
          alternativeExerciseNames: ["Push Up", "Incline Push Up", "Dips", "Dumbbell Floor Press", "Spoto Press"]
        }
      ]
    }
  ]
]);
 
const generate2DayWorkout = () => ([
  // Week 1
  [
    {
      dayNumber: 1, // Monday
      focus: "Full Body A - Power & Lower Body Emphasis",
      exercises: [
        {
          name: "Box Jump",
          sets: 4,
          reps: "5",
          progression: "Increase box height when landing is stable and controlled",
          notes: "Focus on explosive power and soft landing",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Load hips and arms",
            "Explosive triple extension",
            "Land soft and quiet",
            "Step down between reps"
          ],
          alternativeExerciseNames: ["Broad Jump", "Depth Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "Back Squat",
          sets: 4,
          reps: "5-6",
          progression: "Add 2.5kg when all sets are strong and technically sound",
          notes: "Focus on bar speed in concentric phase. Strength focus, so lift around 80% of your 1 rep max",
          tempo: "3-1-1",
          rest: "2-3min",
          cues: [
            "Create full-body tension",
            "Break at hips and knees",
            "Keep chest up throughout",
            "Drive through mid-foot"
          ],
          alternativeExerciseNames: ["Front Squat", "Box Squat", "Goblet Squat", "Hack Squat", "Bulgarian Split Squat"]
        },
        {
          name: "Barbell Row",
          sets: 4,
          reps: "8-10",
          progression: "Increase weight by 2.5kg when form is perfect",
          notes: "Control eccentric, explosive concentric. Again if focussing on strength, 80% of your 1 rep max. If power, then lower the weight and focus on fast movement",
          tempo: "2-0-X",
          rest: "90sec",
          cues: [
            "Hinge at hips",
            "Pull to lower chest",
            "Keep elbows close",
            "Squeeze shoulder blades"
          ],
          alternativeExerciseNames: ["Pendlay Row", "T-Bar Row", "Meadows Row", "Cable Row", "Chest Supported Row"]
        },
        {
          name: "Push Press",
          sets: 4,
          reps: "6-8",
          progression: "Add 2kg when power output is consistent",
          notes: "Focus on leg drive to shoulder linkage",
          tempo: "2-0-X",
          rest: "2min",
          cues: [
            "Quick dip drive",
            "Transfer power smoothly",
            "Aggressive lockout",
            "Control the descent"
          ],
          alternativeExerciseNames: ["Military Press", "Standing Military Press", "Seated Dumbbell Press", "Landmine Press", "Machine Shoulder Press"]
        },
        {
          name: "Walking Lunge",
          sets: 3,
          reps: "10 each leg",
          progression: "Add weight when balance is perfect",
          notes: "Focus on stability and control",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Step with purpose",
            "Knee tracks toe",
            "Torso upright",
            "Push through full foot"
          ],
          alternativeExerciseNames: ["Reverse Lunge", "Step Up", "Front Squat", "Hack Squat", "Leg Press"]
        },
        {
          name: "Chin-Up",
          sets: 3,
          reps: "6-8",
          progression: "Add weight when achieving all reps",
          notes: "Full range of motion priority",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Start from dead hang",
            "Lead with chest",
            "Squeeze at top",
            "Control descent"
          ],
          alternativeExerciseNames: ["Pull Up", "Lat Pulldown", "Neutral Grip Pull Up", "Machine Pull Up", "Banded Pull Up"]
        },
        {
          name: "Turkish Get-Up",
          sets: 2,
          reps: "3 each side",
          progression: "Increase weight when movement is fluid",
          notes: "Focus on quality and control",
          tempo: "Controlled",
          rest: "60sec",
          cues: [
            "Eyes on weight",
            "Sequential movement",
            "Maintain stability",
            "Stay controlled"
          ],
          alternativeExerciseNames: ["Russian Kettlebell Get-Up", "Farmers Carry Get-Up", "Dumbbell Get-Up", "Suitcase Get-Up", "Sandbag Get-Up"]
        }
      ]
    },
    {
      dayNumber: 4, // Thursday
      focus: "Full Body B - Speed & Upper Body Emphasis",
      exercises: [
        {
          name: "Depth Jump",
          sets: 4,
          reps: "4",
          progression: "Increase height when contact time is minimal",
          notes: "Focus on minimal ground contact time",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Land soft and springy",
            "Minimize ground time",
            "Vertical power focus",
            "Reset between reps"
          ],
          alternativeExerciseNames: ["Broad Jump", "Box Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "Deadlift",
          sets: 4,
          reps: "5",
          progression: "5kg increase when form is perfect",
          notes: "Focus on power production from floor",
          tempo: "2-0-X",
          rest: "3min",
          cues: [
            "Build tension in setup",
            "Push floor away",
            "Keep bar close",
            "Hinge hips back"
          ],
          alternativeExerciseNames: ["Trap Bar Deadlift", "Conventional Deadlift", "Sumo Deadlift", "Rack Pull", "Hex Bar Deadlift"]
        },
        {
          name: "Bench Press",
          sets: 4,
          reps: "6-8",
          progression: "2.5kg increase when all reps are strong",
          notes: "Focus on explosive press, controlled descent",
          tempo: "3-0-X",
          rest: "2min",
          cues: [
            "Retract shoulder blades",
            "Create leg drive",
            "Bar path slight arc",
            "Full lockout"
          ],
          alternativeExerciseNames: ["Incline Bench Press", "Dumbbell Bench Press", "Floor Press", "Push Up", "Dips"]
        },
        {
          name: "Single-Arm DB Row",
          sets: 3,
          reps: "10-12 each side",
          progression: "Increase weight when form is stable",
          notes: "Focus on unilateral control",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Stable base position",
            "Initiate with lat",
            "Control rotation",
            "Full range of motion"
          ],
          alternativeExerciseNames: ["Bent Over Row", "T-Bar Row", "Seal Row", "Chest Supported Row", "Single Arm Row"]
        },
        {
          name: "Split Squat",
          sets: 3,
          reps: "8 each leg",
          progression: "Add weight when balance is maintained",
          notes: "Focus on single leg stability",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Vertical shin front leg",
            "Hip hinge movement",
            "Control through full ROM",
            "Drive through front foot"
          ],
          alternativeExerciseNames: ["Bulgarian Split Squat", "Walking Lunge", "Reverse Lunge", "Step Up", "Front Squat"]
        },
        {
          name: "Landmine Press",
          sets: 3,
          reps: "10 each side",
          progression: "Add weight when movement is smooth",
          notes: "Focus on core stability during press",
          tempo: "2-0-2",
          rest: "60sec",
          cues: [
            "Brace core tight",
            "Stack shoulders",
            "Control arc path",
            "Full extension"
          ],
          alternativeExerciseNames: ["Dumbbell Press", "Machine Press", "Cable Press", "Push Up", "Dips"]
        },
        {
          name: "Loaded Carry Complex",
          sets: 2,
          reps: "30m each: farmers, rack, overhead",
          progression: "Increase weight when grip and position solid",
          notes: "Focus on postural control under load",
          tempo: "Steady pace",
          rest: "2min",
          cues: [
            "Maintain posture",
            "Breathe controlled",
            "Stable shoulders",
            "Purposeful steps"
          ],
          alternativeExerciseNames: ["Farmer Carry", "Kettlebell Carry", "Suitcase Carry", "Dumbbell Carry", "Sandbag Carry"]
        }
      ]
    }
  ],
  // Week 2
  [
    {
      dayNumber: 1,
      focus: "Full Body C - Strength & Athletic Power",
      exercises: [
        {
          name: "Med Ball Rotational Throw",
          sets: 4,
          reps: "6 each side",
          progression: "Increase ball weight when power is consistent",
          notes: "Focus on hip rotation power",
          tempo: "X-0-X",
          rest: "90sec",
          cues: [
            "Load with hip turn",
            "Drive from ground",
            "Transfer through core",
            "Full follow through"
          ],
          alternativeExerciseNames: ["Cable Woodchop", "Landmine Rotation", "Russian Twist", "Standing Oblique Twist", "Cross-Body Chop"]
        },
        {
          name: "Front Squat",
          sets: 4,
          reps: "5-6",
          progression: "2.5kg increase when form is solid",
          notes: "Maintain upright posture throughout",
          tempo: "3-1-1",
          rest: "2-3min",
          cues: [
            "Elbows high",
            "Knees track toes",
            "Chest tall",
            "Full depth"
          ],
          alternativeExerciseNames: ["Back Squat", "Goblet Squat", "Hack Squat", "Belt Squat", "Safety Bar Squat"]
        },
        {
          name: "Weighted Pull-Up",
          sets: 4,
          reps: "5-6",
          progression: "Add 1.25kg when all reps are strong",
          notes: "Quality over quantity",
          tempo: "2-0-2",
          rest: "2min",
          cues: [
            "Pack shoulders",
            "Lead with chest",
            "Full range",
            "Control descent"
          ],
          alternativeExerciseNames: ["Chin Up", "Lat Pulldown", "Neutral Grip Pull Up", "Machine Pull Up", "Banded Pull Up"]
        },
        {
          name: "Push Press",
          sets: 4,
          reps: "5-6",
          progression: "2kg increase when power is consistent",
          notes: "Focus on power transfer",
          tempo: "2-0-X",
          rest: "2min",
          cues: [
            "Dip drive connect",
            "Vertical bar path",
            "Aggressive finish",
            "Control return"
          ],
          alternativeExerciseNames: ["Military Press", "Standing Military Press", "Seated Dumbbell Press", "Landmine Press", "Machine Shoulder Press"]
        },
        {
          name: "RDL",
          sets: 3,
          reps: "8-10",
          progression: "Add weight when hinge is perfect",
          notes: "Focus on hamstring tension",
          tempo: "3-0-2",
          rest: "90sec",
          cues: [
            "Hip hinge pattern",
            "Soft knee bend",
            "Bar close to legs",
            "Feel hamstrings load"
          ],
          alternativeExerciseNames: ["Stiff Leg Deadlift", "Good Morning", "Single Leg RDL", "Glute Ham Raise", "Seated Leg Curl"]
        },
        {
          name: "Ring/TRX Row",
          sets: 3,
          reps: "10-12",
          progression: "Adjust angle for difficulty",
          notes: "Focus on scapular control",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Set shoulder blades",
            "Pull with lats",
            "Control body angle",
            "Full extension return"
          ],
          alternativeExerciseNames: ["Bent Over Row", "T-Bar Row", "Seal Row", "Chest Supported Row", "Single Arm Row"]
        },
        {
          name: "Ab Wheel Rollout",
          sets: 3,
          reps: "8-10",
          progression: "Increase ROM when control is perfect",
          notes: "Focus on anti-extension",
          tempo: "3-0-3",
          rest: "60sec",
          cues: [
            "Hollow body start",
            "Reach through shoulders",
            "Control extension",
            "Pull back with lats"
          ],
          alternativeExerciseNames: ["Plank Rollout", "Reverse Plank Rollout", "Side Plank Rollout", "Hanging Knee Raise", "Hanging V-Up"]
        }
      ]
    },
    {
      dayNumber: 4,
      focus: "Full Body D - Power & Movement Control",
      exercises: [
        {
          name: "Broad Jump",
          sets: 4,
          reps: "4",
          progression: "Focus on distance when landing is stable",
          notes: "Emphasis on horizontal power",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Load hips back",
            "Arm drive forward",
            "Extend fully",
            "Stick landing"
          ],
          alternativeExerciseNames: ["Box Jump", "Depth Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "Trap Bar Deadlift",
          sets: 4,
          reps: "5",
          progression: "5kg increase when speed is good",
          notes: "Focus on leg drive",
          tempo: "2-0-X",
          rest: "2-3min",
          cues: [
            "Build tension",
            "Push floor away",
            "Extend hips fully",
            "Control descent"
          ],
          alternativeExerciseNames: ["Conventional Deadlift", "Sumo Deadlift", "Rack Pull", "Hex Bar Deadlift", "Deficit Deadlift"]
        },
        {
          name: "Incline Bench Press",
          sets: 4,
          reps: "6-8",
          progression: "2.5kg increase when strong and stable",
          notes: "Focus on upper chest engagement",
          tempo: "3-0-1",
          rest: "2min",
          cues: [
            "Set shoulder blades",
            "Elbows track",
            "Touch low on chest",
            "Drive to lockout"
          ],
          alternativeExerciseNames: ["Incline Dumbbell Press", "Incline Machine Press", "Incline Cable Fly", "Push Up", "Dips"]
        },
        {
          name: "Meadows Row",
          sets: 3,
          reps: "10-12 each side",
          progression: "Add weight when form is stable",
          notes: "Focus on lat engagement",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Hinge position",
            "Lead with elbow",
            "Control rotation",
            "Full stretch return"
          ],
          alternativeExerciseNames: ["Bent Over Row", "T-Bar Row", "Seal Row", "Chest Supported Row", "Single Arm Row"]
        },
        {
          name: "Bulgarian Split Squat",
          sets: 3,
          reps: "8-10 each leg",
          progression: "Add weight when balance is perfect",
          notes: "Focus on single leg control",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Front knee tracking",
            "Hip hinge pattern",
            "Torso upright",
            "Control depth"
          ],
          alternativeExerciseNames: ["Walking Lunge", "Reverse Lunge", "Step Up", "Front Squat", "Hack Squat"]
        },
        {
          name: "Z Press",
          sets: 3,
          reps: "8-10",
          progression: "Increase weight when core stable",
          notes: "Focus on core and shoulder stability",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Tall seated posture",
            "Engage core",
            "Vertical press",
            "Full lockout"
          ],
          alternativeExerciseNames: ["Dumbbell Press", "Machine Press", "Cable Press", "Push Up", "Dips"]
        },
        {
          name: "Suitcase Carry",
          sets: 3,
          reps: "30m each side",
          progression: "Add weight when position maintained",
          notes: "Focus on lateral core stability",
          tempo: "Controlled pace",
          rest: "60sec",
          cues: [
            "Resist lateral lean",
            "Stay tall",
            "Breathe naturally",
            "Purposeful steps"
          ],
          alternativeExerciseNames: ["Farmer Carry", "Kettlebell Carry", "Dumbbell Carry", "Sandbag Carry", "Sled Push"]
        }
      ]
    }
  ]
]);
 
const generate3DayWorkout = () => ([
  // Week 1
  [
    {
      dayNumber: 1, // Monday
      focus: "Full Body Power & Force Production",
      exercises: [
        {
          name: "Drop Jump to Box Jump",
          sets: 4,
          reps: "4",
          progression: "Increase drop height when contact time < 0.2s",
          notes: "Focus on minimal ground contact time. Monitor for quality.",
          tempo: "X-0-X",
          rest: "2-3min",
          cues: [
            "Land soft and springy",
            "Minimize ground contact",
            "Explosive redirect",
            "Stick box landing"
          ],
          alternativeExerciseNames: ["Depth Jump", "Box Jump", "Vertical Jump", "Plyo Lunge", "Jump Squat"]
        },
        {
          name: "High Bar Back Squat",
          sets: 5,
          reps: "3-5",
          progression: "Add 2.5kg when bar speed is consistent",
          notes: "Focus on explosive concentric. Monitor bar velocity.",
          tempo: "3-1-X",
          rest: "3min",
          cues: [
            "Create 360° tension",
            "Maintain thoracic extension",
            "Knees track toes",
            "Drive vertically"
          ],
          alternativeExerciseNames: ["Front Squat", "Box Squat", "Goblet Squat", "Hack Squat", "Bulgarian Split Squat"]
        },
        {
          name: "Weighted Pull-Up",
          sets: 4,
          reps: "4-6",
          progression: "Add 1.25kg when all reps explosive",
          notes: "Focus on power production in pull",
          tempo: "3-0-X",
          rest: "2min",
          cues: [
            "Pack shoulders tight",
            "Explosive pull",
            "Lead with upper chest",
            "Full ROM control"
          ],
          alternativeExerciseNames: ["Chin Up", "Lat Pulldown", "Neutral Grip Pull Up", "Machine Pull Up", "Banded Pull Up"]
        },
        {
          name: "Clean Pull",
          sets: 4,
          reps: "3",
          progression: "Increase load when triple extension is perfect",
          notes: "Focus on acceleration and extension",
          tempo: "2-0-X",
          rest: "2min",
          cues: [
            "Patient off floor",
            "Accelerate past knee",
            "Violent extension",
            "Tall finish"
          ],
          alternativeExerciseNames: ["Power Clean", "Hang Clean", "Pull Snatch", "Power Snatch", "Split Jerk"]
        },
        {
          name: "Single-Leg RDL",
          sets: 3,
          reps: "8 each side",
          progression: "Add weight when balance is perfect",
          notes: "Focus on hip hinge and stability",
          tempo: "3-1-2",
          rest: "90sec",
          cues: [
            "Root standing foot",
            "Hinge at hip",
            "Control torso angle",
            "Square hips"
          ],
          alternativeExerciseNames: ["Stiff Leg Deadlift", "Good Morning", "Single Leg RDL", "Glute Ham Raise", "Seated Leg Curl"]
        },
        {
          name: "Landmine Anti-Rotation Press",
          sets: 3,
          reps: "8 each side",
          progression: "Increase load when core stable",
          notes: "Focus on resisting rotation",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Brace core 360°",
            "Resist rotation",
            "Press with control",
            "Maintain hip position"
          ],
          alternativeExerciseNames: ["Dumbbell Press", "Machine Press", "Cable Press", "Push Up", "Dips"]
        },
        {
          name: "Copenhagen Plank",
          sets: 3,
          reps: "30s each side",
          progression: "Increase hold time when stable",
          notes: "Focus on hip and core control",
          tempo: "Hold",
          rest: "60sec",
          cues: [
            "Align shoulder to ankle",
            "Engage glute medius",
            "Stack hips",
            "Maintain position"
          ],
          alternativeExerciseNames: ["Plank Rollout", "Reverse Plank Rollout", "Side Plank Rollout", "Hanging Knee Raise", "Hanging V-Up"]
        }
      ]
    },
    {
      dayNumber: 3, // Wednesday
      focus: "Full Body Strength & Rate of Force Development",
      exercises: [
        {
          name: "Med Ball Rotational Scoop Toss",
          sets: 4,
          reps: "5 each side",
          progression: "Increase ball weight when power consistent",
          notes: "Focus on hip power and rotation",
          tempo: "X-0-X",
          rest: "90sec",
          cues: [
            "Load through hip",
            "Sequential rotation",
            "Transfer ground force",
            "Full follow through"
          ],
          alternativeExerciseNames: ["Cable Woodchop", "Landmine Rotation", "Russian Twist", "Standing Oblique Twist", "Cross-Body Chop"]
        },
        {
          name: "Trap Bar Deadlift",
          sets: 5,
          reps: "4-6",
          progression: "5kg increase when speed good",
          notes: "Focus on power production",
          tempo: "2-0-X",
          rest: "3min",
          cues: [
            "Build tension",
            "Push floor away",
            "Drive hips through",
            "Control descent"
          ]
        },
        {
          name: "Front Squat",
          sets: 4,
          reps: "6-8",
          progression: "2.5kg increase when position solid",
          notes: "Focus on quad development and torso position",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Elbows high",
            "Upright torso",
            "Knees forward",
            "Control depth"
          ]
        },
        {
          name: "Walking Lunge",
          sets: 3,
          reps: "10 each leg",
          progression: "Add weight when balance perfect",
          notes: "Focus on single leg strength",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Step with purpose",
            "Control knee track",
            "Maintain posture",
            "Push through heel"
          ]
        },
        {
          name: "Glute Ham Raise",
          sets: 3,
          reps: "8-10",
          progression: "Reduce assistance as strength improves",
          notes: "Focus on hamstring strength",
          tempo: "3-0-2",
          rest: "90sec",
          cues: [
            "Start tall",
            "Control descent",
            "Feel hamstrings",
            "Drive back up"
          ]
        },
        {
          name: "Standing Calf Raise",
          sets: 3,
          reps: "15-20",
          progression: "Increase weight when ROM maintained",
          notes: "Focus on calf power",
          tempo: "1-1-1",
          rest: "60sec",
          cues: [
            "Full range",
            "Hold stretch",
            "Explosive up",
            "Control down"
          ]
        },
        {
          name: "Weighted Carry Complex",
          sets: 2,
          reps: "30m each: farmers, rack, overhead",
          progression: "Increase weight when position maintained",
          notes: "Focus on loaded movement",
          tempo: "Steady",
          rest: "90sec",
          cues: [
            "Brace core",
            "Maintain posture",
            "Breathe rhythm",
            "Steps controlled"
          ]
        }
      ]
    }
  ],
  // Week 2
  [
    {
      dayNumber: 1,
      focus: "Upper Body Strength & Power",
      exercises: [
        {
          name: "Med Ball Rotational Throw",
          sets: 4,
          reps: "5 each side",
          progression: "Increase ball weight when power consistent",
          notes: "Focus on rotational power",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Load through hips",
            "Transfer ground force",
            "Sequential rotation",
            "Full follow through"
          ]
        },
        {
          name: "Floor Press",
          sets: 5,
          reps: "4-6",
          progression: "2.5kg increase when lockout strong",
          notes: "Focus on pressing power from dead stop",
          tempo: "2-1-X",
          rest: "2-3min",
          cues: [
            "Set shoulder blades",
            "Tuck elbows",
            "Pause at floor",
            "Explosive drive"
          ]
        },
        {
          name: "Meadows Row",
          sets: 4,
          reps: "8-10 each side",
          progression: "Add weight when form stable",
          notes: "Focus on unilateral back development",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Hinge at hips",
            "Lead with elbow",
            "Control rotation",
            "Full range"
          ]
        },
        {
          name: "Push Press",
          sets: 4,
          reps: "5-6",
          progression: "2kg increase when power transfer smooth",
          notes: "Focus on total body power development",
          tempo: "2-0-X",
          rest: "2min",
          cues: [
            "Quick dip drive",
            "Transfer power",
            "Vertical bar path",
            "Control return"
          ]
        },
        {
          name: "Seal Row",
        sets: 3,
        reps: "10-12",
        progression: "Increase weight when ROM full",
        notes: "Focus on isolated back development",
        tempo: "2-1-2",
        rest: "90sec",
        cues: [
          "Set position on bench",
          "Pull with elbows wide",
          "Squeeze at top",
          "Control descent"
        ]
      },
      {
        name: "Rolling Tricep Extension",
        sets: 3,
        reps: "12-15",
        progression: "Add weight when control perfect",
        notes: "Focus on triceps development",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Keep elbows in",
          "Roll smooth",
          "Full extension",
          "Control return"
        ]
      },
      {
        name: "Y-Raise Complex",
        sets: 3,
        reps: "12 each position",
        progression: "Increase weight when form stable",
        notes: "Focus on shoulder health and stability",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Start arms low",
          "Raise in Y pattern",
          "Control through arc",
          "Lower with purpose"
        ]
      }
    ]
  },
  {
    dayNumber: 2,
    focus: "Lower Body Power & Technical",
    exercises: [
      {
        name: "Hurdle Hop Series",
        sets: 4,
        reps: "3 each variation",
        progression: "Increase hurdle height when clearance good",
        notes: "Linear, lateral, rotational variations",
        tempo: "X-0-X",
        rest: "2min",
        cues: [
          "Stay tall throughout",
          "Quick ground contact",
          "Use arms for balance",
          "Land soft and ready"
        ]
      },
      {
        name: "Safety Bar Squat",
        sets: 5,
        reps: "4-6",
        progression: "5kg increase when form perfect",
        notes: "Focus on upright posture and quad development",
        tempo: "3-1-X",
        rest: "3min",
        cues: [
          "Chest tall",
          "Elbows drive down",
          "Control descent",
          "Power from midfoot"
        ]
      },
      {
        name: "Clean Pull",
        sets: 4,
        reps: "5",
        progression: "Add weight when extension powerful",
        notes: "Focus on explosive triple extension",
        tempo: "2-0-X",
        rest: "2min",
        cues: [
          "Start over midfoot",
          "Patient off floor",
          "Violent extension",
          "Tall finish"
        ]
      },
      {
        name: "Single Leg Press",
        sets: 3,
        reps: "10-12 each",
        progression: "Increase load when ROM consistent",
        notes: "Focus on unilateral leg development",
        tempo: "2-1-2",
        rest: "90sec",
        cues: [
          "Control descent",
          "Keep knee aligned",
          "Full range",
          "Drive through midfoot"
        ]
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "12-15",
        progression: "Add weight when peak contraction strong",
        notes: "Focus on hamstring isolation",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Initiate with hamstrings",
          "Full contraction",
          "Control return",
          "Feel stretch"
        ]
      },
      {
        name: "Tibialis Raise",
        sets: 3,
        reps: "15-20",
        progression: "Increase resistance when control solid",
        notes: "Focus on shin strength and ankle stability",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Keep heel planted",
          "Dorsiflexion focus",
          "Full range motion",
          "Control throughout"
        ]
      },
      {
        name: "Side Plank Complex",
        sets: 2,
        reps: "45s holds + 10 leg raises each",
        progression: "Add time or reps when stable",
        notes: "Focus on lateral chain development",
        tempo: "Controlled",
        rest: "60sec",
        cues: [
          "Stack shoulders and hips",
          "Brace core tight",
          "Control leg movement",
          "Maintain alignment"
        ]
      }
    ]
  },
  {
    dayNumber: 4,
    focus: "Upper Body Technical & Volume",
    exercises: [
      {
        name: "Clap Push-Up",
        sets: 4,
        reps: "4-5",
        progression: "Add clap height when explosive",
        notes: "Focus on explosive pressing power",
        tempo: "X-0-X",
        rest: "2min",
        cues: [
          "Create tension",
          "Explosive drive",
          "Quick hand return",
          "Soft landing"
        ]
      },
      {
        name: "Incline DB Press",
        sets: 5,
        reps: "6-8",
        progression: "2.5kg increase when control perfect",
        notes: "Focus on upper chest development",
        tempo: "3-1-2",
        rest: "2min",
        cues: [
          "Set shoulder blades",
          "Control arc path",
          "Feel chest stretch",
          "Drive elbows under"
        ]
      },
      {
        name: "Single Arm DB Row",
        sets: 4,
        reps: "10-12 each",
        progression: "Add weight when position stable",
        notes: "Focus on unilateral back strength",
        tempo: "2-0-2",
        rest: "90sec",
        cues: [
          "Set hip hinge",
          "Initiate with lat",
          "Full range pull",
          "Control return"
        ]
      },
      {
        name: "Landmine Press",
        sets: 4,
        reps: "8-10 each",
        progression: "Increase load when path smooth",
        notes: "Focus on shoulder friendly pressing",
        tempo: "2-1-2",
        rest: "90sec",
        cues: [
          "Brace core",
          "Control arc path",
          "Lock out top",
          "Smooth return"
        ]
      },
      {
        name: "Prone Y Raise",
        sets: 3,
        reps: "12-15",
        progression: "Add weight when form perfect",
        notes: "Focus on upper back and rear delt",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Set position on bench",
          "Lead with thumbs up",
          "Wide arc raise",
          "Control descent"
        ]
      },
      {
        name: "Spider Curl",
        sets: 3,
        reps: "12-15",
        progression: "Increase weight when peak strong",
        notes: "Focus on bicep peak contraction",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Keep upper arms still",
          "Curl with control",
          "Squeeze peak",
          "Lower slowly"
        ]
      },
      {
        name: "Band Pull Apart Series",
        sets: 2,
        reps: "15 each variation",
        progression: "Increase band tension when easy",
        notes: "Standard, high, low angles",
        tempo: "2-1-2",
        rest: "45sec",
        cues: [
          "Set shoulder blades",
          "Control tension",
          "Full range",
          "Hold end range"
        ]
      }
    ]
  },
  {
    dayNumber: 5,
    focus: "Lower Body Technical & Strength",
    exercises: [
      {
        name: "Box Jump to Stick",
        sets: 4,
        reps: "4",
        progression: "Increase height when landing stable",
        notes: "Focus on power and control",
        tempo: "X-0-X",
        rest: "2min",
        cues: [
          "Load hips back",
          "Explosive jump",
          "Soft landing",
          "Hold position"
        ]
      },
      {
        name: "Pause Back Squat",
        sets: 5,
        reps: "3-5",
        progression: "2.5kg increase when drive strong",
        notes: "2-second pause at bottom",
        tempo: "3-2-X",
        rest: "3min",
        cues: [
          "Control descent",
          "Hold tight",
          "Drive out strong",
          "Maintain posture"
        ]
      },
      {
        name: "Snatch Grip RDL",
        sets: 4,
        reps: "6-8",
        progression: "Add weight when hinge perfect",
        notes: "Focus on posterior chain",
        tempo: "3-0-2",
        rest: "2min",
        cues: [
          "Wide grip set",
          "Hip hinge back",
          "Feel hamstrings",
          "Control bar path"
        ]
      },
      {
        name: "Bulgarian Split Squat",
        sets: 3,
        reps: "8-10 each",
        progression: "Increase load when balance solid",
        notes: "Focus on single leg strength",
        tempo: "2-1-2",
        rest: "90sec",
        cues: [
          "Set stance length",
          "Control knee track",
          "Stay tall",
          "Drive through front foot"
        ]
      },
      {
        name: "45° Back Extension",
        sets: 3,
        reps: "12-15",
        progression: "Add weight when control perfect",
        notes: "Focus on back extensor strength",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Hinge at hips",
          "Maintain neutral spine",
          "Squeeze glutes",
          "Control movement"
        ]
      },
      {
        name: "Seated Calf Raise",
        sets: 3,
        reps: "15-20",
        progression: "Add load when ROM maintained",
        notes: "Focus on soleus development",
        tempo: "2-1-2",
        rest: "60sec",
        cues: [
          "Full stretch bottom",
          "Drive balls of feet",
          "Peak contraction",
          "Control lower"
        ]
      },
      {
        name: "Suitcase Hold Walk",
        sets: 2,
        reps: "30m each side",
        progression: "Increase weight when position stable",
        notes: "Focus on lateral core stability",
        tempo: "Controlled",
        rest: "60sec",
        cues: [
          "Resist side bend",
          "Brace core",
          "Maintain posture",
          "Breathe steady"
        ]
      }
    ]
  }
]
]);

 
const generate4DayBodyweightWorkout = () => ([
  // Week 1
  [
    {
      dayNumber: 1,
      focus: "Push Focus + Power",
      exercises: [
        {
          name: "Clap Push-Up Progression",
          sets: 4,
          reps: "4-6",
          progression: "Progress through: regular clap → triple clap → clap behind → superman",
          notes: "Focus on explosive power. Quality over quantity.",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Create full body tension",
            "Drive ground away explosively",
            "Quick hand movements",
            "Soft landing control"
          ]
        },
        {
          name: "Pike Push-Up Progression",
          sets: 4,
          reps: "6-8",
          progression: "Progress through: pike → elevated pike → wall handstand → free handstand",
          notes: "Build toward handstand push-up",
          tempo: "3-0-2",
          rest: "2min",
          cues: [
            "Stack shoulders over hands",
            "Keep elbows in",
            "Control descent",
            "Full range of motion"
          ]
        },
        {
          name: "Archer Push-Up",
          sets: 3,
          reps: "6-8 each side",
          progression: "Increase range of motion to full archer",
          notes: "Focus on unilateral strength",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Wide hand position",
            "Shift weight smoothly",
            "Keep core tight",
            "Full range each side"
          ]
        },
        {
          name: "Pseudo Planche Push-Up",
          sets: 3,
          reps: "8-10",
          progression: "Progress hand position further back",
          notes: "Build straight arm strength",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Turn hands out slightly",
            "Lean forward",
            "Keep arms straight",
            "Maintain hollow body"
          ]
        },
        {
          name: "Ring Turn Out Push-Up",
          sets: 3,
          reps: "8-12",
          progression: "Increase turnout angle progressively",
          notes: "Focus on stabilization and control",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Start rings neutral",
            "Turn out at bottom",
            "Keep elbows in",
            "Control through full ROM"
          ]
        },
        {
          name: "Planche Lean Progression",
          sets: 4,
          reps: "20-30s",
          progression: "Increase lean angle progressively",
          notes: "Build straight arm scapular strength",
          tempo: "Hold",
          rest: "60sec",
          cues: [
            "Lock arms straight",
            "Push ground away",
            "Round upper back",
            "Engage core fully"
          ]
        },
        {
          name: "L-Sit Progression",
          sets: 3,
          reps: "Max hold",
          progression: "Tuck → One leg → Full L-sit",
          notes: "Focus on compression strength",
          tempo: "Hold",
          rest: "90sec",
          cues: [
            "Push down hard",
            "Retract shoulders",
            "Point toes",
            "Keep arms straight"
          ]
        }
      ]
    },
    {
      dayNumber: 2,
      focus: "Pull Focus + Power",
      exercises: [
        {
          name: "Explosive Pull-Up",
          sets: 4,
          reps: "4-6",
          progression: "Progress through: chest height → sternum → waist",
          notes: "Focus on explosive power",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Start from dead hang",
            "Pull explosively",
            "Drive elbows down",
            "Control descent"
          ]
        },
        {
          name: "Front Lever Row Progression",
          sets: 4,
          reps: "6-8",
          progression: "Tuck → Adv. Tuck → Straddle → Full",
          notes: "Build horizontal pulling strength",
          tempo: "2-1-2",
          rest: "2min",
          cues: [
            "Maintain body position",
            "Pull through rings",
            "Keep arms straight",
            "Control return"
          ]
        },
        {
          name: "Archer Pull-Up",
          sets: 3,
          reps: "5-7 each side",
          progression: "Increase range of motion to full archer",
          notes: "Focus on unilateral strength",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Start centered",
            "Shift weight smoothly",
            "Full ROM working side",
            "Control tempo"
          ]
        },
        {
          name: "Wide Ring Row",
          sets: 3,
          reps: "8-12",
          progression: "Lower body angle for difficulty",
          notes: "Focus on back width development",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Set hollow body",
            "Wide hand position",
            "Pull elbows wide",
            "Squeeze at top"
          ]
        },
        {
          name: "Face Pull Progression",
          sets: 3,
          reps: "12-15",
          progression: "Increase lean angle backwards",
          notes: "Build rear delt and rotator strength",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Pull to forehead",
            "Lead with elbows",
            "External rotate finish",
            "Control return"
          ]
        },
        {
          name: "Back Lever Progression",
          sets: 4,
          reps: "10-20s hold",
          progression: "Tuck → Single Leg → Straddle → Full",
          notes: "Focus on straight arm strength",
          tempo: "Hold",
          rest: "90sec",
          cues: [
            "Lock arms straight",
            "Squeeze shoulder blades",
            "Maintain body line",
            "Control position"
          ]
        },
        {
          name: "Commando Pull-Up",
          sets: 3,
          reps: "6-8 each side",
          progression: "Increase speed while maintaining control",
          notes: "Build pulling power and coordination",
          tempo: "2-0-2",
          rest: "60sec",
          cues: [
            "Alternate sides smoothly",
            "Pull high each rep",
            "Keep core tight",
            "Control movement"
          ]
        }
      ]
    },
    {
      dayNumber: 4,
      focus: "Legs Focus + Power",
      exercises: [
        {
          name: "Box Jump Progression",
          sets: 4,
          reps: "5",
          progression: "Increase height progressively",
          notes: "Focus on explosive power",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Load hips and arms",
            "Explode up",
            "Land soft",
            "Step down reset"
          ]
        },
        {
          name: "Pistol Squat Progression",
          sets: 4,
          reps: "5-7 each leg",
          progression: "Assisted → Box → Full → Weighted",
          notes: "Build single leg strength",
          tempo: "3-1-2",
          rest: "2min",
          cues: [
            "Keep heel down",
            "Control descent",
            "Chest up tall",
            "Balance midfoot"
          ]
        },
        {
          name: "Shrimp Squat Progression",
          sets: 3,
          reps: "6-8 each leg",
          progression: "Basic → Advanced → Full",
          notes: "Focus on posterior chain",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Stay tall",
            "Control knee tap",
            "Drive up strong",
            "Maintain balance"
          ]
        },
        {
          name: "Natural Hamstring Curl",
          sets: 3,
          reps: "6-10",
          progression: "Band assisted → Eccentric → Full",
          notes: "Build hamstring strength",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Lock hips extended",
            "Lower with control",
            "Keep tension",
            "Use hands if needed"
          ]
        },
        {
          name: "Split Squat Jump",
          sets: 3,
          reps: "6 each leg",
          progression: "Increase jump height",
          notes: "Develop single leg power",
          tempo: "X-0-X",
          rest: "60sec",
          cues: [
            "Athletic stance",
            "Drive through front leg",
            "Switch legs mid-air",
            "Land soft control"
          ]
        },
        {
          name: "Sliding Leg Curl",
          sets: 3,
          reps: "12-15",
          progression: "Two legs → Single leg",
          notes: "Focus on hamstring control",
          tempo: "2-1-2",
          rest: "60sec",
          cues: [
            "Bridge hips up",
            "Slide with control",
            "Keep hips up",
            "Feel hamstrings"
          ]
        },
        {
          name: "Calf Raise Progression",
          sets: 3,
          reps: "15-20 each leg",
          progression: "Two legs → Single leg → Jump emphasis",
          notes: "Build calf strength and power",
          tempo: "2-1-2",
          rest: "45sec",
          cues: [
            "Full range motion",
            "Hold top squeeze",
            "Control descent",
            "Feel stretch bottom"
          ]
        }
      ]
    },
    {
      dayNumber: 5,
      focus: "Full Body Integration",
      exercises: [
        {
          name: "Muscle Up Progression",
          sets: 4,
          reps: "3-5",
          progression: "Deep pull-up → Explosive pull-up → Transition → Full",
          notes: "Focus on power and technique",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "False grip setup",
            "Pull explosively",
            "Quick transition",
            "Lock out dip"
          ]
        },
        {
          name: "Handstand Push-Up Progression",
          sets: 4,
          reps: "5-7",
          progression: "Pike → Wall → Free → Deficit",
          notes: "Build overhead pressing strength",
          tempo: "2-1-2",
          rest: "2min",
          cues: [
            "Stack alignment",
            "Control descent",
            "Press through fingers",
            "Maintain tension"
          ]
        },
        {
          name: "Ring Muscle Up Transition",
          sets: 3,
          reps: "5-7",
          progression: "False grip hang → Pull → Transition",
          notes: "Focus on transition technique",
          tempo: "2-0-2",
          rest: "90sec",
          cues: [
            "Set false grip",
            "Pull to nipples",
            "Turn rings out",
            "Press to support"
          ]
        },
        {
          name: "Front Lever Progression",
          sets: 4,
          reps: "10-15s",
          progression: "Tuck → Adv. Tuck → Single Leg → Full",
          notes: "Build straight arm strength",
          tempo: "Hold",
          rest: "90sec",
          cues: [
            "Retract shoulders",
            "Lock arms straight",
            "Maintain body line",
            "Point toes"
          ]
        },
        {
          name: "Ring Flow Sequence",
          sets: 3,
          reps: "30-45s work",
          progression: "Add complexity to movements",
          notes: "Focus on smooth transitions",
          tempo: "Flow",
          rest: "60sec",
          cues: [
            "Stay controlled",
            "Link movements",
            "Maintain tension",
            "Breathe rhythm"
          ]
        },
        {
          name: "Handstand Practice",
          sets: 4,
          reps: "30-45s work",
          progression: "Wall → Free → Walking → Pirouettes",
          notes: "Build balance and control",
          tempo: "Practice",
          rest: "60sec",
          cues: [
            "Find balance point",
            "Tight body line",
            "Light finger control",
            "Stay relaxed"
          ]
        },
        {
          name: "L-Sit to Handstand",
          sets: 3,
          reps: "2-3 attempts",
          progression: "Tuck → L-sit → V-sit press",
          notes: "Focus on press strength",
          tempo: "Controlled",
          rest: "90sec",
          cues: [
            "Compress tight",
            "Press through shoulders",
            "Keep arms straight",
            "Control balance"
          ]
        }
      ]
    }
  ],
  // Week 2
  [
    {
      dayNumber: 1,
      focus: "Push Strength & Control",
      exercises: [
        {
          name: "Plyometric Push-Up Complex",
          sets: 4,
          reps: "3 each type",
          progression: "Regular → Diamond → Wide → Superman",
          notes: "Build pushing power variations",
          tempo: "X-0-X",
          rest: "2min",
          cues: [
            "Maximum explosion",
            "Different hand positions",
            "Full ROM each type",
            "Stick landings"
          ]
        },
        {
          name: "Ring Push-Up Progression",
          sets: 4,
          reps: "6-8",
          progression: "Regular → RTO → Archer → Bulgarian",
          notes: "Focus on stabilization strength",
          tempo: "3-0-2",
          rest: "2min",
          cues: [
            "Set rings width",
            "Control turnout",
            "Keep tension",
            "Full depth"
          ]
        },
        {
          name: "One Arm Push-Up Progression",
          sets: 3,
          reps: "4-6 each",
          progression: "Archer → Counter-balance → Full",
          notes: "Build unilateral strength",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
            "Wide foot stance",
            "Keep hips level",
            "Control rotation",
            "Full range"
          ]
        },
        {
          name: "Tiger Bend Push-Up",
          sets: 3,
          reps: "6-8",
          progression: "Negative → Assisted → Full",
          notes: "Build straight arm strength",
          tempo: "2-1-2",
          rest: "90sec",
          cues: [
              "Start in diamond",
              "Bend at elbows",
              "Press to straight",
              "Control movement",
              "Maintain body line"
            ]
          },
          {
            name: "Korean Dips",
            sets: 3,
            reps: "8-12",
            progression: "Regular dips → Korean → Full straight",
            notes: "Focus on straight arm strength",
            tempo: "2-1-2",
            rest: "90sec",
            cues: [
              "Lock arms start",
              "Lean forward",
              "Keep shoulders down",
              "Control descent"
            ]
          },
          {
            name: "Tuck Planche Hold",
            sets: 4,
            reps: "15-20s",
            progression: "Tuck → Adv. Tuck → One Leg → Straddle",
            notes: "Build planche foundation",
            tempo: "Hold",
            rest: "60sec",
            cues: [
              "Protract shoulders",
              "Round upper back",
              "Lock arms straight",
              "Keep core tight"
            ]
          },
          {
            name: "Ring Support Hold",
            sets: 3,
            reps: "30s",
            progression: "Support → RTO → Lean → Press",
            notes: "Build stabilization strength",
            tempo: "Hold",
            rest: "60sec",
            cues: [
              "Lock arms",
              "Turn rings out",
              "Depress shoulders",
              "Maintain position"
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        focus: "Pull Mastery & Control",
        exercises: [
          {
            name: "Russian Pull-Up Series",
            sets: 4,
            reps: "3 each variation",
            progression: "Regular → Wide → Close → Behind",
            notes: "Focus on pulling power variants",
            tempo: "X-0-X",
            rest: "2min",
            cues: [
              "Explosive movement",
              "Different grips",
              "Full ROM each",
              "Control descent"
            ]
          },
          {
            name: "One Arm Pull-Up Progression",
            sets: 4,
            reps: "4-6 each",
            progression: "Mixed grip → Archer → Assisted → Full",
            notes: "Build unilateral strength",
            tempo: "2-1-2",
            rest: "2min",
            cues: [
              "Lock off positions",
              "Control rotation",
              "Stay tight",
              "Full range"
            ]
          },
          {
            name: "Front Lever Raises",
            sets: 3,
            reps: "6-8",
            progression: "Tuck → Straddle → Full",
            notes: "Dynamic front lever strength",
            tempo: "2-1-2",
            rest: "90sec",
            cues: [
              "Start in hang",
              "Pull to horizon",
              "Keep arms straight",
              "Lower controlled"
            ]
          },
          {
            name: "Ring Muscle-Up Progression",
            sets: 3,
            reps: "3-5",
            progression: "Deep pull → Transition → Full",
            notes: "Technical ring strength",
            tempo: "X-0-X",
            rest: "2min",
            cues: [
              "False grip set",
              "Pull to chest",
              "Quick turnover",
              "Smooth press"
            ]
          },
          {
            name: "L-Sit Pull-Up",
            sets: 3,
            reps: "6-8",
            progression: "Tuck → L-sit → V-sit",
            notes: "Build compressed strength",
            tempo: "2-1-2",
            rest: "90sec",
            cues: [
              "Maintain leg position",
              "Full pull range",
              "Keep core tight",
              "Control tempo"
            ]
          },
          {
            name: "Victorian Cross Progression",
            sets: 4,
            reps: "10-15s",
            progression: "Support holds → Lean → Negative",
            notes: "Build advanced ring strength",
            tempo: "Hold",
            rest: "90sec",
            cues: [
              "Lock arms",
              "Lean forward",
              "Maintain tension",
              "Control position"
            ]
          }
        ]
      },
      {
        dayNumber: 4,
        focus: "Dynamic Leg Control",
        exercises: [
          {
            name: "Depth Jump Complex",
            sets: 4,
            reps: "3 each variation",
            progression: "Squat land → Single leg → Reactive",
            notes: "Build landing mechanics",
            tempo: "X-0-X",
            rest: "2min",
            cues: [
              "Drop don't jump",
              "Soft quiet land",
              "React quickly",
              "Stay controlled"
            ]
          },
          {
            name: "Advanced Pistol Complex",
            sets: 4,
            reps: "4-6 each",
            progression: "Regular → Jump → Deficit",
            notes: "Single leg mastery",
            tempo: "2-1-2",
            rest: "2min",
            cues: [
              "Keep heel down",
              "Straight leg hold",
              "Control depth",
              "Power up"
            ]
          },
          {
            name: "Sissy Squat",
            sets: 3,
            reps: "8-10",
            progression: "Assisted → Free → Dynamic",
            notes: "Build quad strength",
            tempo: "3-1-2",
            rest: "90sec",
            cues: [
              "Vertical shin",
              "Keep chest up",
              "Feel quad stretch",
              "Control movement"
            ]
          },
          {
            name: "Dragon Pistol",
            sets: 3,
            reps: "4-6 each",
            progression: "Assisted → Negative → Full",
            notes: "Advanced single leg control",
            tempo: "3-1-2",
            rest: "90sec",
            cues: [
              "Back leg bent",
              "Front leg straight",
              "Control rotation",
              "Stay balanced"
            ]
          },
          {
            name: "Matrix Squat",
            sets: 3,
            reps: "6-8 each",
            progression: "Assisted → Negative → Full",
            notes: "Build 3D leg strength",
            tempo: "2-1-2",
            rest: "90sec",
            cues: [
              "Control side lean",
              "Keep base foot flat",
              "Maintain alignment",
              "Smooth movement"
            ]
          },
          {
            name: "Nordic Curl",
            sets: 3,
            reps: "4-6",
            progression: "Negative → Assisted → Full",
            notes: "Build hamstring strength",
            tempo: "4-0-1",
            rest: "90sec",
            cues: [
              "Lock hips",
              "Resist descent",
              "Keep tension",
              "Control eccentric"
            ]
          }
        ]
      },
      {
        dayNumber: 5,
        focus: "Advanced Integration",
        exercises: [
          {
            name: "360 Pull-Up",
            sets: 4,
            reps: "2-3 each direction",
            progression: "90° → 180° → 360°",
            notes: "Build rotational control",
            tempo: "X-0-X",
            rest: "2min",
            cues: [
              "Start explosive pull",
              "Initiate rotation",
              "Spot landing",
              "Control catch"
            ]
          },
          {
            name: "90° Push-Up",
            sets: 4,
            reps: "3-4 each side",
            progression: "Quarter → Half → Full turn",
            notes: "Build turning push power",
            tempo: "X-0-X",
            rest: "2min",
            cues: [
              "Explosive drive",
              "Turn mid-air",
              "Land soft",
              "Stay controlled"
            ]
          },
          {
            name: "Planche to Handstand",
            sets: 3,
            reps: "2-3",
            progression: "Tuck → Straddle → Full",
            notes: "Advanced straight arm strength",
            tempo: "Controlled",
            rest: "2min",
            cues: [
              "Start in planche",
              "Press through shoulders",
              "Find balance",
              "Control movement"
            ]
          },
          {
            name: "Front Lever to Back Lever",
            sets: 3,
            reps: "2-3",
            progression: "Tuck → Single leg → Full",
            notes: "Build lever transitions",
            tempo: "Controlled",
            rest: "90sec",
            cues: [
              "Maintain tension",
              "Smooth transition",
              "Keep arms straight",
              "Control rotation"
            ]
          },
          {
            name: "Ring Flow Complex",
            sets: 3,
            reps: "45-60s",
            progression: "Basic → Intermediate → Advanced flows",
            notes: "Build flow mastery",
            tempo: "Flow",
            rest: "90sec",
            cues: [
              "Link movements",
              "Stay controlled",
              "Maintain tension",
              "Smooth transitions"
            ]
          },
          {
            name: "Handstand Push-Up Flow",
            sets: 3,
            reps: "3-4 flows",
            progression: "Press → HSPU → Pirouette",
            notes: "Advanced handstand work",
            tempo: "Controlled",
            rest: "90sec",
            cues: [
              "Find balance",
              "Control pressing",
              "Smooth turns",
              "Stay tight"
            ]
          }
        ]
      }
    ]
  ]);
 

 const workoutPlans = [
  {
      id: "wp_1day",
      name: "1-Day Athletic Foundation",
      frequency: "1day",
      weeks: Array(6).fill().map((_, i) => generate1DayWorkout()[i % 2])
  },
  {
      id: "wp_2day",
      name: "2-Day Power Development",
      frequency: "2day",
      weeks: Array(6).fill().map((_, i) => generate2DayWorkout()[i % 2])
  },
  {
      id: "wp_3day",
      name: "3-Day Complete Athlete",
      frequency: "3day",
      weeks: Array(6).fill().map((_, i) => generate3DayWorkout()[i % 2])
  },
  {
      id: "wp_4day_gym",
      name: "4-Day Athletic Performance",
      frequency: "4day",
      weeks: Array(6).fill().map((_, i) => generate3DayWorkout()[i % 2])
  },
  {
      id: "wp_4day_bw",
      name: "4-Day Bodyweight Mastery",
      frequency: "4day",
      weeks: Array(6).fill().map((_, i) => generate4DayBodyweightWorkout()[i % 2])
  }
];

const dietPlans = [
  {
    id: "dp_1500",
    name: "Aggressive Cut - 1500kcal",
    calories: 1500,
    weekCycle: [
      // Day 1
      [
        {
          name: "Shakshouka with Lamb",
          timing: "Early morning (ideal pre-workout)",
          calories: 375,
          protein: 35,
          carbs: 25,
          fats: 15,
          ingredients: [
            "100g lean ground lamb",
            "2 whole eggs",
            "100g bell peppers",
            "50g onions",
            "50g tomatoes",
            "10g olive oil",
            "Spices: cumin, paprika, cayenne, black pepper, turmeric",
            "Fresh parsley and mint",
            "Salt to taste"
          ],
          instructions: [
            "Brown lamb with spices 5min",
            "Add diced vegetables, cook 5min",
            "Create wells for eggs",
            "Cover and cook 3min",
            "Garnish with herbs"
          ],
          notes: "Can prepare vegetables night before. Works well pre or post workout. Can substitute lamb with beef. Add extra chili for metabolism boost."
        },
        {
          name: "Tandoori Chicken Rice Bowl",
          timing: "Mid-day (perfect post-workout)",
          calories: 375,
          protein: 40,
          carbs: 35,
          fats: 12,
          ingredients: [
            "160g chicken breast",
            "70g basmati rice (dry)",
            "100g mixed vegetables",
            "15g olive oil",
            "Tandoori spice mix: garam masala, red chili, turmeric, cumin, coriander",
            "2 tbsp low-fat yogurt",
            "Fresh coriander",
            "Lemon wedge"
          ],
          instructions: [
            "Marinate chicken in yogurt & spices",
            "Cook rice with turmeric",
            "Grill chicken 6-7min each side",
            "Steam vegetables",
            "Combine and garnish"
          ],
          notes: "Prep marinade night before for better flavor. High protein for muscle recovery. Can substitute chicken with fish. Add raita for digestion."
        },
        {
          name: "Persian Style Beef Kebab",
          timing: "Late afternoon/evening",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g lean ground beef",
            "60g brown rice",
            "100g grilled tomatoes",
            "50g onions",
            "Spices: sumac, black pepper, cumin, coriander",
            "Fresh mint and parsley",
            "10g olive oil",
            "Lemon wedge"
          ],
          instructions: [
            "Mix beef with spices",
            "Form into kebabs",
            "Cook rice",
            "Grill kebabs 4min each side",
            "Serve with grilled vegetables"
          ],
          notes: "Can meal prep several days worth. Perfect pre-workout dinner. Substitute beef with lamb. Sumac aids digestion."
        },
        {
          name: "Protein Date Shake",
          timing: "Any time (ideal pre/post workout)",
          calories: 375,
          protein: 35,
          carbs: 35,
          fats: 13,
          ingredients: [
            "30g halal whey protein",
            "3 medjool dates",
            "25g almonds",
            "200ml almond milk",
            "5g chia seeds",
            "Spices: cinnamon, cardamom",
            "Ice cubes"
          ],
          instructions: [
            "Blend all ingredients",
            "Add ice and blend again",
            "Adjust thickness with milk"
          ],
          notes: "Quick energy boost. Ideal pre or post workout. Can use casein protein for night time. Dates provide natural energy."
        }
      ],
      // Day 2
      [
        {
          name: "Masala Egg White Biryani Bowl",
          timing: "Early morning",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "200g egg whites",
            "1 whole egg",
            "70g cauliflower rice",
            "50g peas",
            "Biryani spices: cumin, cardamom, coriander, turmeric",
            "10g ghee",
            "Fresh mint",
            "Red onion for garnish"
          ],
          instructions: [
            "Sauté spices in ghee",
            "Add cauliflower rice",
            "Pour in beaten eggs",
            "Scramble until set",
            "Garnish with mint"
          ],
          notes: "Low carb breakfast option. Rich in spices for metabolism. Can add chicken for extra protein. Prep vegetables night before."
        },
        {
          name: "Moroccan Chicken Salad",
          timing: "Mid-day",
          calories: 375,
          protein: 40,
          carbs: 25,
          fats: 15,
          ingredients: [
            "170g chicken breast",
            "100g mixed greens",
            "50g chickpeas",
            "30g red onion",
            "Moroccan spices: ras el hanout, cumin, cinnamon",
            "15g olive oil",
            "Fresh coriander",
            "Lemon juice"
          ],
          instructions: [
            "Season chicken with spices",
            "Grill chicken until done",
            "Combine salad ingredients",
            "Dress with olive oil and lemon",
            "Slice chicken and top"
          ],
          notes: "Can prep chicken in advance. Light but filling. Add quinoa if more carbs needed. Ras el hanout boosts metabolism."
        },
        {
          name: "Turkish Kofta with Bulgur",
          timing: "Evening meal",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g lean lamb mince",
            "50g bulgur wheat",
            "100g mixed vegetables",
            "Spices: baharat, sumac, mint, parsley",
            "1 small onion",
            "10g olive oil",
            "Greek yogurt for serving"
          ],
          instructions: [
            "Mix lamb with spices",
            "Form into kofta",
            "Cook bulgur wheat",
            "Grill kofta 4min each side",
            "Serve with yogurt"
          ],
          notes: "Can be meal prepped. Rich in iron. Can substitute lamb with beef. Baharat aids digestion."
        },
        {
          name: "Protein Power Balls",
          timing: "Any time snack",
          calories: 375,
          protein: 30,
          carbs: 35,
          fats: 15,
          ingredients: [
            "30g halal whey protein",
            "50g almond butter",
            "30g dates",
            "20g pistachios",
            "Spices: cardamom, cinnamon",
            "Pinch of sea salt"
          ],
          instructions: [
            "Process dates until smooth",
            "Mix in all ingredients",
            "Form into balls",
            "Chill for 30min"
          ],
          notes: "Make batch for week. Great pre-workout. Can use different nuts. Add cocoa powder for variety."
        }
      ],
      // Day 3
      [
        {
          name: "Arabian Breakfast Hash",
          timing: "Early morning",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g turkey breast",
            "100g sweet potato",
            "2 whole eggs",
            "50g onions",
            "Middle Eastern spices: zaatar, sumac, thyme",
            "10g olive oil",
            "Fresh parsley"
          ],
          instructions: [
            "Dice and spice turkey",
            "Cook sweet potato",
            "Combine with turkey",
            "Add eggs on top",
            "Garnish with zaatar"
          ],
          notes: "Prep potatoes night before. Rich in antioxidants from zaatar. Can use chicken instead of turkey."
        },
        // Continue with remaining meals for day 3
        
          // Day 3 continued
          {
            name: "Spiced Salmon Bowl",
            timing: "Lunch",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "170g salmon fillet",
              "70g brown rice",
              "100g mixed vegetables",
              "10g olive oil",
              "Spices: sumac, za'atar, lemon pepper",
              "Fresh dill",
              "Lemon wedge",
              "Greek yogurt for serving"
            ],
            instructions: [
              "Season salmon with spices",
              "Pan sear salmon 4min each side",
              "Cook rice and vegetables",
              "Combine and add yogurt sauce",
              "Garnish with dill"
            ],
            notes: "Rich in omega-3s. Perfect post-workout. Can meal prep rice ahead. Add chili flakes for heat."
          },
          {
            name: "Beef Shawarma Plate",
            timing: "Dinner",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "150g lean beef strips",
              "100g cauliflower rice",
              "50g mixed peppers",
              "30g onions",
              "Shawarma spices: cumin, coriander, cardamom, turmeric",
              "10g olive oil",
              "Tahini sauce (1 tbsp)",
              "Fresh parsley"
            ],
            instructions: [
              "Marinate beef in spices",
              "Grill beef strips",
              "Sauté vegetables",
              "Cook cauliflower rice",
              "Drizzle with tahini"
            ],
            notes: "Low-carb dinner option. Can use chicken instead. Make extra spice mix for next time."
          },
          {
            name: "Turkish Protein Pudding",
            timing: "Snack",
            calories: 375,
            protein: 30,
            carbs: 35,
            fats: 15,
            ingredients: [
              "30g halal whey protein",
              "200ml almond milk",
              "20g cornstarch",
              "2 medjool dates",
              "15g pistachios",
              "Spices: cinnamon, mastic (optional), vanilla"
            ],
            instructions: [
              "Mix protein, cornstarch, and milk",
              "Heat while stirring until thick",
              "Add spices and cool",
              "Top with crushed pistachios"
            ],
            notes: "Great pre-bed snack. Can use casein protein. Make ahead and refrigerate."
          }
        ],
        // Day 4
        [
          {
            name: "High Protein Yogurt Bowl",
            timing: "Breakfast",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "250g Greek yogurt",
              "30g granola",
              "20g mixed nuts",
              "100g mixed berries",
              "1 tbsp honey",
              "Spices: cinnamon, cardamom",
              "Mint leaves for garnish"
            ],
            instructions: [
              "Layer yogurt in bowl",
              "Add granola and nuts",
              "Top with berries",
              "Drizzle honey and spices"
            ],
            notes: "Quick breakfast. Can prep portions night before. Add protein powder if needed."
          },
          {
            name: "Lebanese Chicken Tabbouleh",
            timing: "Lunch",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "160g chicken breast",
              "50g bulgur wheat",
              "100g parsley",
              "50g tomatoes",
              "30g onion",
              "Lebanese 7 spice mix",
              "10g olive oil",
              "Lemon juice"
            ],
            instructions: [
              "Cook bulgur wheat",
              "Grill spiced chicken",
              "Chop herbs and vegetables",
              "Combine with dressing",
              "Slice chicken on top"
            ],
            notes: "Light but filling. Prep bulgur ahead. Rich in herbs and nutrients."
          },
          {
            name: "Spiced Lamb Meatballs",
            timing: "Dinner",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "150g lean ground lamb",
              "60g quinoa",
              "100g roasted vegetables",
              "Spices: baharat, mint, parsley",
              "10g olive oil",
              "2 tbsp tomato sauce",
              "Greek yogurt for serving"
            ],
            instructions: [
              "Mix lamb with spices",
              "Form meatballs",
              "Cook quinoa",
              "Bake meatballs 12min",
              "Serve with yogurt"
            ],
            notes: "Can make extra meatballs to freeze. Use beef if preferred."
          },
          {
            name: "Anatolian Protein Shake",
            timing: "Snack",
            calories: 375,
            protein: 30,
            carbs: 35,
            fats: 15,
            ingredients: [
              "30g halal whey protein",
              "200ml milk",
              "1 banana",
              "20g tahini",
              "Spices: cinnamon, nutmeg",
              "Ice cubes"
            ],
            instructions: [
              "Blend all ingredients",
              "Add ice to thicken",
              "Adjust thickness with milk"
            ],
            notes: "Great post-workout. Can use plant milk. Add coffee for pre-workout."
          }
        ],
        // Day 5
        [
          {
            name: "Turkish Menemen",
            timing: "Breakfast",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "3 whole eggs",
              "100g tomatoes",
              "50g peppers",
              "30g onions",
              "2 slices whole grain bread",
              "10g olive oil",
              "Spices: red pepper flakes, black pepper",
              "Fresh parsley"
            ],
            instructions: [
              "Sauté vegetables until soft",
              "Add beaten eggs",
              "Cook until just set",
              "Serve with bread",
              "Garnish with parsley"
            ],
            notes: "Classic Turkish breakfast. Add extra egg whites for more protein."
          },
          {
            name: "Grilled Fish Tikka",
            timing: "Lunch",
            calories: 375,
            protein: 35,
            carbs: 30,
            fats: 15,
            ingredients: [
              "180g white fish fillet",
              "70g brown rice",
              "100g mixed vegetables",
              "Tikka spices: garam masala, turmeric, chili",
              "2 tbsp yogurt",
              "10g olive oil",
              "Lemon wedges"
            ],
            instructions: [
              "Marinate fish in spiced yogurt",
              "Cook rice",
              "Grill fish 4min each side",
              "Steam vegetables",
              "Serve with lemon"
            ],
            notes: "Light protein option. Can use any firm white fish. Make extra marinade."
          },
          {
              name: "Beef Koobideh",
              timing: "Dinner",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "150g lean ground beef",
                "60g brown rice",
                "100g grilled tomatoes",
                "30g onions",
                "Persian spice mix: sumac, saffron water (optional), black pepper",
                "10g olive oil",
                "Fresh basil and mint",
                "Lemon wedge"
              ],
              instructions: [
                "Mix beef with grated onion and spices",
                "Form into koobideh shape",
                "Cook rice",
                "Grill meat and tomatoes",
                "Serve with herbs"
              ],
              notes: "Traditional Persian dish. Can use lamb. Make extra spice mix for later."
            },
            {
              name: "Labneh Protein Bowl",
              timing: "Snack",
              calories: 375,
              protein: 30,
              carbs: 35,
              fats: 15,
              ingredients: [
                "200g labneh",
                "30g halal whey protein",
                "20g honey",
                "30g pistachios",
                "Spices: cardamom, vanilla",
                "Fresh mint"
              ],
              instructions: [
                "Mix labneh with protein",
                "Top with honey",
                "Sprinkle nuts and spices",
                "Garnish with mint"
              ],
              notes: "High protein Middle Eastern style snack. Use Greek yogurt if labneh unavailable."
            }
          ],
          // Day 6
          [
            {
              name: "Protein Power Flatbread",
              timing: "Breakfast",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "4 egg whites",
                "2 whole eggs",
                "100g turkey breast",
                "1 whole grain flatbread",
                "30g low-fat cheese",
                "Spices: zaatar, black pepper",
                "Fresh rocket leaves",
                "10g olive oil"
              ],
              instructions: [
                "Scramble eggs with spices",
                "Grill turkey slices",
                "Warm flatbread",
                "Layer ingredients",
                "Add rocket on top"
              ],
              notes: "Quick breakfast wrap. Prep turkey night before. Use chicken if preferred."
            },
            {
              name: "Persian Herb Chicken",
              timing: "Lunch",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "160g chicken breast",
                "70g quinoa",
                "100g mixed herbs (parsley, dill, coriander)",
                "50g spinach",
                "Persian spices: turmeric, lime powder, saffron",
                "10g olive oil",
                "Lime wedges"
              ],
              instructions: [
                "Season chicken with spices",
                "Cook quinoa",
                "Grill chicken",
                "Mix herbs with quinoa",
                "Serve with lime"
              ],
              notes: "Fresh herb-rich dish. Make extra for next day. Add walnuts for healthy fats."
            },
            {
              name: "Spiced Salmon Skewers",
              timing: "Dinner",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "170g salmon chunks",
                "60g couscous",
                "100g mixed vegetables",
                "Chermoula spice mix",
                "10g olive oil",
                "Fresh herbs",
                "Lemon wedges"
              ],
              instructions: [
                "Marinate salmon in chermoula",
                "Prepare couscous",
                "Thread fish on skewers",
                "Grill 3-4min each side",
                "Serve with herbs"
              ],
              notes: "Rich in omega-3s. Can use any firm fish. Make extra chermoula for later."
            },
            {
              name: "Protein Halva Shake",
              timing: "Snack",
              calories: 375,
              protein: 30,
              carbs: 35,
              fats: 15,
              ingredients: [
                "30g halal whey protein",
                "200ml almond milk",
                "15g tahini",
                "1 date",
                "Spices: cinnamon, cardamom",
                "Ice cubes"
              ],
              instructions: [
                "Blend all ingredients",
                "Add ice to thicken",
                "Adjust with milk"
              ],
              notes: "Halva-inspired protein shake. Great post-workout. Use honey if needed."
            }
          ],
          // Day 7
          [
            {
              name: "Shakshuka with Turkey",
              timing: "Breakfast",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "100g turkey mince",
                "2 whole eggs",
                "100g tomatoes",
                "50g peppers",
                "30g onions",
                "Moroccan spices: cumin, paprika, harissa",
                "10g olive oil",
                "2 slices whole grain bread"
              ],
              instructions: [
                "Cook spiced turkey",
                "Add vegetables and simmer",
                "Make wells for eggs",
                "Cover and cook eggs",
                "Serve with bread"
              ],
              notes: "Protein-rich breakfast. Make sauce ahead. Use beef if preferred."
            },
            {
              name: "Tandoori Fish Tikka",
              timing: "Lunch",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "180g white fish",
                "70g basmati rice",
                "100g mixed vegetables",
                "Tandoori spice mix",
                "2 tbsp yogurt",
                "10g olive oil",
                "Fresh mint chutney"
              ],
              instructions: [
                "Marinate fish in spiced yogurt",
                "Cook rice",
                "Grill fish pieces",
                "Steam vegetables",
                "Serve with chutney"
              ],
              notes: "Light protein lunch. Make extra marinade. Use any firm white fish."
            },
            {
              name: "Middle Eastern Beef Bowl",
              timing: "Dinner",
              calories: 375,
              protein: 35,
              carbs: 30,
              fats: 15,
              ingredients: [
                "150g lean beef strips",
                "60g bulgur wheat",
                "100g roasted vegetables",
                "7 spice mix (baharat)",
                "10g olive oil",
                "Fresh parsley",
                "Tahini sauce"
              ],
              instructions: [
                "Season beef with spices",
                "Cook bulgur",
                "Grill beef strips",
                "Roast vegetables",
                "Drizzle tahini"
              ],
              notes: "Rich in iron. Prep vegetables ahead. Use lamb if preferred."
            },
            {
              name: "Protein Rice Pudding",
              timing: "Snack",
              calories: 375,
              protein: 30,
              carbs: 35,
              fats: 15,
              ingredients: [
                "30g halal whey protein",
                "40g rice pudding rice",
                "200ml almond milk",
                "15g pistachios",
                "Spices: cardamom, cinnamon, rose water",
                "Honey to taste"
              ],
              instructions: [
                "Cook rice with milk",
                "Stir in protein",
                "Add spices",
                "Top with nuts"
              ],
              notes: "Middle Eastern inspired. Great bedtime snack. Use low fat milk if preferred."
            }
          ],
          // Day 8
    [
      {
        name: "Protein Ful Medames",
        timing: "Breakfast",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "3 whole eggs",
          "100g fava beans",
          "30g onion",
          "2 slices whole grain bread",
          "10g olive oil",
          "Spices: cumin, chili flakes, black pepper",
          "Fresh parsley",
          "Lemon wedge"
        ],
        instructions: [
          "Warm beans with spices",
          "Soft boil eggs",
          "Dice onions and herbs",
          "Combine and mash lightly",
          "Serve with bread"
        ],
        notes: "Traditional breakfast with added protein. Prep beans night before. Add chili for heat."
      },
      {
        name: "Arabian Grilled Chicken",
        timing: "Lunch",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "170g chicken breast",
          "70g brown rice",
          "100g mixed vegetables",
          "Arabic spice mix: baharat, garlic, sumac",
          "10g olive oil",
          "Fresh mint",
          "Lemon wedge"
        ],
        instructions: [
          "Marinate chicken with spices",
          "Cook rice with spices",
          "Grill chicken",
          "Steam vegetables",
          "Garnish with mint"
        ],
        notes: "Fragrant and filling. Make extra spice mix. Can prep rice ahead."
      },
      {
        name: "Lamb Kofta Platter",
        timing: "Dinner",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "150g lean lamb mince",
          "60g quinoa",
          "100g roasted vegetables",
          "Middle Eastern spices: allspice, cinnamon, nutmeg",
          "10g olive oil",
          "Fresh parsley",
          "Tahini sauce"
        ],
        instructions: [
          "Mix lamb with spices",
          "Form into kofta",
          "Cook quinoa",
          "Grill kofta 4min each side",
          "Serve with tahini"
        ],
        notes: "Rich in iron. Make extra for next day. Can use beef mince if preferred."
      },
      {
        name: "Spiced Protein Yogurt",
        timing: "Snack",
        calories: 375,
        protein: 30,
        carbs: 35,
        fats: 15,
        ingredients: [
          "200g Greek yogurt",
          "30g halal whey protein",
          "20g honey",
          "25g mixed nuts",
          "Spices: cardamom, vanilla, cinnamon",
          "Fresh mint"
        ],
        instructions: [
          "Mix yogurt with protein",
          "Add honey and spices",
          "Top with nuts",
          "Garnish with mint"
        ],
        notes: "High protein snack. Use labneh for thickness. Great pre-bed meal."
      }
    ],
    // Day 9
    [
      {
        name: "Beef Bacon & Egg Wrap",
        timing: "Breakfast",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "100g halal beef bacon",
          "3 egg whites",
          "1 whole egg",
          "1 large whole wheat wrap",
          "30g low-fat cheese",
          "Spices: black pepper, paprika",
          "Fresh rocket"
        ],
        instructions: [
          "Cook beef bacon until crispy",
          "Scramble eggs with spices",
          "Warm wrap",
          "Layer ingredients",
          "Roll and serve"
        ],
        notes: "Quick protein-rich breakfast. Prep beef bacon in advance. Can use turkey bacon."
      },
      {
        name: "Chicken Shawarma Bowl",
        timing: "Lunch",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "170g chicken breast",
          "60g brown rice",
          "100g mixed vegetables",
          "Shawarma spices: cumin, coriander, turmeric",
          "10g olive oil",
          "Garlic sauce (toum)",
          "Fresh parsley"
        ],
        instructions: [
          "Marinate chicken in spices",
          "Cook rice",
          "Grill chicken strips",
          "Roast vegetables",
          "Top with toum"
        ],
        notes: "Classic street food made healthy. Prep marinade ahead. Make extra chicken."
      },
      {
          name: "Spiced Beef Stir Fry",
          timing: "Dinner",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g lean beef strips",
            "60g brown rice",
            "150g mixed vegetables",
            "Middle Eastern spices: baharat, cardamom",
            "10g olive oil",
            "Fresh coriander",
            "Lemon wedge"
          ],
          instructions: [
            "Marinate beef in spices",
            "Cook rice",
            "Stir-fry vegetables",
            "Add beef and flash fry",
            "Garnish and serve"
          ],
          notes: "Quick and filling dinner. Cut beef against grain. Use sirloin for tenderness."
        },
        {
          name: "Date & Almond Protein Balls",
          timing: "Snack",
          calories: 375,
          protein: 30,
          carbs: 35,
          fats: 15,
          ingredients: [
            "30g halal whey protein",
            "50g dates",
            "30g almonds",
            "10g chia seeds",
            "Spices: cinnamon, cardamom",
            "Rose water (optional)"
          ],
          instructions: [
            "Blend dates until paste",
            "Mix in other ingredients",
            "Form into balls",
            "Chill 30 minutes"
          ],
          notes: "Make batch for week. Great pre-workout. Store in fridge."
        }
      ],
      // Day 10
      [
        {
          name: "Middle Eastern Power Oats",
          timing: "Breakfast",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "80g oats",
            "30g halal whey protein",
            "25g pistachios",
            "1 tbsp honey",
            "Spices: cardamom, cinnamon",
            "200ml almond milk",
            "15g chia seeds"
          ],
          instructions: [
            "Cook oats with milk",
            "Stir in protein powder",
            "Add spices and honey",
            "Top with nuts"
          ],
          notes: "Prep night before if preferred. Use any nuts. Add dates for sweetness."
        },
        {
          name: "Moroccan Chicken Skewers",
          timing: "Lunch",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "170g chicken breast",
            "70g couscous",
            "100g grilled vegetables",
            "Moroccan spice mix: ras el hanout",
            "10g olive oil",
            "Fresh mint",
            "Lemon wedge",
            "Greek yogurt for serving"
          ],
          instructions: [
            "Marinate chicken in spices",
            "Prepare couscous",
            "Thread chicken on skewers",
            "Grill with vegetables",
            "Serve with yogurt"
          ],
          notes: "Can prep marinade ahead. Make extra spice mix. Use chicken thigh if preferred."
        },
        {
          name: "Arabic Style Meatballs",
          timing: "Dinner",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g lean beef mince",
            "60g bulgur wheat",
            "100g roasted vegetables",
            "Arabic seven spice mix",
            "10g olive oil",
            "Fresh parsley",
            "Tomato sauce"
          ],
          instructions: [
            "Mix beef with spices",
            "Form meatballs",
            "Cook bulgur",
            "Bake meatballs 15min",
            "Serve with sauce"
          ],
          notes: "Make extra meatballs to freeze. Can use lamb mince. Add pine nuts if desired."
        },
        {
          name: "Protein Kunafa Cups",
          timing: "Snack",
          calories: 375,
          protein: 30,
          carbs: 35,
          fats: 15,
          ingredients: [
            "200g low-fat ricotta",
            "30g halal whey protein",
            "20g honey",
            "20g crushed nuts",
            "Orange blossom water",
            "Cinnamon"
          ],
          instructions: [
            "Mix cheese and protein",
            "Layer with nuts",
            "Drizzle honey",
            "Chill 30 minutes"
          ],
          notes: "Dessert-inspired protein snack. Use cottage cheese if preferred."
        }
      ],
      // Day 11
      [
        {
          name: "Lebanese Breakfast Plate",
          timing: "Breakfast",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "4 egg whites",
            "2 whole eggs",
            "100g halal beef sujuk",
            "2 slices whole grain bread",
            "Fresh mint",
            "10g olive oil",
            "Zaatar mix"
          ],
          instructions: [
            "Slice and cook sujuk",
            "Scramble eggs with spices",
            "Toast bread",
            "Arrange on plate",
            "Sprinkle zaatar"
          ],
          notes: "Classic Lebanese breakfast. Use turkey sujuk for lower fat. Add vegetables if desired."
        },
        {
          name: "Persian Spiced Chicken",
          timing: "Lunch",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "170g chicken breast",
            "70g saffron rice",
            "100g grilled tomatoes",
            "Persian spice mix",
            "10g olive oil",
            "Fresh herbs mix",
            "Sumac for garnish"
          ],
          instructions: [
            "Marinate chicken in spices",
            "Cook rice with saffron",
            "Grill chicken and tomatoes",
            "Serve with herbs",
            "Garnish with sumac"
          ],
          notes: "Traditional Persian style. Prep chicken night before. Use chicken thigh if preferred."
        },
        {
          name: "Spiced Lamb Shoulder",
          timing: "Dinner",
          calories: 375,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            "150g lean lamb",
            "60g quinoa",
            "100g roasted vegetables",
            "Lebanese 7 spice mix",
            "10g olive oil",
            "Fresh mint",
            "Garlic yogurt sauce"
          ],
          instructions: [
            "Season lamb with spices",
            "Cook quinoa",
            "Grill lamb 5-6min each side",
            "Roast vegetables",
            "Serve with sauce"
          ],
          notes: "Rich in iron. Use beef if preferred. Make extra spice mix for later."
        },
        {
          name: "Turkish Protein Milk Pudding",
          timing: "Snack",
          calories: 375,
          protein: 30,
          carbs: 35,
          fats: 15,
          ingredients: [
            "30g halal whey protein",
            "200ml milk",
            "20g cornstarch",
            "20g pistachios",
            "Rose water",
            "Cinnamon"
          ],
          instructions: [
            "Heat milk with cornstarch",
            "Add protein when cool",
            "Top with nuts",
            "Chill until set"
          ],
          notes: "Turkish muhallebi inspired. Great pre-bed snack. Make ahead and store."
        }
      ],
      // Day 13
    [
      {
        name: "Masala Egg Sandwich",
        timing: "Breakfast",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "4 egg whites",
          "1 whole egg",
          "2 slices whole grain bread",
          "30g onion, finely chopped",
          "Basic spices: turmeric, chili powder, black pepper",
          "Fresh coriander",
          "10g butter",
          "Green chili (optional)"
        ],
        instructions: [
          "Beat eggs with spices",
          "Scramble with onions",
          "Toast bread",
          "Make sandwich",
          "Cut diagonal"
        ],
        notes: "Quick desi breakfast. Use any bread. Add tomatoes if desired. Control chili to taste."
      },
      {
        name: "Chicken Tikka Bowl",
        timing: "Lunch",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "170g chicken breast",
          "60g brown rice",
          "100g mixed vegetables",
          "Basic tikka spices: garam masala, red chili, turmeric",
          "2 tbsp yogurt",
          "10g oil",
          "Mint chutney (optional)"
        ],
        instructions: [
          "Marinate chicken in spiced yogurt",
          "Cook rice",
          "Grill chicken pieces",
          "Steam vegetables",
          "Serve with chutney"
        ],
        notes: "Classic tikka made healthy. Use chicken thigh if preferred. Make extra marinade."
      },
      {
        name: "Keema with Vegetables",
        timing: "Dinner",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "150g lean beef mince",
          "60g cauliflower rice",
          "100g mixed vegetables",
          "Basic spices: cumin, coriander, turmeric, garam masala",
          "30g onion",
          "10g oil",
          "Fresh coriander"
        ],
        instructions: [
          "Brown mince with spices",
          "Add chopped vegetables",
          "Cook cauliflower rice",
          "Combine all",
          "Garnish with coriander"
        ],
        notes: "Low carb dinner option. Use any mince. Meal prep friendly."
      },
      {
        name: "Cardamom Protein Lassi",
        timing: "Snack",
        calories: 375,
        protein: 30,
        carbs: 35,
        fats: 15,
        ingredients: [
          "200g yogurt",
          "30g halal whey protein",
          "1 small banana",
          "Cardamom powder",
          "Ice cubes",
          "15g honey"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "Adjust thickness",
          "Sprinkle cardamom"
        ],
        notes: "Protein-rich lassi. Use mango for variation. Great post-workout."
      }
    ],
    // Day 14
    [
      {
        name: "Keema Paratha Wrap",
        timing: "Breakfast",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "100g lean lamb mince",
          "1 whole wheat wrap",
          "2 egg whites",
          "Basic spices: cumin, coriander, garam masala",
          "30g onion",
          "Fresh mint",
          "10g oil"
        ],
        instructions: [
          "Cook spiced keema",
          "Scramble egg whites",
          "Warm wrap",
          "Layer and roll",
          "Toast briefly"
        ],
        notes: "High protein breakfast. Use beef if preferred. Make extra keema for later meals."
      },
      {
        name: "Tandoori Chicken Salad",
        timing: "Lunch",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "170g chicken breast",
          "100g mixed salad",
          "50g chickpeas",
          "Basic tandoori spices: tandoori masala, red chili",
          "2 tbsp yogurt",
          "10g olive oil",
          "Lemon wedge"
        ],
        instructions: [
          "Marinate chicken in spiced yogurt",
          "Grill chicken",
          "Mix salad",
          "Slice chicken",
          "Dress with lemon"
        ],
        notes: "Light but filling. Add more vegetables freely. Use ready tandoori spice mix."
      },
      {
        name: "Beef Karahi Style",
        timing: "Dinner",
        calories: 375,
        protein: 35,
        carbs: 30,
        fats: 15,
        ingredients: [
          "150g lean beef strips",
          "60g brown rice",
          "100g bell peppers",
          "Basic karahi spices: cumin, coriander, black pepper",
          "30g tomatoes",
          "10g oil",
          "Fresh ginger"
        ],
        instructions: [
          "Cook rice",
          "Stir-fry beef with spices",
          "Add vegetables",
          "Quick cook to keep crisp",
          "Garnish with ginger"
        ],
        notes: "Restaurant style made healthy. Use any color peppers. Control spice to taste."
      },
      {
        name: "Protein Kheer",
        timing: "Snack",
        calories: 375,
        protein: 30,
        carbs: 35,
        fats: 15,
        ingredients: [
          "30g halal whey protein",
          "200ml almond milk",
          "20g rice (soaked)",
          "Cardamom powder",
          "15g almonds",
          "Artificial sweetener to taste"
        ],
        instructions: [
          "Cook rice in milk",
          "Cool slightly",
          "Blend in protein",
          "Add cardamom",
          "Top with nuts"
        ],
        notes: "Dessert-inspired protein snack. Use protein powder flavor of choice. Make ahead."
      }
    ]
      ]
  },
// Next calorie plan will start here...
{
  id: "dp_2000",
  name: "Gradual Cut - 2000kcal",
  calories: 2000,
  weekCycle: [
    // Day 1
    [
      {
        name: "Quick Masala Omelette",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 20,
        ingredients: [
          "3 whole eggs",
          "2 egg whites",
          "2 slices whole grain bread",
          "30g onion, finely chopped",
          "Basic spices: turmeric, chili powder, black pepper",
          "Fresh coriander",
          "10g butter",
          "Green chili (optional)"
        ],
        instructions: [
          "Beat eggs with spices",
          "Cook omelette with onions",
          "Toast bread",
          "Garnish and serve",
          "5-7 minutes total"
        ],
        notes: "Quick breakfast. Prep onions night before. Adjust spice to taste. Add tomatoes if desired."
      },
      {
        name: "Butter Chicken Style Protein Bowl",
        timing: "Lunch",
        calories: 600,
        protein: 50,
        carbs: 45,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "80g brown rice",
          "Basic spices: garam masala, tandoori masala, turmeric",
          "2 tbsp tomato paste",
          "100ml low fat coconut milk",
          "30g onion",
          "Fresh ginger-garlic paste",
          "15g butter",
          "Fresh coriander"
        ],
        instructions: [
          "Cook rice",
          "Cut chicken into cubes",
          "Cook chicken with spices",
          "Add sauce ingredients",
          "Simmer 10min"
        ],
        notes: "Meal prep friendly. Make extra sauce. Use ready ginger-garlic paste to save time."
      },
      {
        name: "Quick Keema and Eggs",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lean beef mince",
          "2 whole eggs",
          "60g brown rice",
          "Basic spices: cumin, coriander, garam masala",
          "30g peas",
          "30g onion",
          "15g oil",
          "Fresh coriander"
        ],
        instructions: [
          "Cook rice",
          "Brown mince with spices",
          "Add peas",
          "Fry eggs",
          "Combine and serve"
        ],
        notes: "Easy one-pan meal. Make extra keema for breakfast. Use any mince meat."
      },
      {
        name: "Protein Chai Smoothie",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 45,
        fats: 20,
        ingredients: [
          "30g halal whey protein",
          "200ml milk",
          "1 banana",
          "Chai spices: cardamom, cinnamon, ginger",
          "20g almond butter",
          "Ice cubes"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "Adjust thickness",
          "2 minutes total"
        ],
        notes: "Quick chai-inspired shake. Use ready chai masala powder. Great post-workout."
      }
    ],
    // Day 2
    [
      {
        name: "Protein Paratha Roll",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 30,
        fats: 20,
        ingredients: [
          "4 egg whites",
          "1 whole egg",
          "1 whole wheat paratha/wrap",
          "30g low fat cheese",
          "Basic spices: chili powder, black pepper",
          "Green chutney (optional)",
          "10g butter"
        ],
        instructions: [
          "Scramble eggs with spices",
          "Heat paratha",
          "Add cheese to melt",
          "Roll and wrap",
          "10 minutes total"
        ],
        notes: "Quick breakfast roll. Use ready paratha/wrap. Prep chutney ahead or use ready-made."
      },
      {
        name: "Spiced Chicken Rice Bowl",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "90g basmati rice",
          "100g mixed vegetables",
          "Basic spices: biryani masala, turmeric",
          "30g onions",
          "15g oil",
          "Raita (yogurt side)"
        ],
        instructions: [
          "Cook rice with turmeric",
          "Cut chicken into strips",
          "Stir-fry with spices",
          "Steam vegetables",
          "Combine all"
        ],
        notes: "Use ready biryani masala. Meal prep friendly. Add boiled egg if needed."
      },
      {
        name: "Chapli Kebab Plate",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lean beef mince",
          "60g brown rice",
          "Basic spices: cumin, coriander, red chili",
          "30g onion",
          "Fresh mint and coriander",
          "15g oil",
          "Salad sides"
        ],
        instructions: [
          "Mix mince with spices",
          "Form patties",
          "Cook rice",
          "Pan fry kebabs 4min each side",
          "Serve with salad"
        ],
        notes: "Shape patties ahead. Use any mince. Don't overwork the meat."
      },
      {
        name: "Mango Lassi Protein Shake",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 45,
        fats: 15,
        ingredients: [
          "30g halal whey protein",
          "200g low fat yogurt",
          "100g mango (fresh/frozen)",
          "Cardamom powder",
          "Ice cubes",
          "Honey if needed"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "Adjust thickness",
          "3 minutes total"
        ],
        notes: "Use frozen mango for thickness. Great post-workout. Can use any fruit."
      }
    ],
    // Day 3
    [
      {
        name: "Chicken Sausage & Eggs",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 22,
        ingredients: [
          "100g halal chicken sausage",
          "2 whole eggs",
          "2 egg whites",
          "2 slices whole grain bread",
          "Basic spices: black pepper, chili",
          "10g butter",
          "Ketchup optional"
        ],
        instructions: [
          "Slice and cook sausage",
          "Scramble eggs",
          "Toast bread",
          "Combine and serve",
          "10 minutes total"
        ],
        notes: "Quick breakfast. Use any halal sausage. Add vegetables if time permits."
      },
      {
        name: "Karahi Style Chicken",
        timing: "Lunch",
        calories: 600,
        protein: 50,
        carbs: 45,
        fats: 25,
        ingredients: [
          "200g chicken thighs",
          "80g rice",
          "Basic karahi spices: cumin, coriander, black pepper",
          "100g tomatoes",
          "30g onion",
          "Fresh ginger",
          "15g oil"
        ],
        instructions: [
          "Cook rice",
          "Cut chicken into chunks",
          "Stir-fry with spices",
          "Add tomatoes",
          "Simmer 15min"
        ],
        notes: "Restaurant style made healthy. Use chicken breast if preferred. Control oil."
      },
      {
        name: "Beef Bhuna",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lean beef strips",
          "60g rice",
          "Basic spices: garam masala, cumin, coriander",
          "30g peppers",
          "30g onions",
          "15g oil",
          "Fresh coriander"
        ],
        instructions: [
          "Cook rice",
          "Stir-fry beef with spices",
          "Add vegetables",
          "Quick cook to finish",
          "20 minutes total"
        ],
        notes: "Dry curry style. Use ready spice mix to save time. Meal prep friendly."
      },
      {
        name: "Desi Rice Pudding",
        timing: "Snack",
        calories: 450,
        protein: 30,
        carbs: 50,
        fats: 15,
        ingredients: [
          "30g halal whey protein",
          "40g rice",
          "300ml milk",
          "Cardamom powder",
          "15g almonds",
          "Artificial sweetener"
        ],
        instructions: [
          "Cook rice with milk",
          "Cool slightly",
          "Stir in protein",
          "Add cardamom",
          "Top with nuts"
        ],
        notes: "Kheer inspired. Make ahead. Use protein powder flavor of choice."
      }
    ],
    // Day 4
    [
      {
        name: "Anda Pav (Spiced Egg Sandwich)",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 30,
        fats: 20,
        ingredients: [
          "3 whole eggs",
          "2 whole wheat buns/bread",
          "Basic spices: chaat masala, black pepper",
          "30g onion",
          "Green chili (optional)",
          "10g butter",
          "Mint chutney (optional)"
        ],
        instructions: [
          "Scramble eggs with spices",
          "Toast buns",
          "Assemble sandwich",
          "Add chutney if using",
          "10 minutes total"
        ],
        notes: "Quick Mumbai style breakfast. Use any bread. Ready chutney works fine."
      },
      {
        name: "Tawa Chicken",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "80g roti/wrap",
          "Basic spices: tandoori masala, chili powder",
          "100g peppers and onions",
          "15g oil",
          "Raita side",
          "Fresh coriander"
        ],
        instructions: [
          "Slice chicken thin",
          "Cook with spices",
          "Stir-fry vegetables",
          "Warm rotis",
          "20 minutes total"
        ],
        notes: "Street food style. Use ready tandoori masala. Prep vegetables ahead."
      },
      {
        name: "Lahori Keema with Vegetables",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lean lamb mince",
          "60g rice",
          "Basic spices: cumin, coriander, garam masala",
          "100g mixed vegetables",
          "30g peas",
          "15g oil",
          "Fresh ginger"
        ],
        instructions: [
          "Cook rice",
          "Brown mince with spices",
          "Add vegetables",
          "Simmer 15min",
          "Garnish with ginger"
        ],
        notes: "Use any mince. Can make extra for next day. Add more vegetables freely."
      },
      {
        name: "Masala Milk Protein",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 45,
        fats: 15,
        ingredients: [
          "30g halal whey protein",
          "300ml milk",
          "Indian milk masala powder",
          "1 banana",
          "15g almonds",
          "Saffron (optional)"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice if desired",
          "2 minutes total"
        ],
        notes: "Indian masala milk inspired. Use ready masala mix. Good pre-bed."
      }
    ],
    // Day 5
    [
      {
        name: "Halal Sausage & Egg Bowl",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 22,
        ingredients: [
          "100g halal beef sausage",
          "3 egg whites",
          "1 whole egg",
          "1 slice bread",
          "Basic spices: black pepper, paprika",
          "10g oil",
          "Hot sauce optional"
        ],
        instructions: [
          "Slice and cook sausage",
          "Scramble eggs",
          "Toast bread",
          "Combine in bowl",
          "10 minutes total"
        ],
        notes: "Quick protein bowl. Use any halal sausage. Add spinach if desired."
      },
      {
        name: "Homestyle Chicken Curry",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken thighs",
          "80g rice",
          "Basic curry spices: turmeric, chili, garam masala",
          "2 tomatoes",
          "30g onion",
          "15g oil",
          "Fresh coriander"
        ],
        instructions: [
          "Cook rice",
          "Brown chicken",
          "Add spices and tomatoes",
          "Simmer 15min",
          "Garnish"
        ],
        notes: "Simple curry. Use curry powder to save time. Make extra sauce."
      },
      {
        name: "Seekh Kebab Plate",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lean beef mince",
          "60g rice",
          "Kebab spices: cumin, coriander, mint",
          "30g onion",
          "Green chili optional",
          "15g oil",
          "Mint chutney"
        ],
        instructions: [
          "Mix mince with spices",
          "Shape kebabs",
          "Cook rice",
          "Grill kebabs",
          "20 minutes total"
        ],
        notes: "Make extra kebabs to freeze. Use ready mint chutney."
      },
      {
        name: "Chaat Style Protein Yogurt",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 40,
        fats: 15,
        ingredients: [
          "250g Greek yogurt",
          "30g halal whey protein",
          "20g mixed nuts",
          "Chaat masala",
          "1 apple diced",
          "Pomegranate seeds"
        ],
        instructions: [
          "Mix yogurt and protein",
          "Add fruits and nuts",
          "Sprinkle masala",
          "5 minutes total"
        ],
        notes: "Sweet and tangy snack. Use any fruits. Ready chaat masala works."
      }
    ],
    // Day 6
    [
      {
        name: "Keema Egg Bhurji",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 22,
        ingredients: [
          "100g leftover keema/mince",
          "3 whole eggs",
          "2 slices bread",
          "Basic spices: turmeric, chili powder",
          "30g onion",
          "10g butter",
          "Fresh coriander"
        ],
        instructions: [
          "Heat keema",
          "Add beaten eggs",
          "Scramble together",
          "Toast bread",
          "10 minutes total"
        ],
        notes: "Use any leftover mince. Quick and filling. Add cheese if desired."
      },
      {
        name: "Quick Chicken Biryani Bowl",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "90g basmati rice",
          "Ready biryani masala",
          "100g mixed vegetables",
          "30g onions",
          "15g ghee/oil",
          "Raita side"
        ],
        instructions: [
          "Cook rice with spices",
          "Grill spiced chicken",
          "Steam vegetables",
          "Combine all",
          "25 minutes total"
        ],
        notes: "Simplified biryani. Use ready masala. Prep chicken ahead."
      },
      {
        name: "Masala Beef Stir-Fry",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g beef strips",
          "60g rice",
          "Basic spices: garam masala, cumin",
          "150g peppers and onions",
          "15g oil",
          "Fresh ginger",
          "Green chili optional"
        ],
        instructions: [
          "Cook rice",
          "Stir-fry beef",
          "Add vegetables",
          "Mix in spices",
          "15 minutes total"
        ],
        notes: "Quick stir-fry. Slice beef when buying. Use ready-cut veg."
      },
      {
        name: "Protein Kulfi Shake",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 45,
        fats: 15,
        ingredients: [
          "30g halal whey protein",
          "200ml milk",
          "15g pistachios",
          "Cardamom powder",
          "1 scoop vanilla ice cream",
          "Ice cubes"
        ],
        instructions: [
          "Blend everything",
          "Add ice",
          "Top with nuts",
          "3 minutes total"
        ],
        notes: "Kulfi inspired shake. Use protein ice cream if cutting. Great post-workout."
      }
    ],
    // Day 7
    [
      {
        name: "Spiced Protein Oats",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 35,
        fats: 15,
        ingredients: [
          "80g oats",
          "30g whey protein",
          "1 banana",
          "Chai masala powder",
          "20g mixed nuts",
          "Cinnamon",
          "200ml milk"
        ],
        instructions: [
          "Cook oats with milk",
          "Stir in protein",
          "Add banana and spices",
          "Top with nuts",
          "8 minutes total"
        ],
        notes: "Prep overnight if preferred. Use ready chai masala. Quick and filling."
      },
      {
        name: "Kadai Chicken Bowl",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "80g rice",
          "Kadai masala powder",
          "100g bell peppers",
          "30g onions",
          "15g oil",
          "Fresh coriander"
        ],
        instructions: [
          "Cook rice",
          "Cut chicken into cubes",
          "Stir-fry with spices",
          "Add vegetables",
          "20 minutes total"
        ],
        notes: "Restaurant style made easy. Use ready kadai masala. Meal prep friendly."
      },
      {
        name: "Lamb Kofta Curry",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lamb mince",
          "60g rice",
          "Basic curry powder",
          "2 tomatoes",
          "30g onion",
          "15g oil",
          "Fresh mint"
        ],
        instructions: [
          "Form mince into koftas",
          "Cook rice",
          "Make quick curry sauce",
          "Simmer koftas",
          "25 minutes total"
        ],
        notes: "Use beef if preferred. Make extra koftas to freeze. Use ready sauce base."
      },
      {
        name: "Desi Trail Mix",
        timing: "Snack",
        calories: 450,
        protein: 30,
        carbs: 40,
        fats: 22,
        ingredients: [
          "30g protein puffs",
          "30g mixed nuts",
          "20g dried mango",
          "Chaat masala",
          "Black salt (kala namak)",
          "Chili powder optional"
        ],
        instructions: [
          "Mix all ingredients",
          "Store in container",
          "2 minutes total"
        ],
        notes: "Make big batch. Great travel snack. Adjust spices to taste."
      }
    ],
    // Day 8
    [
      {
        name: "Paneer Bhurji Bowl",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 22,
        ingredients: [
          "150g paneer crumbled",
          "2 whole eggs",
          "2 slices bread",
          "Basic spices: turmeric, cumin",
          "30g onion",
          "10g oil",
          "Green chili optional"
        ],
        instructions: [
          "Crumble paneer",
          "Scramble with eggs",
          "Add spices",
          "Toast bread",
          "12 minutes total"
        ],
        notes: "High protein vegetarian option. Use low fat paneer. Add vegetables if desired."
      },
      {
          name: "Chicken Do Pyaza",
          timing: "Lunch",
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 25,
          ingredients: [
            "200g chicken thighs",
            "80g rice",
            "150g onions",
            "Basic spices: garam masala, turmeric",
            "2 tomatoes",
            "15g oil",
            "Fresh coriander"
          ],
          instructions: [
            "Cook rice",
            "Brown chicken",
            "Cook onions until golden",
            "Add spices and simmer",
            "20 minutes total"
          ],
          notes: "Classic curry made simple. Use chicken breast if preferred. Double onions for sweetness."
        },
        {
          name: "Keema Roll",
          timing: "Dinner",
          calories: 550,
          protein: 45,
          carbs: 40,
          fats: 25,
          ingredients: [
            "180g lamb mince",
            "2 whole wheat wraps",
            "Basic spices: cumin, coriander",
            "50g onions",
            "Mint chutney",
            "15g oil",
            "Fresh salad"
          ],
          instructions: [
            "Cook spiced mince",
            "Warm wraps",
            "Assemble with salad",
            "Add chutney",
            "15 minutes total"
          ],
          notes: "Street food style. Use any mince. Ready chutney works fine."
        },
        {
          name: "Makhana Protein Mix",
          timing: "Snack",
          calories: 450,
          protein: 30,
          carbs: 45,
          fats: 20,
          ingredients: [
            "30g whey protein",
            "50g fox nuts (makhana)",
            "20g mixed nuts",
            "Chaat masala",
            "10g ghee",
            "Black pepper"
          ],
          instructions: [
            "Roast makhana in ghee",
            "Mix with nuts and spices",
            "Blend with protein powder",
            "10 minutes total"
          ],
          notes: "Healthy twist on makhana. Make big batch. Great evening snack."
        }
      ],
      // Day 9
      [
        {
          name: "Egg Chapati Roll",
          timing: "Breakfast",
          calories: 400,
          protein: 35,
          carbs: 30,
          fats: 20,
          ingredients: [
            "3 whole eggs",
            "2 whole wheat chapatis",
            "Basic spices: chaat masala, pepper",
            "30g onion",
            "Green chutney",
            "10g butter",
            "Fresh coriander"
          ],
          instructions: [
            "Make egg omelet",
            "Warm chapatis",
            "Roll together",
            "Cut and serve",
            "10 minutes total"
          ],
          notes: "Quick breakfast roll. Use ready chapatis. Add cheese if desired."
        },
        {
          name: "Railway Chicken Curry",
          timing: "Lunch",
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 25,
          ingredients: [
            "200g chicken breast",
            "80g rice",
            "Railway curry powder",
            "100g potatoes",
            "30g onions",
            "15g oil",
            "Fresh curry leaves"
          ],
          instructions: [
            "Cook rice",
            "Brown chicken",
            "Add potatoes and spices",
            "Simmer until done",
            "25 minutes total"
          ],
          notes: "Classic Indian railway style. Use curry powder for ease. Add carrots optionally."
        },
        {
          name: "Beef Pepper Fry",
          timing: "Dinner",
          calories: 550,
          protein: 45,
          carbs: 35,
          fats: 25,
          ingredients: [
            "180g beef strips",
            "60g rice",
            "200g bell peppers",
            "Basic spices: pepper, garam masala",
            "30g onions",
            "15g oil",
            "Curry leaves"
          ],
          instructions: [
            "Cook rice",
            "Stir-fry beef",
            "Add peppers and spices",
            "Quick cook to finish",
            "20 minutes total"
          ],
          notes: "South Indian style. Use ready-cut beef. Keep peppers crunchy."
        },
        {
          name: "Thandai Protein Shake",
          timing: "Snack",
          calories: 450,
          protein: 35,
          carbs: 45,
          fats: 15,
          ingredients: [
            "30g whey protein",
            "300ml milk",
            "Thandai masala powder",
            "15g almonds",
            "1 date",
            "Ice cubes"
          ],
          instructions: [
            "Blend all ingredients",
            "Add ice",
            "Top with nuts",
            "3 minutes total"
          ],
          notes: "Use ready thandai mix. Great post-workout. Adjust sweetness with dates."
        }
      ],
      // Day 10
      [
        {
          name: "Masala French Toast",
          timing: "Breakfast",
          calories: 400,
          protein: 35,
          carbs: 30,
          fats: 20,
          ingredients: [
            "3 whole eggs",
            "3 bread slices",
            "Basic spices: black pepper, chili",
            "30g onion finely chopped",
            "Fresh coriander",
            "10g butter",
            "Green chili optional"
          ],
          instructions: [
            "Beat eggs with spices",
            "Soak bread",
            "Pan fry until golden",
            "Garnish and serve",
            "12 minutes total"
          ],
          notes: "Desi style french toast. Use any bread. Add cheese for extra protein."
        },
        {
          name: "Mediterranean Chicken Bowl",
          timing: "Lunch",
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 25,
          ingredients: [
            "200g chicken breast",
            "80g couscous",
            "100g mixed vegetables",
            "Mediterranean herbs: oregano, thyme",
            "15g olive oil",
            "30g hummus",
            "Lemon wedge",
            "Fresh parsley"
          ],
          instructions: [
            "Season chicken with herbs",
            "Grill chicken",
            "Prepare couscous",
            "Add roasted vegetables",
            "20 minutes total"
          ],
          notes: "Clean Mediterranean flavors. Prep vegetables ahead. Make extra hummus for snacks."
        },
        {
          name: "Turkish Kofta Platter",
          timing: "Dinner",
          calories: 550,
          protein: 45,
          carbs: 35,
          fats: 25,
          ingredients: [
            "180g lean lamb mince",
            "60g bulgur wheat",
            "Turkish spices: cumin, sumac",
            "100g grilled vegetables",
            "15g olive oil",
            "Garlic yogurt sauce",
            "Fresh mint"
          ],
          instructions: [
            "Mix kofta spices",
            "Form and grill kofta",
            "Cook bulgur",
            "Make yogurt sauce",
            "20 minutes total"
          ],
          notes: "Use beef if preferred. Make extra kofta to freeze. Ready spice mix works."
        },
        {
          name: "Greek Yogurt Protein Bowl",
          timing: "Snack",
          calories: 450,
          protein: 35,
          carbs: 40,
          fats: 20,
          ingredients: [
            "250g Greek yogurt",
            "30g honey",
            "30g mixed nuts",
            "100g mixed berries",
            "Vanilla extract",
            "Cinnamon"
          ],
          instructions: [
            "Layer yogurt and berries",
            "Add honey and nuts",
            "Sprinkle cinnamon",
            "5 minutes total"
          ],
          notes: "Mediterranean style parfait. Use frozen berries. Great pre-bed protein."
        }
      ],
      // Day 11
      [
        {
          name: "Middle Eastern Breakfast Plate",
          timing: "Breakfast",
          calories: 400,
          protein: 35,
          carbs: 30,
          fats: 20,
          ingredients: [
            "3 whole eggs",
            "60g halloumi cheese",
            "2 whole wheat pita",
            "30g olives",
            "Fresh mint",
            "10g olive oil",
            "Za'atar seasoning"
          ],
          instructions: [
            "Scramble eggs",
            "Grill halloumi",
            "Warm pita",
            "Assemble plate",
            "12 minutes total"
          ],
          notes: "Mediterranean breakfast. Use any bread. Add tomatoes if desired."
        },
        {
          name: "Moroccan Chicken Quinoa",
          timing: "Lunch",
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 25,
          ingredients: [
            "200g chicken breast",
            "80g quinoa",
            "Moroccan spices: ras el hanout",
            "100g roasted vegetables",
            "15g olive oil",
            "30g chickpeas",
            "Fresh coriander",
            "Lemon wedge"
          ],
          instructions: [
            "Cook quinoa",
            "Season and grill chicken",
            "Roast vegetables",
            "Combine with chickpeas",
            "25 minutes total"
          ],
          notes: "Use ready Moroccan spice blend. Great meal prep option."
        },
        {
          name: "Lebanese Beef Stir-Fry",
          timing: "Dinner",
          calories: 550,
          protein: 45,
          carbs: 35,
          fats: 25,
          ingredients: [
            "180g beef strips",
            "60g freekeh/cracked wheat",
            "7 spice blend (baharat)",
            "150g mixed peppers",
            "15g pine nuts",
            "15g olive oil",
            "Fresh parsley"
          ],
          instructions: [
            "Cook freekeh",
            "Stir-fry beef with spices",
            "Add vegetables",
            "Toast pine nuts",
            "15 minutes total"
          ],
          notes: "Use ready baharat spice. Rice works instead of freekeh. Toast extra nuts for later."
        },
        {
          name: "Turkish Protein Smoothie",
          timing: "Snack",
          calories: 450,
          protein: 35,
          carbs: 45,
          fats: 15,
          ingredients: [
            "30g whey protein",
            "200ml milk",
            "1 banana",
            "20g tahini",
            "Cinnamon",
            "Honey to taste",
            "Ice cubes"
          ],
          instructions: [
            "Blend all ingredients",
            "Add ice",
            "Adjust thickness",
            "3 minutes total"
          ],
          notes: "Middle Eastern inspired shake. Great post-workout. Use date syrup instead of honey."
        }
      ],
      // Day 12
    [
      {
        name: "Protein Power Bagel",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 35,
        fats: 18,
        ingredients: [
          "100g turkey breast",
          "1 whole wheat bagel",
          "2 egg whites",
          "1 whole egg",
          "30g low-fat cream cheese",
          "Black pepper, herbs",
          "Rocket leaves"
        ],
        instructions: [
          "Cook eggs",
          "Toast bagel",
          "Layer ingredients",
          "Add seasoning",
          "10 minutes total"
        ],
        notes: "Quick western breakfast. Use chicken if preferred. Add tomatoes if desired."
      },
      {
        name: "Persian Style Grilled Chicken",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "80g saffron rice",
          "Persian spice mix: sumac, turmeric",
          "100g grilled tomatoes",
          "15g olive oil",
          "Yogurt sauce",
          "Fresh herbs mix"
        ],
        instructions: [
          "Marinate chicken",
          "Cook rice",
          "Grill chicken and tomatoes",
          "Make yogurt sauce",
          "25 minutes total"
        ],
        notes: "Use ready Persian spice mix. Can prep chicken night before."
      },
      {
        name: "Mediterranean Fish",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "200g white fish fillet",
          "60g couscous",
          "Mediterranean herbs",
          "100g mixed vegetables",
          "15g olive oil",
          "Lemon juice",
          "Capers optional"
        ],
        instructions: [
          "Season fish",
          "Prepare couscous",
          "Pan-fry fish",
          "Steam vegetables",
          "15 minutes total"
        ],
        notes: "Use any firm white fish. Quick and light dinner. Add olives if desired."
      },
      {
        name: "Baklava Protein Balls",
        timing: "Snack",
        calories: 450,
        protein: 30,
        carbs: 45,
        fats: 20,
        ingredients: [
          "30g whey protein",
          "50g mixed nuts",
          "30g dates",
          "Cinnamon, cardamom",
          "15g honey",
          "Orange zest"
        ],
        instructions: [
          "Process nuts and dates",
          "Mix in protein and spices",
          "Form balls",
          "Chill",
          "10 minutes prep"
        ],
        notes: "Middle Eastern inspired. Make batch for week. Store in fridge."
      }
    ],
    // Day 13
    [
      {
        name: "Turkish Eggs",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 25,
        fats: 22,
        ingredients: [
          "3 whole eggs",
          "150g yogurt",
          "10g butter",
          "Chili flakes (Aleppo if available)",
          "2 slices sourdough",
          "Fresh dill",
          "Black pepper"
        ],
        instructions: [
          "Poach eggs",
          "Warm yogurt slightly",
          "Make chili butter",
          "Toast bread",
          "12 minutes total"
        ],
        notes: "Classic Turkish breakfast. Use Greek yogurt for thickness. Add garlic if desired."
      },
      {
        name: "Moroccan Beef Bowl",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "180g lean beef strips",
          "80g couscous",
          "Moroccan spices",
          "100g roasted vegetables",
          "15g olive oil",
          "30g chickpeas",
          "Fresh mint"
        ],
        instructions: [
          "Cook couscous",
          "Spice and cook beef",
          "Heat chickpeas",
          "Combine all",
          "20 minutes total"
        ],
        notes: "Use ready Moroccan seasoning. Meal prep friendly. Add harissa for heat."
      },
      {
        name: "Arabian Grilled Chicken",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "200g chicken thighs",
          "60g bulgur wheat",
          "Arabic 7 spice mix",
          "100g grilled vegetables",
          "15g olive oil",
          "Garlic sauce",
          "Parsley"
        ],
        instructions: [
          "Marinate chicken",
          "Cook bulgur",
          "Grill chicken",
          "Make garlic sauce",
          "25 minutes total"
        ],
        notes: "Use chicken breast if preferred. Ready spice mix works well."
      },
      {
        name: "Protein Halva Shake",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 40,
        fats: 18,
        ingredients: [
          "30g whey protein",
          "200ml milk",
          "20g tahini",
          "1 banana",
          "Vanilla extract",
          "Cinnamon",
          "Ice"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "Adjust thickness",
          "3 minutes total"
        ],
        notes: "Middle Eastern inspired. Great post-workout. Use honey if needed."
      }
    ],
    // Day 14
    [
      {
        name: "Mediterranean Sunrise Bowl",
        timing: "Breakfast",
        calories: 400,
        protein: 35,
        carbs: 30,
        fats: 20,
        ingredients: [
          "2 whole eggs",
          "100g feta cheese",
          "2 slices whole grain bread",
          "50g cherry tomatoes",
          "Fresh basil",
          "10g olive oil",
          "Black pepper"
        ],
        instructions: [
          "Scramble eggs",
          "Toast bread",
          "Assemble bowl",
          "Add feta and tomatoes",
          "10 minutes total"
        ],
        notes: "Light Mediterranean start. Use any cheese. Add olives if desired."
      },
      {
        name: "Lebanese Chicken Tabbouleh",
        timing: "Lunch",
        calories: 600,
        protein: 45,
        carbs: 50,
        fats: 25,
        ingredients: [
          "200g chicken breast",
          "70g bulgur wheat",
          "Lebanese 7 spice",
          "Large bunch parsley",
          "15g olive oil",
          "Lemon juice",
          "Fresh mint"
        ],
        instructions: [
          "Cook bulgur",
          "Grill spiced chicken",
          "Chop herbs",
          "Mix tabbouleh",
          "20 minutes total"
        ],
        notes: "Fresh and light. Prep herbs ahead. Add pomegranate seeds optionally."
      },
      {
        name: "Turkish Style Meatballs",
        timing: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "180g lamb mince",
          "60g rice",
          "Turkish spices",
          "100g roasted vegetables",
          "15g olive oil",
          "Yogurt sauce",
          "Fresh parsley"
        ],
        instructions: [
          "Form and cook meatballs",
          "Prepare rice",
          "Roast vegetables",
          "Make sauce",
          "25 minutes total"
        ],
        notes: "Use beef if preferred. Make extra meatballs to freeze."
      },
      {
        name: "Greek Yogurt Protein Bowl",
        timing: "Snack",
        calories: 450,
        protein: 35,
        carbs: 40,
        fats: 18,
        ingredients: [
          "250g Greek yogurt",
          "30g whey protein",
          "30g honey",
          "20g walnuts",
          "Fresh berries",
          "Cinnamon"
        ],
        instructions: [
          "Mix yogurt and protein",
          "Add honey",
          "Top with nuts and berries",
          "5 minutes total"
        ],
        notes: "High protein dessert-style snack. Use any fruits. Great pre-bed meal."
      }
    ]
  ]
},
// Next calorie plan will start here
{
  id: "dp_2500",
  name: "Maintenance - 2500kcal",
  calories: 2500,
  weekCycle: [
    // Day 1
    [
      {
        name: "Power Protein Scramble",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "4 whole eggs",
          "100g turkey breast",
          "2 slices whole grain bread",
          "30g low-fat cheese",
          "Spinach handful",
          "15g butter",
          "Black pepper, herbs"
        ],
        instructions: [
          "Dice and cook turkey",
          "Add beaten eggs",
          "Melt cheese on top",
          "Toast bread",
          "12 minutes total"
        ],
        notes: "High protein breakfast. Prep turkey night before. Add vegetables freely."
      },
      {
        name: "Double Chicken Biryani Bowl",
        timing: "Lunch",
        calories: 700,
        protein: 55,
        carbs: 65,
        fats: 25,
        ingredients: [
          "250g chicken breast",
          "100g basmati rice",
          "Ready biryani masala",
          "100g mixed vegetables",
          "30g onions",
          "15g ghee",
          "Raita side",
          "Boiled egg optional"
        ],
        instructions: [
          "Cook rice with spices",
          "Grill spiced chicken",
          "Steam vegetables",
          "Layer and combine",
          "25 minutes total"
        ],
        notes: "Scaled up protein portion. Use ready masala. Meal prep friendly."
      },
      {
        name: "Mediterranean Beef Plate",
        timing: "Dinner",
        calories: 650,
        protein: 50,
        carbs: 45,
        fats: 30,
        ingredients: [
          "220g lean beef strips",
          "80g couscous",
          "Mediterranean herbs",
          "150g grilled vegetables",
          "20g olive oil",
          "30g hummus",
          "Fresh parsley",
          "Lemon wedge"
        ],
        instructions: [
          "Season beef with herbs",
          "Cook couscous",
          "Grill beef and vegetables",
          "Serve with hummus",
          "20 minutes total"
        ],
        notes: "High protein dinner. Make extra hummus. Add tahini for healthy fats."
      },
      {
        name: "Loaded Protein Shake",
        timing: "Snack",
        calories: 650,
        protein: 50,
        carbs: 65,
        fats: 25,
        ingredients: [
          "60g whey protein",
          "300ml milk",
          "1 banana",
          "40g oats",
          "30g peanut butter",
          "1 date",
          "Cinnamon"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice if desired",
          "Adjust thickness",
          "3 minutes total"
        ],
        notes: "Double scoop for higher protein. Great post-workout. Add berries if desired."
      }
    ],
    // Day 2
    [
      {
        name: "Turkish Protein Breakfast",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "3 whole eggs",
          "100g halloumi cheese",
          "2 whole wheat pita",
          "50g olives",
          "Fresh mint",
          "15g olive oil",
          "Za'atar seasoning"
        ],
        instructions: [
          "Grill halloumi",
          "Fry eggs",
          "Warm pita",
          "Assemble plate",
          "15 minutes total"
        ],
        notes: "Mediterranean style protein. Use feta for variety. Add tomatoes if desired."
      },
      {
          name: "Double Lamb Kofta Bowl",
          timing: "Lunch",
          calories: 700,
          protein: 55,
          carbs: 60,
          fats: 30,
          ingredients: [
            "250g lamb mince",
            "100g bulgur wheat",
            "Middle Eastern spices",
            "150g mixed vegetables",
            "20g olive oil",
            "50g hummus",
            "Fresh parsley",
            "Garlic sauce"
          ],
          instructions: [
            "Mix and form kofta",
            "Cook bulgur",
            "Grill kofta and vegetables",
            "Make garlic sauce",
            "25 minutes total"
          ],
          notes: "High protein lunch. Use beef if preferred. Make extra kofta to freeze."
        },
        {
          name: "Tandoori Chicken Feast",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 28,
          ingredients: [
            "280g chicken thighs",
            "70g rice",
            "Tandoori spice mix",
            "150g mixed vegetables",
            "30g yogurt",
            "15g ghee",
            "Mint chutney",
            "Lemon wedges"
          ],
          instructions: [
            "Marinate chicken",
            "Cook rice",
            "Grill chicken",
            "Steam vegetables",
            "20 minutes total"
          ],
          notes: "Restaurant style at home. Use breast if preferred. Make extra marinade."
        },
        {
          name: "Protein Builder Yogurt",
          timing: "Snack",
          calories: 650,
          protein: 45,
          carbs: 65,
          fats: 25,
          ingredients: [
            "300g Greek yogurt",
            "30g whey protein",
            "50g granola",
            "30g mixed nuts",
            "30g honey",
            "100g mixed berries",
            "Cinnamon"
          ],
          instructions: [
            "Mix yogurt and protein",
            "Layer with granola",
            "Add toppings",
            "5 minutes total"
          ],
          notes: "High protein snack. Use low-fat yogurt if needed. Great pre-bed meal."
        }
      ],
      // Day 3
      [
        {
          name: "Protein Packed Shakshuka",
          timing: "Breakfast",
          calories: 500,
          protein: 45,
          carbs: 30,
          fats: 28,
          ingredients: [
            "4 whole eggs",
            "100g turkey breast",
            "2 whole grain pita",
            "100g peppers and tomatoes",
            "30g feta cheese",
            "15g olive oil",
            "Middle Eastern spices",
            "Fresh parsley"
          ],
          instructions: [
            "Cook spiced turkey",
            "Add vegetables",
            "Make wells for eggs",
            "Bake until set",
            "15 minutes total"
          ],
          notes: "Middle Eastern breakfast with added protein. Use chicken if preferred."
        },
        {
          name: "Persian Style Beef Bowl",
          timing: "Lunch",
          calories: 700,
          protein: 60,
          carbs: 55,
          fats: 30,
          ingredients: [
            "250g lean beef strips",
            "100g saffron rice",
            "Persian spice mix",
            "150g grilled tomatoes",
            "30g onions",
            "20g butter",
            "Fresh herbs mix",
            "Sumac"
          ],
          instructions: [
            "Cook rice with saffron",
            "Grill spiced beef",
            "Grill vegetables",
            "Combine with herbs",
            "25 minutes total"
          ],
          notes: "High protein lunch. Use ready Persian spice mix. Add barberries if available."
        },
        {
          name: "Super Chicken Shawarma",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 28,
          ingredients: [
            "280g chicken breast",
            "2 whole wheat wraps",
            "Shawarma spices",
            "150g mixed vegetables",
            "30g hummus",
            "20g olive oil",
            "Garlic sauce",
            "Pickles"
          ],
          instructions: [
            "Marinate chicken",
            "Grill chicken strips",
            "Warm wraps",
            "Assemble with sauces",
            "20 minutes total"
          ],
          notes: "Clean shawarma version. Use thighs if preferred. Make extra chicken."
        },
        {
          name: "Muscle Builder Shake",
          timing: "Snack",
          calories: 650,
          protein: 50,
          carbs: 65,
          fats: 25,
          ingredients: [
            "60g whey protein",
            "300ml milk",
            "1 banana",
            "50g oats",
            "25g almond butter",
            "Dates",
            "Cinnamon"
          ],
          instructions: [
            "Blend all ingredients",
            "Add ice if desired",
            "3 minutes total"
          ],
          notes: "High calorie protein shake. Great post-workout. Add coffee for pre-workout."
        }
      ],
      // Day 4
    [
      {
        name: "Mega Breakfast Wrap",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "3 whole eggs",
          "100g halal turkey breast",
          "2 large whole wheat wraps",
          "30g low-fat cheese",
          "Spinach",
          "15g olive oil",
          "Hot sauce optional",
          "Black pepper"
        ],
        instructions: [
          "Scramble eggs",
          "Cook sliced turkey",
          "Warm wraps",
          "Assemble with cheese",
          "10 minutes total"
        ],
        notes: "Quick high protein breakfast. Use chicken if preferred. Make ahead possible."
      },
      {
        name: "Lebanese Mixed Grill",
        timing: "Lunch",
        calories: 700,
        protein: 60,
        carbs: 55,
        fats: 30,
        ingredients: [
          "200g chicken breast",
          "100g lamb kofta",
          "100g brown rice",
          "Lebanese 7 spice",
          "150g grilled vegetables",
          "20g olive oil",
          "Garlic sauce",
          "Fresh parsley"
        ],
        instructions: [
          "Prepare both meats",
          "Cook rice",
          "Grill everything",
          "Make garlic sauce",
          "25 minutes total"
        ],
        notes: "Restaurant style mixed grill. Prep meats ahead. Use all chicken if preferred."
      },
      {
        name: "Asian Style Beef Bowl",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 45,
        fats: 28,
        ingredients: [
          "250g lean beef strips",
          "80g jasmine rice",
          "Halal stir-fry sauce",
          "200g mixed vegetables",
          "20g sesame oil",
          "Ginger and garlic",
          "Green onions",
          "Sesame seeds"
        ],
        instructions: [
          "Cook rice",
          "Stir-fry beef",
          "Add vegetables",
          "Mix sauce",
          "15 minutes total"
        ],
        notes: "Quick stir-fry. Check sauce is halal. Use chicken if preferred."
      },
      {
        name: "Protein Trail Mix",
        timing: "Snack",
        calories: 650,
        protein: 40,
        carbs: 55,
        fats: 35,
        ingredients: [
          "50g mixed nuts",
          "30g whey protein puffs",
          "30g dark chocolate chips",
          "30g dried fruit",
          "20g pumpkin seeds",
          "Cinnamon",
          "Sea salt"
        ],
        instructions: [
          "Mix all ingredients",
          "Store in container",
          "5 minutes total"
        ],
        notes: "Make big batch. Great travel snack. Add protein powder coating for extra protein."
      }
    ],
    // Day 5
    [
      {
        name: "Power Oats Bowl",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 45,
        fats: 20,
        ingredients: [
          "100g oats",
          "40g whey protein",
          "2 whole eggs",
          "30g mixed nuts",
          "1 banana",
          "Cinnamon",
          "Honey to taste",
          "300ml milk"
        ],
        instructions: [
          "Cook oats with milk",
          "Stir in whisked eggs",
          "Add protein powder",
          "Top with nuts",
          "10 minutes total"
        ],
        notes: "High protein oats. Add eggs for extra gains. Use protein milk if desired."
      },
      {
        name: "Double Chicken Tikka",
        timing: "Lunch",
        calories: 700,
        protein: 65,
        carbs: 50,
        fats: 30,
        ingredients: [
          "300g chicken breast",
          "90g basmati rice",
          "Tikka spice mix",
          "150g mixed vegetables",
          "30g yogurt",
          "20g ghee",
          "Mint chutney",
          "Lemon wedges"
        ],
        instructions: [
          "Marinate chicken",
          "Cook rice",
          "Grill chicken",
          "Steam vegetables",
          "25 minutes total"
        ],
        notes: "High protein Indian. Use ready spice mix. Make extra chicken for meals."
      },
      {
        name: "Mediterranean Fish Platter",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 40,
        fats: 30,
        ingredients: [
          "250g white fish fillets",
          "80g couscous",
          "Mediterranean herbs",
          "200g roasted vegetables",
          "25g olive oil",
          "Garlic and lemon",
          "Fresh parsley",
          "Capers optional"
        ],
        instructions: [
          "Season fish",
          "Prepare couscous",
          "Bake fish and vegetables",
          "Make herb sauce",
          "20 minutes total"
        ],
        notes: "Light but protein rich. Use any firm white fish. Add olives if desired."
      },
      {
        name: "Arabian Protein Smoothie",
        timing: "Snack",
        calories: 650,
        protein: 45,
        carbs: 65,
        fats: 25,
        ingredients: [
          "50g whey protein",
          "300ml milk",
          "40g dates",
          "30g tahini",
          "Cardamom",
          "Vanilla",
          "Ice cubes"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "3 minutes total"
        ],
        notes: "Middle Eastern inspired shake. Great post-workout. Use protein milk for extra."
      }
    ],
    // Day 6
    [
      {
        name: "Muscle Builder Omelet",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 30,
        fats: 28,
        ingredients: [
          "4 whole eggs",
          "80g turkey breast",
          "30g low-fat cheese",
          "2 slices whole grain bread",
          "Mixed peppers",
          "15g olive oil",
          "Fresh herbs"
        ],
        instructions: [
          "Cook diced turkey",
          "Add beaten eggs",
          "Fill with cheese",
          "Toast bread",
          "12 minutes total"
        ],
        notes: "High protein start. Prep vegetables night before. Use chicken if preferred."
      },
      {
        name: "Big Beef Burrito Bowl",
        timing: "Lunch",
        calories: 700,
        protein: 60,
        carbs: 55,
        fats: 30,
        ingredients: [
          "250g lean beef mince",
          "100g brown rice",
          "Mexican spice blend",
          "Black beans",
          "150g mixed peppers",
          "20g olive oil",
          "Guacamole",
          "Greek yogurt"
        ],
        instructions: [
          "Cook rice",
          "Season and cook beef",
          "Sauté vegetables",
          "Assemble bowl",
          "20 minutes total"
        ],
        notes: "Halal Mexican style. Check spice blend is halal. Use chicken if preferred."
      },
      {
        name: "Middle Eastern Grilled Chicken",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 45,
        fats: 28,
        ingredients: [
          "280g chicken breast",
          "80g bulgur wheat",
          "Shawarma spices",
          "150g roasted vegetables",
          "20g olive oil",
          "Hummus",
          "Fresh parsley",
          "Lemon"
        ],
        instructions: [
          "Marinate chicken",
          "Cook bulgur",
          "Grill chicken",
          "Roast vegetables",
          "25 minutes total"
        ],
        notes: "Clean shawarma style. Use thighs for more flavor. Make extra spice mix."
      },
      {
        name: "Protein Dessert Bowl",
        timing: "Snack",
        calories: 650,
        protein: 45,
        carbs: 60,
        fats: 25,
        ingredients: [
          "300g Greek yogurt",
          "40g whey protein",
          "40g granola",
          "30g honey",
          "Mixed berries",
          "20g pistachios",
          "Cinnamon"
        ],
        instructions: [
          "Mix yogurt and protein",
          "Layer ingredients",
          "Add toppings",
          "5 minutes total"
        ],
        notes: "Dessert style protein. Great pre-bed. Use low-fat yogurt if needed."
      }
    ],
    // Day 7
    [
      {
        name: "Turkish Power Plate",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "3 whole eggs",
          "100g halal beef sausage",
          "2 whole grain pita",
          "50g feta cheese",
          "Tomatoes",
          "15g olive oil",
          "Za'atar",
          "Olives"
        ],
        instructions: [
          "Cook sliced sausage",
          "Fry eggs",
          "Warm pita",
          "Assemble plate",
          "15 minutes total"
        ],
        notes: "Turkish breakfast with extra protein. Use chicken sausage if preferred."
      },
      {
        name: "Super Tandoori Bowl",
        timing: "Lunch",
        calories: 700,
        protein: 60,
        carbs: 55,
        fats: 30,
        ingredients: [
          "300g chicken thighs",
          "100g basmati rice",
          "Tandoori spices",
          "150g mixed vegetables",
          "30g yogurt",
          "15g ghee",
          "Mint chutney",
          "Raita"
        ],
        instructions: [
          "Marinate chicken",
          "Cook rice",
          "Grill chicken",
          "Steam vegetables",
          "25 minutes total"
        ],
        notes: "High protein Indian. Use ready spice mix. Double marinade for next day."
      },
      {
        name: "Lamb Kofte Plate",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 40,
        fats: 30,
        ingredients: [
          "250g lamb mince",
          "70g couscous",
          "Middle Eastern spices",
          "150g grilled vegetables",
          "20g olive oil",
          "Garlic sauce",
          "Fresh mint",
          "Sumac"
        ],
        instructions: [
          "Form and grill kofte",
          "Prepare couscous",
          "Grill vegetables",
          "Make sauce",
          "20 minutes total"
        ],
        notes: "Use beef if preferred. Make extra kofte to freeze. Add pine nuts if desired."
      },
      {
        name: "Anabolic Date Shake",
        timing: "Snack",
        calories: 650,
        protein: 50,
        carbs: 65,
        fats: 22,
        ingredients: [
          "60g whey protein",
          "300ml milk",
          "40g dates",
          "30g peanut butter",
          "Vanilla",
          "Cinnamon",
          "Ice"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "3 minutes total"
        ],
        notes: "High calorie gainer shake. Great post-workout. Use protein milk for extra gains."
      }
    ],
    // Day 8
    [
      {
        name: "High Protein French Toast",
        timing: "Breakfast",
        calories: 500,
        protein: 42,
        carbs: 38,
        fats: 24,
        ingredients: [
          "3 whole eggs",
          "30g whey protein",
          "3 slices whole grain bread",
          "200ml milk",
          "15g butter",
          "Cinnamon",
          "Sugar-free syrup",
          "Mixed berries"
        ],
        instructions: [
          "Mix eggs, protein, milk",
          "Soak bread slices",
          "Pan fry in butter",
          "Top and serve",
          "12 minutes total"
        ],
        notes: "Quick breakfast. Use vanilla protein for flavor. Add nuts for extra calories."
      },
      {
        name: "Homemade Chicken Burger",
        timing: "Lunch",
        calories: 700,
        protein: 58,
        carbs: 52,
        fats: 32,
        ingredients: [
          "250g ground chicken",
          "1 brioche bun",
          "30g low-fat cheese",
          "Lettuce, tomato, onion",
          "20g olive oil",
          "Garlic powder, paprika",
          "15g light mayo",
          "Sweet potato fries"
        ],
        instructions: [
          "Season and form patty",
          "Grill chicken burger",
          "Prep vegetables",
          "Assemble burger",
          "20 minutes total"
        ],
        notes: "Better than takeout. Make extra patties to freeze. Air fry fries for less oil."
      },
      {
        name: "Mediterranean Beef Bowl",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 45,
        fats: 30,
        ingredients: [
          "220g lean beef strips",
          "80g quinoa",
          "Greek seasoning",
          "150g mixed vegetables",
          "20g olive oil",
          "50g hummus",
          "Feta cheese",
          "Fresh herbs"
        ],
        instructions: [
          "Cook quinoa",
          "Sear beef with herbs",
          "Roast vegetables",
          "Combine and add hummus",
          "20 minutes total"
        ],
        notes: "Clean Mediterranean meal. Use leftover hummus. Add olives if desired."
      },
      {
        name: "Protein Cookie Dough",
        timing: "Snack",
        calories: 650,
        protein: 45,
        carbs: 65,
        fats: 28,
        ingredients: [
          "50g whey protein",
          "60g chickpeas (drained)",
          "40g almond butter",
          "30g honey",
          "30g dark chocolate chips",
          "Vanilla extract",
          "Pinch of salt"
        ],
        instructions: [
          "Blend chickpeas smooth",
          "Mix in other ingredients",
          "Form into balls",
          "Chill",
          "10 minutes prep"
        ],
        notes: "Healthy treat. Make batch for week. Keep refrigerated."
      }
    ],
    // Day 9
    [
      {
        name: "Champion's Breakfast Sandwich",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "4 whole eggs",
          "100g chicken breast",
          "2 whole grain rolls",
          "30g low-fat cheese",
          "Spinach",
          "15g butter",
          "Hot sauce optional",
          "Seasoning"
        ],
        instructions: [
          "Grill seasoned chicken",
          "Cook eggs over medium",
          "Toast rolls",
          "Stack and serve",
          "15 minutes total"
        ],
        notes: "Elite breakfast sandwich. Slice chicken thin for quick cooking. Add avocado for healthy fats."
      },
      {
        name: "Performance Pasta Bowl",
        timing: "Lunch",
        calories: 700,
        protein: 60,
        carbs: 65,
        fats: 25,
        ingredients: [
          "250g chicken breast",
          "100g whole grain pasta",
          "Italian herbs and spices",
          "150g mixed vegetables",
          "20g olive oil",
          "30g parmesan",
          "Fresh basil",
          "Cherry tomatoes"
        ],
        instructions: [
          "Cook pasta al dente",
          "Grill sliced chicken",
          "Sauté vegetables",
          "Combine with sauce",
          "20 minutes total"
        ],
        notes: "Perfect post-training meal. Use any pasta shape. Make extra chicken for next day."
      },
      {
        name: "Street Style Beef Tacos",
        timing: "Dinner",
        calories: 650,
        protein: 55,
        carbs: 45,
        fats: 30,
        ingredients: [
          "220g lean ground beef",
          "4 corn tortillas",
          "Mexican spice blend",
          "100g bell peppers",
          "50g onions",
          "20g olive oil",
          "Fresh cilantro",
          "Lime wedges"
        ],
        instructions: [
          "Season and cook beef",
          "Warm tortillas",
          "Prep vegetables",
          "Assemble tacos",
          "15 minutes total"
        ],
        notes: "High protein Mexican. Check spices are halal. Double beef for extra gains."
      },
      {
        name: "Recovery Protein Smoothie",
        timing: "Snack",
        calories: 650,
        protein: 50,
        carbs: 70,
        fats: 25,
        ingredients: [
          "60g whey protein",
          "1 large banana",
          "50g oats",
          "30g peanut butter",
          "300ml milk",
          "1 date",
          "Ice cubes"
        ],
        instructions: [
          "Blend all ingredients",
          "Add ice",
          "Adjust thickness",
          "3 minutes total"
        ],
        notes: "Perfect post-workout. Use frozen banana for thickness. Add creatine if using."
      }
    ],
    // Day 10
    [
      {
        name: "Power Protein Wrap",
        timing: "Breakfast",
        calories: 500,
        protein: 45,
        carbs: 35,
        fats: 25,
        ingredients: [
          "3 whole eggs",
          "100g chicken breast",
          "2 large whole wheat wraps",
          "30g low-fat cheese",
          "Baby spinach",
          "15g olive oil",
          "Hot sauce",
          "Seasoning"
        ],
        instructions: [
          "Cook diced chicken",
          "Scramble eggs",
          "Warm wraps",
          "Assemble and wrap",
          "12 minutes total"
        ],
        notes: "Elite breakfast wrap. Prep chicken night before. Great pre-training meal."
      },
      {
          name: "Muscle Building Rice Bowl",
          timing: "Lunch",
          calories: 700,
          protein: 58,
          carbs: 65,
          fats: 28,
          ingredients: [
            "250g chicken breast",
            "120g jasmine rice",
            "Asian-style marinade",
            "150g broccoli",
            "50g bell peppers",
            "20g sesame oil",
            "Green onions",
            "Sesame seeds"
          ],
          instructions: [
            "Cook rice",
            "Grill marinated chicken",
            "Stir-fry vegetables",
            "Combine with sauce",
            "20 minutes total"
          ],
          notes: "Perfect for 2-3 hours before training or post-workout meal. Double rice portion post-training for glycogen replenishment."
        },
        {
          name: "Champion's Steak & Potatoes",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 30,
          ingredients: [
            "220g lean beef steak",
            "200g sweet potatoes",
            "Mixed herbs",
            "150g green vegetables",
            "20g olive oil",
            "Garlic butter",
            "Fresh rosemary",
            "Black pepper"
          ],
          instructions: [
            "Season steak",
            "Prepare potatoes",
            "Grill steak to preference",
            "Steam vegetables",
            "20 minutes total"
          ],
          notes: "Great post-training dinner (2-3 hours after workout). High in iron and zinc for recovery. Add extra potato if bulking."
        },
        {
          name: "Anabolic Protein Pudding",
          timing: "Snack",
          calories: 650,
          protein: 50,
          carbs: 60,
          fats: 25,
          ingredients: [
            "60g whey protein",
            "250g Greek yogurt",
            "40g granola",
            "1 banana",
            "30g almond butter",
            "Honey to taste",
            "Cinnamon"
          ],
          instructions: [
            "Mix protein and yogurt",
            "Layer ingredients",
            "Add toppings",
            "5 minutes total"
          ],
          notes: "Perfect pre-bed meal. Slow-digesting proteins for overnight recovery. Can have 30-60 mins before sleep."
        }
      ],
      // Day 11
      [
        {
          name: "Beast Mode Breakfast Bowl",
          timing: "Breakfast",
          calories: 500,
          protein: 45,
          carbs: 40,
          fats: 22,
          ingredients: [
            "4 whole eggs",
            "100g chicken breast",
            "2 slices sourdough",
            "Mushrooms",
            "Spinach",
            "15g olive oil",
            "Italian herbs",
            "Cherry tomatoes"
          ],
          instructions: [
            "Cook diced chicken",
            "Scramble eggs",
            "Sauté vegetables",
            "Toast bread",
            "15 minutes total"
          ],
          notes: "Eat 2-3 hours before morning training for optimal performance. Reduce portion if eating closer to workout."
        },
        {
          name: "Performance Pasta Bolognese",
          timing: "Lunch",
          calories: 700,
          protein: 60,
          carbs: 65,
          fats: 25,
          ingredients: [
            "220g lean beef mince",
            "120g whole grain pasta",
            "Italian seasoning",
            "150g mixed vegetables",
            "Tomato sauce",
            "20g olive oil",
            "Fresh basil",
            "Parmesan"
          ],
          instructions: [
            "Cook pasta al dente",
            "Prepare meat sauce",
            "Mix vegetables in",
            "Combine all",
            "25 minutes total"
          ],
          notes: "Perfect 2-3 hours pre-training or immediately post-workout. Add extra pasta post-training."
        },
        {
          name: "Muscle Building Stir-Fry",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 30,
          ingredients: [
            "250g chicken breast",
            "100g basmati rice",
            "Asian stir-fry sauce",
            "200g mixed vegetables",
            "20g sesame oil",
            "Ginger-garlic paste",
            "Green onions",
            "Sesame seeds"
          ],
          instructions: [
            "Slice chicken into thin strips against the grain",
            "Cook rice with 1:1.5 ratio water, simmer 12-15min",
            "Heat oil in wok/pan until shimmering, stir-fry chicken 4-5min until golden",
            "Remove chicken, stir-fry veg 3-4min until crisp-tender",
            "Return chicken, add sauce, heat through 2min",
            "Garnish with sesame seeds and green onions",
            "25 minutes total"
          ],
          notes: "Great post-workout dinner. Eat within 2 hours after training. Double rice portion if bulking."
        },
        {
          name: "Recovery Protein Cheesecake",
          timing: "Snack",
          calories: 650,
          protein: 45,
          carbs: 55,
          fats: 30,
          ingredients: [
            "250g low-fat cream cheese",
            "40g whey protein",
            "30g Greek yogurt",
            "30g rolled oats",
            "2 whole eggs",
            "25g honey",
            "Vanilla extract",
            "Mixed berries"
          ],
          instructions: [
            "Blend cream cheese, protein, and yogurt until smooth",
            "Mix in beaten eggs and honey",
            "Press oats into base of small dish",
            "Pour mixture over base",
            "Microwave 3-4min until set",
            "Cool 5min before topping with berries",
            "15 minutes total"
          ],
          notes: "High protein dessert. Great 1-2 hours before bed. Makes 2 servings."
        }
      ],
      // Day 12
      [
        {
          name: "Power Breakfast Burrito",
          timing: "Breakfast",
          calories: 500,
          protein: 45,
          carbs: 35,
          fats: 25,
          ingredients: [
            "3 whole eggs",
            "100g chicken breast",
            "2 large whole wheat tortillas",
            "30g low-fat cheese",
            "50g bell peppers",
            "30g onions",
            "15g olive oil",
            "Mexican seasoning"
          ],
          instructions: [
            "Dice chicken into small cubes, season with Mexican spices",
            "Heat oil over medium-high, cook chicken 5-6min until golden",
            "Sauté diced peppers and onions 3min until soft",
            "Beat eggs, add to pan, scramble until just set",
            "Warm tortillas in pan 30sec each side",
            "Layer cheese, egg mix, roll tightly",
            "Optional: grill seam-side down for seal",
            "15 minutes total"
          ],
          notes: "Perfect pre-training breakfast. Eat 2-3 hours before morning workout. Can make ahead and reheat."
        },
        {
          name: "Athletes' Loaded Pasta",
          timing: "Lunch",
          calories: 700,
          protein: 58,
          carbs: 65,
          fats: 28,
          ingredients: [
            "250g chicken breast",
            "120g whole grain pasta",
            "200g mixed vegetables",
            "Garlic cream sauce",
            "20g olive oil",
            "Italian herbs",
            "30g parmesan",
            "Red chili flakes"
          ],
          instructions: [
            "Slice chicken into even strips, season with Italian herbs",
            "Boil pasta in salted water until al dente (follow pack time)",
            "Meanwhile, heat oil, cook chicken 6-7min until done",
            "Add vegetables, sauté 4-5min until tender-crisp",
            "Make quick sauce: cream, garlic, parmesan",
            "Combine pasta, chicken, veg, sauce",
            "Top with extra parmesan and chili if desired",
            "25 minutes total"
          ],
          notes: "Perfect for heavy training days. Eat 2-3 hours before workout or right after. Double sauce if bulking."
        },
        {
          name: "Korean Style Power Bowl",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 30,
          ingredients: [
            "250g chicken breast",
            "100g brown rice",
            "Korean spice paste (gochujang)",
            "150g mixed vegetables",
            "20g sesame oil",
            "Kimchi (halal verified)",
            "Sesame seeds",
            "Green onions"
          ],
          instructions: [
            "Slice chicken into thin strips, marinate with gochujang 10min",
            "Cook rice with 1:1.5 ratio water, simmer covered 20min",
            "Heat sesame oil in large pan until hot",
            "Stir-fry chicken 5-6min until caramelized",
            "Add vegetables, cook 3-4min keeping crisp",
            "Serve over rice, top with kimchi",
            "Garnish with sesame seeds and green onions",
            "25 minutes total"
          ],
          notes: "Great post-training meal. Eat within 2 hours after workout. Check kimchi is halal certified."
        },
        {
          name: "Muscle Building Protein Balls",
          timing: "Snack",
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 28,
          ingredients: [
            "50g whey protein",
            "40g almond butter",
            "30g honey",
            "40g oats",
            "20g dark chocolate chips",
            "Pinch sea salt",
            "Vanilla extract",
            "Coconut for rolling"
          ],
          instructions: [
            "Blend protein powder with almond butter and honey",
            "Mix in oats and chocolate chips",
            "Roll into 8-10 balls",
            "Coat with coconut",
            "Refrigerate 30min to set",
            "10 minutes prep"
          ],
          notes: "Perfect pre-bed snack. Have 1-2 hours before sleep. Makes multiple servings."
        }
      ],
      // Day 13
      [
        {
          name: "Japanese Inspired Protein Toast",
          timing: "Breakfast",
          calories: 500,
          protein: 42,
          carbs: 38,
          fats: 24,
          ingredients: [
            "4 whole eggs",
            "2 thick slices whole grain bread",
            "100g mushrooms",
            "Furikake seasoning (halal)",
            "15g sesame oil",
            "Soy sauce",
            "Green onions",
            "Chili oil optional"
          ],
          instructions: [
            "Slice mushrooms thinly, sauté in sesame oil 4-5min",
            "Toast bread until golden brown",
            "Scramble eggs with touch of soy sauce",
            "Layer: toast, eggs, mushrooms",
            "Top with furikake and green onions",
            "Drizzle with chili oil if using",
            "12 minutes total"
          ],
          notes: "Eat 2-3 hours before morning training. Verify furikake is halal certified."
        },
        {
          name: "Chinese Style Beef Bowl",
          timing: "Lunch",
          calories: 700,
          protein: 58,
          carbs: 60,
          fats: 28,
          ingredients: [
            "250g lean beef strips",
            "120g jasmine rice",
            "200g broccoli",
            "Black bean sauce (halal)",
            "20g sesame oil",
            "Ginger-garlic paste",
            "Green onions",
            "White pepper"
          ],
          instructions: [
            "Marinate beef with ginger-garlic paste 10min",
            "Cook rice with slight less water for firmer texture",
            "Heat wok until smoking, add oil",
            "Stir-fry beef in batches 2-3min each",
            "Add vegetables, sauté 4-5min until tender-crisp",
            "Combine with sauce, heat through",
            "Garnish with green onions",
            "25 minutes total"
          ],
          notes: "Perfect post-training meal. Eat within 90min after workout. Double rice if bulking."
        },
        {
          name: "Thai Basil Chicken Rice",
          timing: "Dinner",
          calories: 650,
          protein: 55,
          carbs: 45,
          fats: 28,
          ingredients: [
            "250g ground chicken",
            "100g jasmine rice",
            "Thai basil leaves",
            "150g green beans",
            "20g coconut oil",
            "Halal fish sauce",
            "Garlic and chilies",
            "Lime wedges"
          ],
          instructions: [
            "Cook rice, fluff and let stand covered",
            "Crush garlic and chilies in mortar",
            "Heat oil in wok until very hot",
            "Cook chicken, breaking up well, 5-6min",
            "Add beans, stir-fry 3min",
            "Season with fish sauce, add basil",
            "Serve with lime wedges",
            "20 minutes total"
          ],
          notes: "Great evening meal. Light enough for evening training. Use halal certified fish sauce."
        },
        {
          name: "Matcha Protein Shake",
          timing: "Snack",
          calories: 600,
          protein: 45,
          carbs: 55,
          fats: 25,
          ingredients: [
            "50g vanilla whey protein",
            "2 tsp matcha powder",
            "300ml milk",
            "1 banana",
            "30g oats",
            "20g honey",
            "Ice cubes"
          ],
          instructions: [
            "Blend protein, matcha, milk until smooth",
            "Add remaining ingredients",
            "Blend with ice until thick",
            "Adjust thickness with milk",
            "5 minutes total"
          ],
          notes: "Great pre-workout (2 hours before) or post-workout. Natural caffeine boost from matcha."
        }
      ],
      //day 14
      [
          {
            name: "Turkish Power Plate",
            timing: "Breakfast",
            calories: 500,
            protein: 45,
            carbs: 35,
            fats: 25,
            ingredients: [
              "3 whole eggs",
              "100g halal beef sausage",
              "2 whole grain pita",
              "50g feta cheese",
              "Tomatoes",
              "15g olive oil",
              "Za'atar",
              "Olives"
            ],
            instructions: [
              "Cook sliced sausage",
              "Fry eggs",
              "Warm pita",
              "Assemble plate",
              "15 minutes total"
            ],
            notes: "Turkish breakfast with extra protein. Use chicken sausage if preferred."
          },
          {
            name: "Super Tandoori Bowl",
            timing: "Lunch",
            calories: 700,
            protein: 60,
            carbs: 55,
            fats: 30,
            ingredients: [
              "300g chicken thighs",
              "100g basmati rice",
              "Tandoori spices",
              "150g mixed vegetables",
              "30g yogurt",
              "15g ghee",
              "Mint chutney",
              "Raita"
            ],
            instructions: [
              "Marinate chicken",
              "Cook rice",
              "Grill chicken",
              "Steam vegetables",
              "25 minutes total"
            ],
            notes: "High protein Indian. Use ready spice mix. Double marinade for next day."
          },
          {
            name: "Lamb Kofte Plate",
            timing: "Dinner",
            calories: 650,
            protein: 55,
            carbs: 40,
            fats: 30,
            ingredients: [
              "250g lamb mince",
              "70g couscous",
              "Middle Eastern spices",
              "150g grilled vegetables",
              "20g olive oil",
              "Garlic sauce",
              "Fresh mint",
              "Sumac"
            ],
            instructions: [
              "Form and grill kofte",
              "Prepare couscous",
              "Grill vegetables",
              "Make sauce",
              "20 minutes total"
            ],
            notes: "Use beef if preferred. Make extra kofte to freeze. Add pine nuts if desired."
          },
          {
            name: "Anabolic Date Shake",
            timing: "Snack",
            calories: 650,
            protein: 50,
            carbs: 65,
            fats: 22,
            ingredients: [
              "60g whey protein",
              "300ml milk",
              "40g dates",
              "30g peanut butter",
              "Vanilla",
              "Cinnamon",
              "Ice"
            ],
            instructions: [
              "Blend all ingredients",
              "Add ice",
              "3 minutes total"
            ],
            notes: "High calorie gainer shake. Great post-workout. Use protein milk for extra gains."
          }
        ],
      ]
      },
      //3000 plan will go here
      {
          id: "dp_3000",
          name: "Gradual Bulk - 3000kcal",
          calories: 3000,
          weekCycle: [
            // Day 1
            [
              {
                name: "Middle Eastern Power Breakfast",
                timing: "Early morning",
                calories: 700,
                protein: 55,
                carbs: 65,
                fats: 28,
                ingredients: [
                  "200g lamb mince",
                  "3 whole eggs",
                  "2 flatbreads",
                  "100g mixed peppers",
                  "Spices: zaatar, sumac, cumin, black pepper",
                  "Fresh parsley and mint",
                  "20g olive oil",
                  "Greek yogurt for serving"
                ],
                instructions: [
                  "Season lamb with spices",
                  "Heat oil, cook lamb 5-6min breaking up well",
                  "Push lamb aside, crack eggs in pan",
                  "Warm flatbreads directly on heat 30sec each",
                  "Add peppers to lamb last minute",
                  "Layer flatbread, lamb, eggs",
                  "Garnish with herbs, serve with yogurt",
                  "Total time: 15min"
                ],
                notes: "Perfect pre-training breakfast (eat 2hrs before). Complex carbs and protein for sustained energy. Can prep lamb mix night before."
              },
              {
                  name: "Pakistani Keema Paratha Bowl",
                  timing: "Mid-morning/lunch",
                  calories: 800,
                  protein: 60,
                  carbs: 75,
                  fats: 32,
                  ingredients: [
                    "250g lean beef mince",
                    "2 whole wheat parathas",
                    "100g chickpeas",
                    "100g mixed vegetables (carrots, peas)",
                    "Spices: garam masala, turmeric, red chili, cumin",
                    "25g butter",
                    "Fresh ginger and garlic",
                    "Mint chutney for serving"
                  ],
                  instructions: [
                    "Mix mince with finely chopped ginger-garlic",
                    "Add all spices to meat, mix well",
                    "Heat pan, cook meat 8-10min breaking up well",
                    "Add vegetables and chickpeas, cook 5min",
                    "Warm parathas in separate pan 1min each side",
                    "Assemble bowl: paratha base, keema, chutney",
                    "Finish with knob of butter",
                    "Total time: 20min"
                  ],
                  notes: "High calorie, protein-rich meal. Perfect for heavy training days. Eat 2hrs before or 90min after workout. Can make extra keema for next day."
                },
                {
                  name: "Mediterranean Grilled Chicken Platter",
                  timing: "Late afternoon/dinner",
                  calories: 850,
                  protein: 70,
                  carbs: 70,
                  fats: 35,
                  ingredients: [
                    "300g chicken breast",
                    "150g basmati rice",
                    "150g mixed roasted vegetables",
                    "Marinade: olive oil, lemon, garlic",
                    "Spices: oregano, paprika, black pepper, thyme",
                    "20g olive oil",
                    "Tahini sauce",
                    "Fresh parsley"
                  ],
                  instructions: [
                    "Butterfly chicken breasts evenly",
                    "Mix marinade spices, coat chicken well",
                    "Let sit 10min (or overnight)",
                    "Cook rice with pinch of salt",
                    "Heat pan/grill on high",
                    "Grill chicken 6-7min each side",
                    "Roast vegetables in same pan",
                    "Mix tahini with lemon juice and water",
                    "Total time: 25min (excluding marinade)"
                  ],
                  notes: "Excellent post-workout meal. High protein for muscle recovery, complex carbs for glycogen replenishment. Meal prep friendly - make extra for tomorrow's lunch."
                },
                {
                  name: "Anabolic Night Protein Pudding",
                  timing: "Evening/pre-bed",
                  calories: 650,
                  protein: 50,
                  carbs: 55,
                  fats: 30,
                  ingredients: [
                    "60g casein protein",
                    "50g almond butter",
                    "1 large banana",
                    "200ml milk",
                    "30g honey",
                    "Cinnamon and cardamom",
                    "15g chia seeds",
                    "Chopped dates for topping"
                  ],
                  instructions: [
                    "Mix protein with half the milk until smooth",
                    "Add remaining milk gradually",
                    "Stir in almond butter and mashed banana",
                    "Add spices and chia seeds",
                    "Refrigerate 10min to thicken",
                    "Top with chopped dates",
                    "Total time: 5min + setting time"
                  ],
                  notes: "Perfect pre-bed meal. Slow-digesting protein for overnight recovery. Healthy fats and complex carbs for sustained release. Prepare while having dinner to let it set."
                }
                ],
                // Day 2
                [
                {
                  name: "Turkish Power Breakfast",
                  timing: "Early morning",
                  calories: 750,
                  protein: 55,
                  carbs: 70,
                  fats: 35,
                  ingredients: [
                    "200g seasoned beef mince",
                    "3 eggs",
                    "100g mushrooms",
                    "2 Turkish pide bread",
                    "Spices: red pepper, cumin, oregano",
                    "25g butter",
                    "Fresh parsley",
                    "Chili flakes"
                  ],
                  instructions: [
                    "Season beef with spices",
                    "Cook beef in large pan 7-8min",
                    "Add sliced mushrooms, cook 3min",
                    "Make wells in mixture, crack eggs in",
                    "Cover and cook until eggs set",
                    "Warm pide bread",
                    "Finish with butter and parsley",
                    "Total time: 15-20min"
                  ],
                  notes: "High-energy breakfast. Eat 2-3 hours before morning training. Extra bread portion for higher intensity days. Can prep beef mix night before."
                },
                {
                  name: "Shawarma Loaded Rice Bowl",
                  timing: "Late morning/lunch",
                  calories: 800,
                  protein: 65,
                  carbs: 75,
                  fats: 30,
                  ingredients: [
                    "280g chicken thighs",
                    "150g basmati rice",
                    "100g mixed bell peppers",
                    "Shawarma spices: allspice, cardamom, coriander, cumin, turmeric",
                    "20g olive oil",
                    "Fresh garlic and ginger",
                    "Tahini-yogurt sauce",
                    "Fresh mint and parsley"
                  ],
                  instructions: [
                    "Slice chicken thighs into strips",
                    "Mix shawarma spices, coat chicken well",
                    "Cook rice with pinch of saffron if available",
                    "Heat pan on high, add oil",
                    "Cook chicken in batches 6-7min each",
                    "Stir-fry peppers separately",
                    "Mix tahini with yogurt and lemon juice",
                    "Layer rice, chicken, peppers, sauce",
                    "Total time: 25min"
                  ],
                  notes: "Perfect post-morning workout meal. Rich in protein and complex carbs. Can marinate chicken overnight for better flavor. Double rice portion on heavy training days."
                },
                {
                  name: "Athlete's Biryani",
                  timing: "Pre/post workout dinner",
                  calories: 850,
                  protein: 70,
                  carbs: 80,
                  fats: 35,
                  ingredients: [
                    "300g lamb chunks",
                    "180g basmati rice",
                    "Biryani spices: cardamom, cinnamon, bay leaves",
                    "100g mixed vegetables",
                    "25g ghee",
                    "Fresh mint and coriander",
                    "Garlic-ginger paste",
                    "Greek yogurt for serving"
                  ],
                  instructions: [
                    "Wash rice, soak 20min",
                    "Marinate lamb with spices and garlic-ginger",
                    "Heat ghee, brown lamb 8-10min",
                    "Add rice and vegetables",
                    "Add hot water (1.5:1 ratio)",
                    "Cover and cook 15min",
                    "Let rest 5min, fluff with fork",
                    "Garnish with fresh herbs",
                    "Total time: 35min active"
                  ],
                  notes: "High-calorie complete meal. Best 2hrs before evening training or post-workout. Prep meat earlier if possible. Scale rice portion based on training intensity."
                },
                {
                  name: "Muscle Building Dessert Bowl",
                  timing: "Evening/dessert",
                  calories: 600,
                  protein: 45,
                  carbs: 60,
                  fats: 25,
                  ingredients: [
                    "50g whey protein",
                    "100g Greek yogurt",
                    "40g granola",
                    "2 tbsp honey",
                    "30g mixed nuts",
                    "1 sliced banana",
                    "Cinnamon and cardamom",
                    "15g chia seeds"
                  ],
                  instructions: [
                    "Mix protein with small amount of water",
                    "Fold into Greek yogurt",
                    "Layer granola at bottom of bowl",
                    "Add protein-yogurt mixture",
                    "Top with nuts, banana",
                    "Drizzle with honey",
                    "Sprinkle spices and chia",
                    "Total time: 5min"
                  ],
                  notes: "Great for muscle recovery and satisfying sweet cravings. Perfect before bed on training days. Can prepare components in advance."
                }
                ],
                // Day 3
                [
                {
                  name: "Champion's Breakfast Plate",
                  timing: "Early morning",
                  calories: 750,
                  protein: 60,
                  carbs: 65,
                  fats: 35,
                  ingredients: [
                    "250g beef steak (minced or chopped)",
                    "3 whole eggs",
                    "2 Arabic bread or 2 pieces of store bought bread of your choice",
                    "100g mushrooms",
                    "Spices: black pepper, sumac, zaatar",
                    "20g butter",
                    "Fresh parsley",
                    "Chili sauce (optional)"
                  ],
                  instructions: [
                    "Season beef generously",
                    "Heat pan until very hot",
                    "Cook beef 4-5min for medium",
                    "Push to side, add butter",
                    "Cook eggs to preference",
                    "Warm bread directly on flame",
                    "Sauté mushrooms in beef fat",
                    "Assemble all components",
                    "Total time: 15min"
                  ],
                  notes: "High-protein breakfast ideal for muscle preservation. Perfect 2-3 hours before morning training. Scale bread based on training volume."
                },
                {
                  name: "Lebanese Grilled Chicken Platter",
                  timing: "Late morning/lunch",
                  calories: 800,
                  protein: 65,
                  carbs: 70,
                  fats: 35,
                  ingredients: [
                    "270g chicken breast",
                    "150g vermicelli rice",
                    "100g grilled vegetables",
                    "Lebanese 7-spice mix",
                    "25g olive oil",
                    "Garlic paste",
                    "Fresh parsley and mint",
                    "Lemon-tahini sauce"
                  ],
                  instructions: [
                    "Butterfly chicken breasts evenly",
                    "Mix spices, oil, garlic for marinade",
                    "Coat chicken well",
                    "Toast vermicelli in pan until golden",
                    "Add rice, cook together",
                    "Grill chicken 6-7min each side",
                    "Grill vegetables with chicken",
                    "Mix tahini sauce with lemon",
                    "Total time: 25min"
                  ],
                  notes: "Perfect pre-workout lunch (2-3 hours before). Complete proteins and complex carbs for sustained energy. Can prep chicken night before."
                },
                {
                  name: "Power Seekh Kebab Bowl",
                  timing: "Post-workout/dinner",
                  calories: 850,
                  protein: 70,
                  carbs: 75,
                  fats: 35,
                  ingredients: [
                    "300g minced lamb",
                    "160g basmati rice",
                    "Kebab spices: garam masala, red chili, cumin",
                    "100g mixed peppers and onions",
                    "20g ghee",
                    "Fresh mint chutney",
                    "Garlic-ginger paste",
                    "Greek yogurt"
                  ],
                  instructions: [
                    "Mix lamb with spices and paste",
                    "Form into kebabs around skewers",
                    "Start rice cooking",
                    "Heat grill pan on high",
                    "Cook kebabs 4-5min each side",
                    "Grill vegetables until charred",
                    "Mix mint chutney with yogurt",
                    "Assemble bowl with all components",
                    "Total time: 30min"
                  ],
                  notes: "High-protein post-workout meal. Eat within 90min of training. Rich in nutrients for muscle recovery. Make extra for next day's lunch."
                },
                {
                  name: "Recovery Protein Custard",
                  timing: "Evening/pre-bed",
                  calories: 600,
                  protein: 45,
                  carbs: 55,
                  fats: 30,
                  ingredients: [
                    "60g casein protein",
                    "40g almond butter",
                    "200ml milk",
                    "1 banana",
                    "30g honey",
                    "Vanilla extract",
                    "Cinnamon",
                    "20g pistachios for topping"
                  ],
                  instructions: [
                    "Heat milk until warm (not hot)",
                    "Whisk in protein gradually",
                    "Add almond butter, melt in",
                    "Mash banana, stir through",
                    "Add vanilla and cinnamon",
                    "Let thicken 5min, stirring",
                    "Top with crushed pistachios",
                    "Total time: 10min"
                  ],
                  notes: "Ideal pre-bed meal. Slow-digesting protein for overnight recovery. Healthy fats for sustained release. Prepare after dinner."
                }
                
  
          ],
          [
              {
                name: "Arabian Muscle Builder Breakfast",
                timing: "Early morning",
                calories: 750,
                protein: 60,
                carbs: 70,
                fats: 35,
                ingredients: [
                  "250g beef fillet",
                  "3 eggs",
                  "2 khubz (Arabic bread) or 2 pieces of store bought bread of your choice",
                  "100g sautéed spinach",
                  "Middle Eastern spices: baharat, cumin",
                  "25g olive oil",
                  "Fresh parsley",
                  "Tahini sauce"
                ],
                instructions: [
                  "Cut beef into thin strips",
                  "Season well with spices",
                  "Heat pan until very hot",
                  "Flash cook beef 2-3min",
                  "Remove, cook eggs in same pan",
                  "Sauté spinach with garlic",
                  "Warm bread over flame",
                  "Serve with tahini drizzle",
                  "Total time: 15min"
                ],
                notes: "High-protein breakfast. Perfect 2hrs before morning training. Can prep beef night before. Double bread if very intense session planned."
              },
              {
                name: "Tandoori Chicken Rice Power Bowl",
                timing: "Lunch/post-morning workout",
                calories: 800,
                protein: 65,
                carbs: 75,
                fats: 30,
                ingredients: [
                  "280g chicken breast",
                  "150g basmati rice",
                  "Tandoori spice blend",
                  "100g mixed vegetables",
                  "25g ghee",
                  "Yogurt for marinade",
                  "Ginger-garlic paste",
                  "Fresh mint chutney"
                ],
                instructions: [
                  "Marinate chicken in spiced yogurt",
                  "Cook rice with cardamom pod",
                  "Heat pan/grill on high",
                  "Cook chicken 7-8min each side",
                  "Sauté vegetables in ghee",
                  "Let chicken rest 5min",
                  "Slice chicken against grain",
                  "Layer bowl components",
                  "Total time: 25min"
                ],
                notes: "Perfect post-workout meal. High protein for recovery. Eat within 90min of training. Make extra for tomorrow's lunch."
              },
              {
                name: "Mediterranean Lamb Rice Pilaf",
                timing: "Dinner",
                calories: 850,
                protein: 65,
                carbs: 80,
                fats: 35,
                ingredients: [
                  "300g lamb shoulder",
                  "160g long grain rice",
                  "Mediterranean spice mix",
                  "100g mixed peppers",
                  "25g olive oil",
                  "Pine nuts",
                  "Fresh herbs",
                  "Garlic-lemon sauce"
                ],
                instructions: [
                  "Cut lamb into bite-sized pieces",
                  "Season well with spices",
                  "Brown lamb in batches",
                  "Cook rice in stock",
                  "Sauté peppers separately",
                  "Toast pine nuts until golden",
                  "Combine all components",
                  "Finish with herb sauce",
                  "Total time: 35min"
                ],
                notes: "Rich in nutrients for muscle growth. Good pre-evening workout (3hrs before) or post-workout dinner. Scale rice portion based on training."
              },
              {
                name: "Anabolic Date Smoothie",
                timing: "Evening/pre-bed",
                calories: 600,
                protein: 45,
                carbs: 60,
                fats: 25,
                ingredients: [
                  "50g casein protein",
                  "4 medjool dates",
                  "250ml milk",
                  "30g almonds",
                  "1 banana",
                  "Cinnamon",
                  "Vanilla extract",
                  "Ice cubes"
                ],
                instructions: [
                  "Pit and soak dates 5min",
                  "Blend protein and milk first",
                  "Add remaining ingredients",
                  "Blend until smooth",
                  "Adjust thickness with ice",
                  "Total time: 5min"
                ],
                notes: "Perfect pre-bed shake. Slow-releasing protein and healthy fats for overnight recovery. Ideal after evening training."
              }
              ],
              [
                  {
                    name: "Beast Mode Beef Bowl",
                    timing: "Early morning",
                    calories: 750,
                    protein: 60,
                    carbs: 70,
                    fats: 35,
                    ingredients: [
                      "250g lean ground beef",
                      "2 whole eggs",
                      "150g sweet potato",
                      "Persian spice blend",
                      "100g mixed peppers",
                      "20g olive oil",
                      "Fresh herbs",
                      "Chili sauce"
                    ],
                    instructions: [
                      "Dice sweet potato small",
                      "Season beef with spices",
                      "Cook potato first 5-7min",
                      "Add beef, brown well",
                      "Push aside, cook eggs",
                      "Add peppers last minute",
                      "Mix all together",
                      "Garnish with herbs",
                      "Total time: 20min"
                    ],
                    notes: "High-energy breakfast. Complex carbs for sustained energy. Eat 2hrs before morning training."
                  },
                  {
                    name: "Protein-Packed Chicken Biryani",
                    timing: "Lunch",
                    calories: 800,
                    protein: 65,
                    carbs: 75,
                    fats: 30,
                    ingredients: [
                      "270g chicken breast",
                      "150g basmati rice",
                      "Biryani spices",
                      "100g mixed vegetables",
                      "25g ghee",
                      "Mint and coriander",
                      "Ginger-garlic paste",
                      "Raita for serving"
                    ],
                    instructions: [
                      "Marinate chicken with spices",
                      "Par-boil rice 70%",
                      "Layer chicken and rice",
                      "Add ghee and herbs",
                      "Steam cook 15min",
                      "Let rest 5min",
                      "Fluff with fork",
                      "Serve with raita",
                      "Total time: 30min"
                    ],
                    notes: "Perfect post-workout meal. Complete protein and carbs. Make extra for next day."
                  },
                  {
                    name: "Turkish Beef Kofte Plate",
                    timing: "Dinner",
                    calories: 850,
                    protein: 70,
                    carbs: 75,
                    fats: 35,
                    ingredients: [
                      "300g ground beef",
                      "160g bulgur wheat",
                      "Turkish spice mix",
                      "100g grilled vegetables",
                      "20g olive oil",
                      "Fresh parsley",
                      "Garlic sauce",
                      "Sumac for garnish"
                    ],
                    instructions: [
                      "Mix beef with spices",
                      "Form into kofte shapes",
                      "Cook bulgur separately",
                      "Grill kofte 4min each side",
                      "Grill vegetables alongside",
                      "Mix garlic sauce",
                      "Plate all components",
                      "Garnish with sumac",
                      "Total time: 25min"
                    ],
                    notes: "High-protein dinner. Great pre-evening workout (3hrs before) or post-workout meal."
                  },
                  {
                    name: "Muscle Recovery Shake",
                    timing: "Evening",
                    calories: 600,
                    protein: 45,
                    carbs: 55,
                    fats: 30,
                    ingredients: [
                      "60g casein protein",
                      "35g peanut butter",
                      "1 banana",
                      "200ml milk",
                      "30g honey",
                      "Cinnamon",
                      "Ice cubes"
                    ],
                    instructions: [
                      "Blend protein and milk",
                      "Add remaining ingredients",
                      "Blend until smooth",
                      "Adjust thickness",
                      "Total time: 5min"
                    ],
                    notes: "Perfect pre-bed shake. Slow-digesting protein for overnight recovery."
                  }
                  ],
                  // Day 6
[
  {
    name: "Athlete's Spiced Lamb Breakfast",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g minced lamb",
      "3 whole eggs",
      "2 Arabic bread or 2 pieces of store bought bread of your choice",
      "100g spinach",
      "Middle Eastern spices: zaatar, sumac, cumin",
      "20g olive oil",
      "Fresh parsley",
      "Labneh for serving"
    ],
    instructions: [
      "Season lamb with spices",
      "Cook lamb until browned 5-6min",
      "Add spinach last minute",
      "Cook eggs in same pan",
      "Warm bread on flame",
      "Plate with labneh",
      "Garnish with herbs",
      "Total time: 15min"
    ],
    notes: "High-protein breakfast. Perfect 2hrs before morning training. Rich in iron for performance."
  },
  {
    name: "Persian Style Chicken Rice",
    timing: "Lunch/post-workout",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken thighs",
      "150g saffron rice",
      "Persian spice blend",
      "100g grilled tomatoes",
      "25g butter",
      "Fresh herbs",
      "Garlic-saffron sauce",
      "Sumac for garnish"
    ],
    instructions: [
      "Cut chicken into large chunks",
      "Season well with spices",
      "Start rice cooking",
      "Grill chicken 6-7min each side",
      "Grill tomatoes until soft",
      "Mix garlic-saffron sauce",
      "Layer rice and chicken",
      "Total time: 25min"
    ],
    notes: "Ideal post-workout meal. Eat within 90min of training. Complete protein and carbs for recovery."
  },
  {
    name: "Beef Kofta Power Plate",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g beef mince",
      "160g freekeh",
      "Arabic seven spice",
      "100g mixed vegetables",
      "20g olive oil",
      "Fresh mint",
      "Tahini sauce",
      "Pine nuts"
    ],
    instructions: [
      "Mix beef with spices",
      "Form into kofta shapes",
      "Cook freekeh separately",
      "Grill kofta 4min each side",
      "Roast vegetables",
      "Toast pine nuts",
      "Mix tahini sauce",
      "Assemble all components",
      "Total time: 30min"
    ],
    notes: "Perfect pre-evening workout (3hrs before) or post-workout dinner. Scale freekeh portion based on training volume."
  },
  {
    name: "Middle Eastern Recovery Pudding",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "30g tahini",
      "3 medjool dates",
      "200ml milk",
      "20g pistachios",
      "Rose water",
      "Cinnamon",
      "Honey to taste"
    ],
    instructions: [
      "Blend protein with milk",
      "Add tahini and dates",
      "Blend until smooth",
      "Add rose water and cinnamon",
      "Top with crushed pistachios",
      "Drizzle honey",
      "Total time: 5min"
    ],
    notes: "Ideal pre-bed meal. Slow-digesting protein for overnight recovery. Rich in healthy fats and minerals."
  }
  ], 
  // Day 7
[
  {
    name: "High-Performance Turkish Breakfast",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g beef strips",
      "3 eggs",
      "2 pide bread",
      "100g charred peppers",
      "Turkish spice blend",
      "25g butter",
      "Fresh parsley",
      "Red pepper paste"
    ],
    instructions: [
      "Slice beef thinly",
      "Season with spices",
      "Flash fry beef 2-3min",
      "Cook eggs sunny side up",
      "Char peppers on flame",
      "Warm pide bread",
      "Assemble with butter",
      "Total time: 15min"
    ],
    notes: "Energy-dense breakfast. Perfect 2-3hrs before morning training. Rich in protein and iron for performance."
  },
  {
    name: "Indian Butter Chicken Protein Bowl",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken breast",
      "150g jeera rice",
      "Butter chicken spice mix",
      "100g mixed vegetables",
      "25g ghee",
      "Tomato base",
      "Ginger-garlic paste",
      "Fresh coriander"
    ],
    instructions: [
      "Cut chicken into cubes",
      "Marinate with spices",
      "Cook rice with cumin",
      "Make sauce with tomatoes",
      "Cook chicken in sauce",
      "Steam vegetables",
      "Finish with cream",
      "Garnish with coriander",
      "Total time: 30min"
    ],
    notes: "Perfect post-workout lunch. High protein and complex carbs. Prepare sauce ahead for quicker cooking."
  },
  {
    name: "Levantine Grilled Lamb Bowl",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g lamb shoulder",
      "160g bulgur wheat",
      "Lebanese 7-spice blend",
      "100g grilled vegetables",
      "20g olive oil",
      "Fresh mint",
      "Garlic sauce",
      "Pine nuts"
    ],
    instructions: [
      "Cut lamb into chunks",
      "Season well with spices",
      "Cook bulgur separately",
      "Grill lamb 4-5min each side",
      "Grill vegetables",
      "Make garlic sauce",
      "Toast pine nuts",
      "Combine all elements",
      "Total time: 25min"
    ],
    notes: "Rich in protein for muscle growth. Great post-evening workout meal. Double bulgur portion on heavy training days."
  },
  {
    name: "Arabian Nights Protein Smoothie",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "4 medjool dates",
      "30g almond butter",
      "200ml milk",
      "Cardamom powder",
      "Vanilla extract",
      "Ice cubes",
      "Cinnamon"
    ],
    instructions: [
      "Blend protein and milk",
      "Add dates and almond butter",
      "Add spices and vanilla",
      "Blend with ice",
      "Adjust thickness",
      "Total time: 5min"
    ],
    notes: "Perfect pre-bed shake. Slow-digesting protein with healthy fats for overnight recovery and muscle growth."
  }
  ],
  // Day 8
[
  {
    name: "Asian Beef & Rice Bowl",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g beef strips",
      "150g jasmine rice",
      "2 eggs",
      "100g broccoli",
      "Asian sauce: soy sauce, garlic, ginger",
      "20g sesame oil",
      "Green onions",
      "White pepper"
    ],
    instructions: [
      "Cook rice first",
      "Slice beef thinly",
      "Heat wok until smoking",
      "Stir-fry beef 2-3min",
      "Add broccoli 2min",
      "Push aside, scramble eggs",
      "Mix sauce through",
      "Total time: 15min"
    ],
    notes: "High-protein Asian breakfast. Eat 2hrs before morning training. Double rice portion for heavy sessions."
  },
  {
    name: "Mediterranean Grilled Salmon Pasta",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "250g salmon fillet",
      "180g penne pasta",
      "Italian herbs",
      "100g cherry tomatoes",
      "20g olive oil",
      "Fresh basil",
      "Garlic",
      "Lemon"
    ],
    instructions: [
      "Boil pasta al dente",
      "Season salmon well",
      "Grill salmon 4min each side",
      "Halve tomatoes",
      "Sauté garlic and tomatoes",
      "Toss pasta with olive oil",
      "Flake salmon through",
      "Total time: 20min"
    ],
    notes: "Perfect post-workout meal. Omega-3 rich salmon with simple carbs for recovery."
  },
  {
    name: "Loaded Chicken Tacos",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g chicken thigh",
      "6 corn tortillas",
      "Mexican spice blend",
      "150g sweet potato",
      "Guacamole",
      "Fresh salsa",
      "Greek yogurt",
      "Lime"
    ],
    instructions: [
      "Dice sweet potato, roast 20min",
      "Season chicken with spices",
      "Grill chicken 6-7min each side",
      "Warm tortillas",
      "Make quick salsa",
      "Slice chicken",
      "Assemble tacos",
      "Total time: 25min"
    ],
    notes: "High-protein dinner with simple carbs. Great post-workout meal. Easy to adjust portions."
  },
  {
    name: "Muscle Building Hummus Toast",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "100g hummus",
      "2 thick whole grain toast",
      "2 boiled eggs",
      "Cherry tomatoes",
      "Olive oil",
      "Za'atar",
      "Black pepper"
    ],
    instructions: [
      "Toast bread well",
      "Mix protein into hummus",
      "Slice eggs",
      "Spread hummus thick",
      "Top with eggs",
      "Drizzle oil, add spices",
      "Total time: 5min"
    ],
    notes: "Simple pre-bed meal. Slow-digesting protein with healthy fats and simple carbs."
  }
  ],
  // Day 9
[
  {
    name: "Chicken Teriyaki Rice Bowl",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g chicken breast",
      "150g white rice",
      "3 eggs",
      "100g stir-fry vegetables",
      "Teriyaki sauce",
      "20g sesame oil",
      "Spring onions",
      "Sesame seeds"
    ],
    instructions: [
      "Cook rice first",
      "Slice chicken thin",
      "Heat pan until very hot",
      "Stir-fry chicken 5-6min",
      "Add vegetables 2min",
      "Push aside, scramble eggs",
      "Add sauce last minute",
      "Total time: 20min"
    ],
    notes: "Energy-rich Asian breakfast. Eat 2.5hrs before morning training. Scale rice for training intensity."
  },
  {
    name: "Power Packed Pasta Bolognese",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "270g lean beef mince",
      "180g penne pasta",
      "Italian herbs",
      "100g mixed vegetables",
      "20g olive oil",
      "Garlic and onion",
      "Tomato sauce",
      "Parmesan"
    ],
    instructions: [
      "Boil pasta al dente",
      "Brown meat with herbs",
      "Add garlic and onion",
      "Stir in tomato sauce",
      "Simmer 10min",
      "Mix with pasta",
      "Add cheese on top",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal. Simple carbs for glycogen replenishment. High protein for recovery."
  },
  {
    name: "Middle Eastern Grilled Chicken Wrap",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g chicken thighs",
      "4 large wraps",
      "Shawarma spices",
      "150g sweet potato fries",
      "Hummus",
      "Garlic sauce",
      "Fresh salad",
      "Chili sauce"
    ],
    instructions: [
      "Season chicken with spices",
      "Bake sweet potato fries",
      "Grill chicken 6-7min each side",
      "Warm wraps slightly",
      "Spread hummus",
      "Slice chicken",
      "Assemble wraps",
      "Total time: 30min"
    ],
    notes: "Great pre-evening workout (3hrs before) or post-workout meal. Easily digestible carbs."
  },
  {
    name: "Anabolic Ice Cream Bowl",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "60g casein protein",
      "200g Greek yogurt",
      "1 banana",
      "30g honey",
      "30g mixed nuts",
      "Cinnamon",
      "Vanilla extract",
      "Ice"
    ],
    instructions: [
      "Blend protein and yogurt",
      "Add frozen banana",
      "Add honey and vanilla",
      "Blend until thick",
      "Top with nuts",
      "Total time: 5min"
    ],
    notes: "Perfect pre-bed treat. Slow-digesting protein for overnight recovery. Natural sugars for glycogen."
  }
  ],
  // Day 10
[
  {
    name: "Masala Egg Rice Power Bowl",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g chicken breast",
      "150g basmati rice",
      "3 whole eggs",
      "100g mixed peppers",
      "Indian spice blend",
      "25g ghee",
      "Fresh coriander",
      "Green chilies"
    ],
    instructions: [
      "Cook rice first",
      "Dice chicken small",
      "Heat pan with ghee",
      "Cook chicken with spices 6-7min",
      "Add peppers 2min",
      "Push aside, scramble eggs",
      "Mix everything together",
      "Total time: 20min"
    ],
    notes: "High-protein Indian breakfast. Perfect 2hrs before morning training. Spices aid digestion."
  },
  {
    name: "Italian Beef & Pasta Bowl",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g lean beef strips",
      "180g fusilli pasta",
      "Mediterranean herbs",
      "100g cherry tomatoes",
      "20g olive oil",
      "Garlic and basil",
      "Balsamic glaze",
      "Parmesan"
    ],
    instructions: [
      "Cook pasta al dente",
      "Season beef with herbs",
      "Sear beef in hot pan 3-4min",
      "Halve tomatoes",
      "Combine with pasta",
      "Add fresh basil",
      "Finish with cheese",
      "Total time: 20min"
    ],
    notes: "Perfect post-workout meal. Quick carbs for recovery. High-quality protein for muscle repair."
  },
  {
    name: "Spicy Salmon Rice Bowl",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g salmon fillet",
      "200g jasmine rice",
      "Asian spice mix",
      "100g broccoli",
      "Soy sauce",
      "Sesame oil",
      "Green onions",
      "Sriracha sauce"
    ],
    instructions: [
      "Cook rice first",
      "Steam broccoli",
      "Season salmon well",
      "Pan-sear salmon 4min each side",
      "Make spicy sauce",
      "Flake salmon",
      "Combine all components",
      "Total time: 25min"
    ],
    notes: "Omega-3 rich dinner. Great post-workout meal. Adjust rice portion based on training volume."
  },
  {
    name: "Protein Loaded Sweet Potato",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "200g sweet potato",
      "100g Greek yogurt",
      "30g almond butter",
      "Cinnamon",
      "Honey",
      "Mixed seeds",
      "Pinch of salt"
    ],
    instructions: [
      "Microwave sweet potato 6-7min",
      "Mix protein with yogurt",
      "Split potato, fluff inside",
      "Top with protein-yogurt mix",
      "Add almond butter",
      "Sprinkle with seeds",
      "Total time: 10min"
    ],
    notes: "Perfect pre-bed meal. Complex carbs and slow protein for overnight recovery."
  }
  ],
  // Day 11
[
  {
    name: "Power Beef Burrito Bowl",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g lean ground beef",
      "150g Mexican rice",
      "2 eggs",
      "100g black beans",
      "Mexican spice blend",
      "20g olive oil",
      "Fresh cilantro",
      "Hot sauce"
    ],
    instructions: [
      "Season beef with spices",
      "Cook rice with tomato",
      "Brown beef well 5-6min",
      "Heat beans through",
      "Fry eggs sunny side up",
      "Layer in bowl",
      "Add fresh herbs",
      "Total time: 20min"
    ],
    notes: "High-energy Mexican breakfast. Eat 2hrs before morning training. Scale rice for intensity."
  },
  {
    name: "Garlic Chicken Pasta",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken breast",
      "180g spaghetti",
      "Italian herbs",
      "100g mixed vegetables",
      "25g olive oil",
      "Fresh garlic",
      "Chili flakes",
      "Parmesan"
    ],
    instructions: [
      "Boil pasta al dente",
      "Slice chicken thin",
      "Sauté garlic in oil",
      "Cook chicken 6-7min",
      "Add vegetables",
      "Toss with pasta",
      "Season well",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal. Quick carbs for glycogen replenishment. High protein for recovery."
  },
  {
    name: "BBQ Steak & Sweet Potato",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g sirloin steak",
      "250g sweet potato",
      "BBQ spice rub",
      "100g asparagus",
      "20g butter",
      "Garlic butter",
      "Fresh herbs",
      "Black pepper"
    ],
    instructions: [
      "Season steak well",
      "Cut potato into wedges",
      "Bake sweet potato 25min",
      "Rest steak room temp 15min",
      "Grill steak 4-5min each side",
      "Grill asparagus",
      "Rest steak 5min",
      "Total time: 35min"
    ],
    notes: "Iron-rich dinner. Perfect post-workout meal. Adjust potato portion based on training."
  },
  {
    name: "Overnight Protein Oats",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "80g rolled oats",
      "200ml milk",
      "30g peanut butter",
      "1 banana",
      "Honey",
      "Cinnamon",
      "Mixed nuts"
    ],
    instructions: [
      "Mix protein with milk",
      "Add oats and spices",
      "Mash half banana in",
      "Add peanut butter",
      "Top with nuts",
      "Refrigerate overnight",
      "Total time: 5min prep"
    ],
    notes: "Great pre-bed meal. Slow-releasing carbs and protein for overnight recovery."
  }
  ],
  // Day 12
[
  {
    name: "Desi Keema Rice Bowl",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g lean ground lamb",
      "150g basmati rice",
      "3 eggs",
      "100g green peas",
      "Curry spice blend",
      "25g ghee",
      "Fresh mint",
      "Green chilies"
    ],
    instructions: [
      "Cook rice first",
      "Heat ghee, add spices",
      "Brown lamb 7-8min",
      "Add peas last 2min",
      "Make space, scramble eggs",
      "Mix everything",
      "Garnish with mint",
      "Total time: 20min"
    ],
    notes: "Protein-rich South Asian breakfast. Eat 2.5hrs before training. Spices aid digestion."
  },
  {
    name: "Grilled Peri Chicken Wrap",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken breast",
      "3 large wraps",
      "Peri spice mix",
      "150g sweet potato fries",
      "Garlic sauce",
      "Mixed salad",
      "20g olive oil",
      "Chili sauce"
    ],
    instructions: [
      "Butterfly chicken breast",
      "Season with peri spices",
      "Bake sweet potato fries",
      "Grill chicken 6min each side",
      "Warm wraps slightly",
      "Slice chicken",
      "Assemble wraps",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal. Easy to digest. Great for muscle recovery."
  },
  {
    name: "Asian Beef Noodle Bowl",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g beef strips",
      "200g egg noodles",
      "Asian seasoning",
      "100g pak choi",
      "Soy sauce",
      "Sesame oil",
      "Ginger-garlic paste",
      "Green onions"
    ],
    instructions: [
      "Boil noodles al dente",
      "Slice beef thin",
      "Heat wok until smoking",
      "Flash fry beef 2min",
      "Add vegetables",
      "Toss with noodles",
      "Add sauces",
      "Total time: 15min"
    ],
    notes: "High-protein dinner. Great post-workout meal. Quick and easy to digest."
  },
  {
    name: "Muscle Building Toast",
    timing: "Evening/pre-bed",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "3 thick toast slices",
      "2 boiled eggs",
      "50g avocado",
      "Cherry tomatoes",
      "Olive oil",
      "Black pepper",
      "Red chili flakes"
    ],
    instructions: [
      "Toast bread well",
      "Mash avocado",
      "Slice eggs",
      "Layer on toast",
      "Add protein spread",
      "Drizzle oil",
      "Season well",
      "Total time: 8min"
    ],
    notes: "Perfect pre-bed meal. Slow-digesting protein with healthy fats for overnight recovery."
  }
  ],
  // Day 13
[
  {
    name: "Bodybuilder's Turkish Eggs",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g lean beef mince",
      "3 eggs",
      "3 flatbreads",
      "100g bell peppers",
      "Middle Eastern spices",
      "25g butter",
      "Fresh parsley",
      "Chili sauce"
    ],
    instructions: [
      "Season beef with spices",
      "Cook beef 6-7min",
      "Add peppers",
      "Poach eggs",
      "Warm flatbreads",
      "Layer all components",
      "Add sauce",
      "Total time: 15min"
    ],
    notes: "High-protein breakfast. Perfect 2hrs before training."
  },
  {
    name: "Spicy Chicken Pasta Bowl",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken breast",
      "180g penne pasta",
      "Arrabbiata spices",
      "100g mixed veg",
      "Tomato sauce",
      "20g olive oil",
      "Fresh basil",
      "Parmesan"
    ],
    instructions: [
      "Boil pasta al dente",
      "Slice chicken thin",
      "Cook chicken with spices",
      "Make quick sauce",
      "Combine all",
      "Add fresh herbs",
      "Total time: 20min"
    ],
    notes: "Perfect post-workout meal. Quick carbs for recovery."
  },
  {
    name: "Teriyaki Salmon Rice Bowl",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g salmon fillet",
      "200g jasmine rice",
      "Teriyaki sauce",
      "100g broccoli",
      "Sesame oil",
      "Ginger-garlic",
      "Spring onions",
      "Sesame seeds"
    ],
    instructions: [
      "Cook rice first",
      "Steam broccoli",
      "Pan-fry salmon 4min each side",
      "Make sauce",
      "Combine all",
      "Garnish",
      "Total time: 20min"
    ],
    notes: "Omega-3 rich dinner. Great for recovery and inflammation."
  },
  {
    name: "Recovery Protein Bowl",
    timing: "Evening",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "200g Greek yogurt",
      "1 banana",
      "30g honey",
      "Mixed berries",
      "Granola",
      "Cinnamon",
      "Nuts"
    ],
    instructions: [
      "Mix protein with yogurt",
      "Layer ingredients",
      "Add toppings",
      "Total time: 5min"
    ],
    notes: "Perfect pre-bed meal. Slow-release protein overnight."
  }
  ],
  
  // Day 14
  [
  {
    name: "Power Beef Potato Hash",
    timing: "Early morning",
    calories: 750,
    protein: 60,
    carbs: 70,
    fats: 35,
    ingredients: [
      "250g beef strips",
      "200g potatoes",
      "3 eggs",
      "Mixed peppers",
      "BBQ spices",
      "20g olive oil",
      "Fresh herbs",
      "Hot sauce"
    ],
    instructions: [
      "Dice potatoes small",
      "Par-cook potatoes",
      "Cook beef with spices",
      "Add vegetables",
      "Make wells for eggs",
      "Cover to cook eggs",
      "Total time: 20min"
    ],
    notes: "High-energy breakfast. Perfect pre-training meal."
  },
  {
    name: "Mediterranean Chicken Rice",
    timing: "Lunch",
    calories: 800,
    protein: 65,
    carbs: 75,
    fats: 30,
    ingredients: [
      "280g chicken breast",
      "180g rice",
      "Mediterranean herbs",
      "Mixed vegetables",
      "Olive oil",
      "Garlic",
      "Lemon",
      "Fresh herbs"
    ],
    instructions: [
      "Cook rice first",
      "Season chicken well",
      "Grill chicken",
      "Sauté vegetables",
      "Combine all",
      "Add lemon",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal. Clean, simple recovery fuel."
  },
  {
    name: "Ultimate Beef Tacos",
    timing: "Dinner",
    calories: 850,
    protein: 70,
    carbs: 75,
    fats: 35,
    ingredients: [
      "300g lean beef mince",
      "6 corn tortillas",
      "Mexican spices",
      "Sweet potato fries",
      "Guacamole",
      "Salsa",
      "Greek yogurt",
      "Lime"
    ],
    instructions: [
      "Season beef well",
      "Cook beef 7-8min",
      "Bake sweet potato fries",
      "Warm tortillas",
      "Prepare toppings",
      "Assemble",
      "Total time: 25min"
    ],
    notes: "Great post-workout dinner. Easy to digest, high protein."
  },
  {
    name: "Protein Cookie Dough",
    timing: "Evening",
    calories: 600,
    protein: 45,
    carbs: 55,
    fats: 30,
    ingredients: [
      "50g casein protein",
      "30g peanut butter",
      "Rolled oats",
      "Honey",
      "Dark chocolate chips",
      "Milk",
      "Vanilla",
      "Cinnamon"
    ],
    instructions: [
      "Mix protein with wet ingredients",
      "Add oats gradually",
      "Fold in chocolate chips",
      "Form into balls",
      "Total time: 10min"
    ],
    notes: "Perfect pre-bed treat. Slow-digesting protein for overnight recovery."
  }
  ]
          ]
      },
      {
          id: "dp_3500",
          name: "Super Bulk - 3500kcal",
          calories: 3500,
          weekCycle: [
            // Day 1
            [
              {
                name: "Champion's Steak and Eggs Power Breakfast",
                timing: "Early morning",
                calories: 900,
                protein: 65,
                carbs: 70,
                fats: 45,
                ingredients: [
                  "250g ribeye steak",
                  "4 whole eggs",
                  "2 Arabic bread or 2 pieces of store bought bread of your choice",
                  "150g mixed bell peppers and mushrooms",
                  "50g halloumi cheese",
                  "Spices: zaatar, sumac, black pepper",
                  "25g grass-fed butter",
                  "Fresh parsley and mint",
                  "Chili paste (optional)"
                ],
                instructions: [
                  "Bring steak to room temperature, season well",
                  "Heat cast iron pan until smoking hot",
                  "Cook steak 4-5min each side for medium-rare",
                  "Rest meat while cooking others",
                  "In same pan, grill halloumi 1min each side",
                  "Push aside, crack eggs into beef fat",
                  "Sauté vegetables with butter",
                  "Warm bread directly on flame 30sec each",
                  "Slice steak against grain, assemble all components",
                  "Total time: 20min"
                ],
                notes: "Ultimate pre-training breakfast. Eat 2.5-3hrs before morning session. Rich in creatine from red meat. Don't skip the egg yolks - crucial for hormones. Can substitute ribeye with striploin, but keep it marbled for calories."
              },
              {
                name: "Persian Lamb Rice Power Bowl",
                timing: "Late morning/lunch",
                calories: 850,
                protein: 55,
                carbs: 90,
                fats: 40,
                ingredients: [
                  "200g ground lamb",
                  "200g basmati rice",
                  "100g chickpeas",
                  "150g roasted vegetables (eggplant, peppers)",
                  "Spices: cinnamon, cumin, coriander, saffron",
                  "40g pine nuts",
                  "30g butter",
                  "Fresh dill and mint",
                  "Yogurt-tahini sauce"
                ],
                instructions: [
                  "Soak rice 30min if possible",
                  "Toast pine nuts until golden",
                  "Season lamb generously with spices",
                  "Cook lamb 7-8min breaking up well",
                  "Cook rice with pinch of saffron",
                  "Roast vegetables with olive oil",
                  "Mix yogurt sauce with tahini, lemon",
                  "Layer rice, lamb, vegetables",
                  "Finish with nuts, herbs, sauce",
                  "Total time: 25min"
                ],
                notes: "Perfect post-morning training meal. Eat within 90min after session. High GI carbs replenish glycogen. Pine nuts add crucial healthy fats. Can prep vegetables night before."
              },
              {
                name: "Atlantic Salmon Teriyaki Bowl",
                timing: "Mid-afternoon",
                calories: 800,
                protein: 60,
                carbs: 85,
                fats: 35,
                ingredients: [
                  "300g fresh salmon fillet",
                  "200g Japanese rice",
                  "200g broccoli and snap peas",
                  "Teriyaki sauce: soy, mirin, honey",
                  "30g sesame oil",
                  "Pickled ginger",
                  "Toasted sesame seeds",
                  "Green onions"
                ],
                instructions: [
                  "Pat salmon dry, season well",
                  "Cook rice with kombu if available",
                  "Steam broccoli until bright green",
                  "Heat pan, add sesame oil",
                  "Cook salmon skin side down 5min",
                  "Flip, brush with teriyaki sauce",
                  "Cook 3-4min more until glazed",
                  "Assemble bowl, finish with sesame",
                  "Total time: 20min"
                ],
                notes: "Rich in omega-3s for recovery and inflammation. Ideal 2-3hrs before evening training. Don't overcook salmon - should be medium in center. Double rice portion for very intense training days."
              },
              {
                name: "Mediterranean Feast Plate",
                timing: "Evening/dinner",
                calories: 950,
                protein: 75,
                carbs: 80,
                fats: 45,
                ingredients: [
                  "400g lamb chops",
                  "250g sweet potato",
                  "200g mixed vegetables (zucchini, peppers)",
                  "Marinade: olive oil, garlic, rosemary",
                  "50g feta cheese",
                  "30g olive oil",
                  "Fresh oregano and thyme",
                  "Lemon-garlic sauce"
                ],
                instructions: [
                  "Marinate lamb with herbs, oil, garlic",
                  "Cut sweet potatoes into wedges",
                  "Roast sweet potatoes 20min",
                  "Heat grill pan until very hot",
                  "Grill lamb 4-5min each side",
                  "Grill vegetables with olive oil",
                  "Rest meat 5min before serving",
                  "Crumble feta over vegetables",
                  "Total time: 30min"
                ],
                notes: "Post-evening training feast. High protein for overnight recovery. Sweet potatoes time carbs with evening activity. Don't trim lamb fat - needed for calories and hormones. Can prep vegetables while sweet potatoes roast."
              }
            ],
            [
              {
              name: "Turkish Kafta Power Breakfast",
              timing: "Early morning",
              calories: 850,
              protein: 60,
              carbs: 75,
              fats: 40,
              ingredients: [
              "300g ground beef (80/20 lean)",
              "4 whole eggs",
              "3 Turkish pide bread",
              "150g mixed peppers and onions",
              "Spices: baharat, sumac, Aleppo pepper",
              "35g butter",
              "Fresh parsley and mint",
              "Garlic toum sauce"
              ],
              instructions: [
              "Mix beef with finely diced onions and spices",
              "Form into finger-shaped kafta (not too thin)",
              "Heat pan until very hot - crucial for crust",
              "Cook kafta 3min each side - don't overcrowd",
              "Remove, add butter to pan",
              "Sauté peppers until charred edges",
              "Create wells, crack eggs in",
              "Cover pan for runny yolks (2min)",
              "Meanwhile grill pide 30sec each side",
              "Total time: 20min"
              ],
              notes: "Perfect pre-training meal - eat 2.5hrs before morning session. Don't overwork meat mix or kafta will be tough. Room temp eggs cook more evenly. Fresh pide makes huge difference in taste."
              },
              {
              name: "Moroccan Spiced Chicken Couscous",
              timing: "Late morning/lunch",
              calories: 900,
              protein: 65,
              carbs: 90,
              fats: 38,
              ingredients: [
              "350g chicken thighs, bone-in",
              "200g pearl couscous",
              "150g roasted vegetables",
              "Spices: ras el hanout, turmeric, cinnamon",
              "50g dried fruits (dates, apricots)",
              "40g almonds",
              "Fresh coriander and mint",
              "Harissa sauce (optional)"
              ],
              instructions: [
              "Season chicken generously with spices",
              "Heat pan until very hot - skin side first",
              "Cook skin side 8min until golden (crucial)",
              "Flip, cook 6min more",
              "Remove chicken, rest uncovered",
              "Toast couscous in same pan 2min",
              "Add hot stock, cook until al dente",
              "Fold in roasted vegetables, fruits",
              "Finish with toasted nuts, herbs",
              "Total time: 30min"
              ],
              notes: "Ideal post-morning workout meal. Eat within 90min after training. Skin-on thighs crucial for calories and flavor. Don't rush the chicken skin crisping. Can prep vegetables night before."
              },
              {
              name: "Korean Beef Rice Bowl",
              timing: "Mid-afternoon",
              calories: 850,
              protein: 65,
              carbs: 85,
              fats: 35,
              ingredients: [
              "300g beef sirloin",
              "200g short-grain rice",
              "200g mixed vegetables (mushrooms, spinach)",
              "Sauce: soy, honey, sesame oil, garlic",
              "2 eggs for topping",
              "30g sesame oil",
              "Kimchi (store-bought ok)",
              "Gochugaru (Korean chili)"
              ],
              instructions: [
              "Slice beef against grain, very thin",
              "Mix sauce ingredients well",
              "Cook rice with small strip kombu",
              "Heat pan until smoking hot",
              "Cook beef in batches (crucial)",
              "Add sauce only after beef is browned",
              "Sauté vegetables separately",
              "Fry eggs sunny side up",
              "Layer bowl: rice, beef, vegetables, egg",
              "Total time: 25min"
              ],
              notes: "Great pre-evening training meal (2-3hrs before) or post-morning session. Freezing beef 30min makes thin slicing easier. Don't crowd the pan or beef will steam instead of sear."
              },
              {
              name: "Arabian Mixed Grill Platter",
              timing: "Evening/dinner",
              calories: 900,
              protein: 70,
              carbs: 80,
              fats: 42,
              ingredients: [
              "200g lamb kofta",
              "200g chicken tawook",
              "200g sweet potato",
              "150g mixed vegetables",
              "Arabic spice blends",
              "30g olive oil",
              "Garlic sauce",
              "Fresh herbs mix"
              ],
              instructions: [
              "Mix kofta: lamb, onion, parsley, spices",
              "Marinade chicken in yogurt-spice mix",
              "Shape kofta on wide skewers",
              "Cut chicken uniform size for even cooking",
              "Roast sweet potatoes with zaatar",
              "Heat grill pan until smoking",
              "Grill kofta 4min each side",
              "Grill chicken 5-6min each side",
              "Rest meats 5min before serving",
              "Total time: 35min"
              ],
              notes: "Perfect post-evening training meal. Eat within 90min after workout. Don't skip resting time for juicier meat. Can prep marinades night before. Double carbs if training was intense."
              }
              ],
              // Day 3
[
  {
  name: "Power Beef and Eggs Platter",
  timing: "Early morning",
  calories: 850,
  protein: 65,
  carbs: 70,
  fats: 42,
  ingredients: [
  "300g beef striploin steak",
  "4 whole eggs",
  "2 large store-bought naan bread",
  "150g mushrooms",
  "100g onions",
  "Spices: black pepper, garlic powder, paprika",
  "30g butter",
  "Fresh parsley (optional)",
  "Hot sauce (optional)"
  ],
  instructions: [
  "Season steak generously, bring to room temp",
  "Heat pan until very hot - test with water drop",
  "Cook steak 4-5min each side for medium",
  "Rest meat, keep pan hot",
  "Add mushrooms and onions to beef fat",
  "Cook until golden (don't stir too much)",
  "Push to side, add eggs",
  "Warm naan in same pan 30sec each side",
  "Slice steak against grain",
  "Total time: 20min"
  ],
  notes: "Perfect pre-training meal (2.5-3hrs before morning session). Any large supermarket naan works fine. Don't move eggs once cracked for best look. Can substitute striploin with any good steak cut."
  },
  {
  name: "Spicy Beef Rice Bowl",
  timing: "Late morning/lunch",
  calories: 900,
  protein: 60,
  carbs: 95,
  fats: 38,
  ingredients: [
  "300g ground beef (80/20)",
  "250g white rice",
  "200g mixed frozen vegetables",
  "Basic spices: cumin, chili powder, garlic powder",
  "30g regular olive oil",
  "2 eggs for topping",
  "Store-bought chili sauce",
  "Green onions"
  ],
  instructions: [
  "Cook rice first - can use rice cooker",
  "Heat pan, add oil",
  "Brown beef well, breaking up chunks",
  "Add spices to beef while cooking",
  "Microwave frozen veg until hot",
  "Add to beef, mix well",
  "Fry eggs sunny side up",
  "Layer: rice, beef mix, eggs, sauce",
  "Total time: 25min"
  ],
  notes: "Great post-workout meal (within 90min after training). Frozen vegetables work perfectly here. Can use any ground beef - just drain excess fat if needed. Double rice portion for very intense sessions."
  },
  {
  name: "Mediterranean Chicken Pasta",
  timing: "Mid-afternoon",
  calories: 850,
  protein: 65,
  carbs: 90,
  fats: 35,
  ingredients: [
  "350g chicken breast",
  "200g penne pasta",
  "200g cherry tomatoes",
  "100g baby spinach",
  "Dried herbs: basil, oregano",
  "30g olive oil",
  "Parmesan cheese",
  "Store-bought pesto"
  ],
  instructions: [
  "Start pasta in salted water",
  "Cut chicken into even strips",
  "Season well with salt and herbs",
  "Heat pan with oil until hot",
  "Cook chicken 6-7min total",
  "Add tomatoes to same pan",
  "Drain pasta, save some water",
  "Mix everything with pesto",
  "Add pasta water if needed",
  "Total time: 20min"
  ],
  notes: "Perfect 2-3hrs before evening training. Any short pasta works. Don't overcook chicken - should still be juicy. Can use dried herbs if fresh unavailable."
  },
  {
  name: "Simple Salmon and Potato Dinner",
  timing: "Evening/dinner",
  calories: 900,
  protein: 65,
  carbs: 85,
  fats: 40,
  ingredients: [
  "400g salmon fillets",
  "300g white potatoes",
  "200g broccoli (fresh or frozen)",
  "Basic seasonings: lemon pepper, garlic",
  "35g butter",
  "Lemon",
  "Store-bought honey mustard sauce",
  "Fresh dill (optional)"
  ],
  instructions: [
  "Start potatoes in cold water",
  "Pat salmon very dry with paper towels",
  "Season well on both sides",
  "Heat pan until hot, add butter",
  "Cook salmon skin side down 5min",
  "Flip carefully, cook 3min more",
  "Steam or microwave broccoli",
  "Drain and butter potatoes",
  "Serve with lemon wedges",
  "Total time: 25min"
  ],
  notes: "Great post-evening training meal (within 90min). Frozen broccoli works fine. Any potato variety is good. Don't move salmon while cooking for crispy skin."
  }
  ],
    // Day 4
[
  {
    name: "Middle Eastern Power Bowl",
    timing: "Early morning",
    calories: 850,
    protein: 62,
    carbs: 75,
    fats: 40,
    ingredients: [
      "300g beef tenderloin",
      "3 large eggs",
      "2 large wholemeal wraps (store-bought)",
      "200g mixed bell peppers",
      "100g onions",
      "Spices: 1 tsp each of cumin, paprika, black pepper",
      "30g butter",
      "Store-bought hummus",
      "Fresh parsley (optional)"
    ],
    instructions: [
      "IMPORTANT: Take beef out 30min before cooking",
      "Cut beef into 2cm cubes - bigger pieces stay juicier",
      "Mix spices in a small bowl first - ensures even distribution",
      "Heat pan on HIGH until water droplet dances (very important)",
      "Add beef in single layer - don't overcrowd or it'll steam",
      "DON'T move beef for 2min - this creates nice crust",
      "While beef cooks, slice peppers and onions into same-size strips",
      "Remove beef when medium-rare (pink inside), rest on plate",
      "In same pan, add butter and vegetables",
      "Cook veg until slightly charred but still crunchy (4-5min)",
      "Push veg aside, crack eggs into empty space",
      "Cover pan with lid for 2min for perfect runny yolks",
      "Warm wraps directly on clean stovetop 10sec each side",
      "Total time: 25min (including beef rest time)"
    ],
    notes: "Perfect pre-training breakfast - eat 2.5-3hrs before morning session. COMMON MISTAKES: 1) Moving beef too much - let it sear! 2) Overcrowding pan - cook in batches if needed 3) Not resting meat - juice will spill out. Use store-bought wraps from bread aisle. Can substitute tenderloin with any tender steak cut."
  },
  {
    name: "Japanese Inspired Chicken Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 95,
    fats: 35,
    ingredients: [
      "350g chicken thighs (boneless)",
      "250g sushi rice (or any short-grain rice)",
      "200g frozen stir-fry vegetables",
      "Sauce: 4tbsp soy sauce, 2tbsp honey, 1tbsp oil",
      "25g butter",
      "2 eggs",
      "Store-bought teriyaki sauce",
      "Sesame seeds (optional)"
    ],
    instructions: [
      "RICE FIRST: Rinse rice until water runs clear",
      "Use rice cooker OR pot with tight lid (1:1.2 rice to water)",
      "Cut chicken into 3cm pieces - consistent size is key",
      "Pat chicken VERY dry with paper towels (crucial for browning)",
      "Mix sauce ingredients in bowl until honey dissolves",
      "Heat pan until HOT (test with water droplet)",
      "Add chicken in single layer - don't touch for 3-4min",
      "Once golden, stir and cook 3min more",
      "Pour in sauce, bubble until sticky (2min)",
      "Microwave frozen veg as per package",
      "In separate pan, fry eggs sunny side up",
      "Layer: rice, chicken, veg, egg, extra sauce",
      "Total time: 30min (including rice cooking)"
    ],
    notes: "Perfect post-workout meal - eat within 90min of training. TIPS: 1) Chicken thighs are more forgiving than breast - won't dry out 2) If sauce gets too thick, add splash of water 3) Don't skip drying chicken - moisture prevents browning 4) Rice can be made ahead and reheated. Double portion for intense training days."
  },
  {
    name: "Arabian Style Grilled Chicken",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 70,
    carbs: 80,
    fats: 35,
    ingredients: [
      "400g chicken breast",
      "200g sweet potato",
      "150g mixed frozen vegetables",
      "Simple marinade: 3tbsp yogurt, 2tbsp oil, 2tsp mixed spices",
      "30g olive oil",
      "Store-bought garlic sauce",
      "2 regular pita bread",
      "Lemon wedges"
    ],
    instructions: [
      "FIRST: Cut chicken breasts horizontally (butterflying)",
      "Mix marinade ingredients in bowl",
      "Coat chicken well, leave 10min (or overnight)",
      "Cut sweet potato into 2cm cubes (even size important)",
      "Boil sweet potato 12-15min until just tender",
      "Heat pan until very hot",
      "Cook chicken 5-6min first side (don't move!)",
      "Flip once, cook 4-5min other side",
      "Rest chicken 5min before slicing",
      "Meanwhile, microwave frozen veg",
      "Warm pitas in same pan 30sec each side",
      "Total time: 35min (excluding marinade time)"
    ],
    notes: "Great pre-evening workout meal (2-3hrs before). IMPORTANT: 1) Butterflying chicken ensures even cooking 2) Don't skip resting time 3) Test sweet potato with fork for doneness 4) If chicken browns too fast, lower heat. Can prep in morning and cook later."
  },
  {
    name: "Steakhouse Style Dinner",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 85,
    fats: 42,
    ingredients: [
      "350g ribeye steak",
      "300g regular potatoes",
      "200g frozen broccoli",
      "Basic seasonings: salt, black pepper",
      "40g butter",
      "3 cloves garlic (or 1tsp powder)",
      "Store-bought peppercorn sauce",
      "Fresh rosemary (optional)"
    ],
    instructions: [
      "FIRST: Take steak out 1 hour before cooking",
      "Cut potatoes into 3cm chunks",
      "Boil potatoes in salted water 15-20min until tender",
      "Pat steak VERY dry with paper towels",
      "Season generously both sides with salt and pepper",
      "Heat pan until VERY hot (crucial step)",
      "Add steak to dry pan (no oil needed for ribeye)",
      "For medium-rare: 4min first side, 3min second side",
      "Add butter and garlic last minute",
      "Spoon butter over steak repeatedly",
      "Rest meat 5-10min (IMPORTANT)",
      "Meanwhile, microwave broccoli",
      "Drain potatoes, add butter, mash roughly",
      "Total time: 35min"
    ],
    notes: "Perfect post-evening training meal (within 90min). CRUCIAL TIPS: 1) Room temp steak cooks more evenly 2) Dry meat = better crust 3) Don't move steak while cooking 4) Resting time equals cooking time 5) Use meat thermometer if unsure (63°C/145°F for medium-rare). Can substitute ribeye with any marbled steak."
  }
],
[
  {
    name: "Indian Power Breakfast",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 40,
    ingredients: [
      "300g lamb mince (20% fat)",
      "4 large eggs",
      "2 store-bought naan breads",
      "150g frozen mixed peppers",
      "100g onions",
      "Basic spice mix: 2tsp curry powder, 1tsp each cumin, coriander",
      "30g butter",
      "Store-bought mint sauce",
      "Natural yogurt for serving"
    ],
    instructions: [
      "FIRST: Get pan very hot while you prep",
      "Finely chop onions or pulse in food processor",
      "Mix spices together in small bowl",
      "Add lamb to hot dry pan - break up well with spatula",
      "IMPORTANT: Don't stir constantly - let it brown",
      "After 5min, add spices and onions",
      "Cook 5min more until onions soft",
      "Add frozen peppers - no need to thaw",
      "Push mixture to one side",
      "Add butter to empty side",
      "Crack eggs into butter",
      "Cover pan 2-3min for runny yolks",
      "Meanwhile, warm naan in toaster or under grill",
      "Total time: 20min"
    ],
    notes: "Perfect pre-training breakfast - eat 2.5-3hrs before session. TIPS: 1) Don't use extra lean mince - fat needed for calories 2) If mixture too dry, add splash of water 3) Eggs should wobble slightly when done 4) Can prep onions night before. Any flatbread works here."
  },
  {
    name: "Mediterranean Tuna Pasta Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 95,
    fats: 38,
    ingredients: [
      "300g fresh tuna steak",
      "250g penne pasta",
      "200g cherry tomatoes",
      "100g baby spinach",
      "Simple dressing: 4tbsp olive oil, 1 lemon, garlic",
      "30g pine nuts (or chopped almonds)",
      "Store-bought pesto",
      "Parmesan cheese"
    ],
    instructions: [
      "PASTA FIRST: Large pot of well-salted water",
      "Cook pasta according to pack (save 1 cup water!)",
      "Meanwhile, pat tuna very dry with paper towels",
      "Season generously with salt and pepper",
      "Get pan smoking hot - crucial for searing",
      "For rare tuna (recommended): 1min each side",
      "Remove, let rest while you finish pasta",
      "Same pan: add tomatoes until they burst",
      "Add spinach - will wilt quickly",
      "Drain pasta, return to pot",
      "Mix in pesto, veg, and some pasta water",
      "Slice tuna against the grain",
      "Top with nuts and cheese",
      "Total time: 25min"
    ],
    notes: "Great post-workout meal (within 90min). IMPORTANT: 1) Don't overcook tuna - should be pink inside 2) Pasta water is key for silky sauce 3) If fresh tuna unavailable, use 2 cans in olive oil. Can use any pasta shape. Double carbs for very intense sessions."
  },
  {
    name: "Thai-Inspired Beef Bowl",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 40,
    ingredients: [
      "350g beef sirloin",
      "200g jasmine rice (or any white rice)",
      "200g frozen Asian vegetable mix",
      "Easy sauce: 4tbsp soy sauce, 2tbsp honey, lime juice",
      "35g coconut oil (or regular oil)",
      "Store-bought sweet chili sauce",
      "Cashew nuts",
      "Fresh basil (optional)"
    ],
    instructions: [
      "FIRST: Start rice (rice cooker or pot)",
      "Slice beef VERY thin against the grain",
      "Pro tip: Freeze 20min for easier slicing",
      "Mix sauce ingredients in bowl",
      "Heat pan until VERY hot",
      "Add oil, then beef in single layer",
      "DON'T MOVE for 1min until browned",
      "Stir-fry 1min more until just done",
      "Remove beef, keep warm",
      "Same pan: cook frozen veg 3-4min",
      "Return beef, add sauce",
      "Bubble 1min until sticky",
      "Serve over rice, top with nuts",
      "Total time: 25min (including rice)"
    ],
    notes: "Perfect pre-evening training (2-3hrs before). TIPS: 1) Thin slicing is crucial - watch fingers! 2) Don't overcook beef - should be slightly pink 3) If sauce too thick, add water 4) Rice can be made ahead. Any tender beef cut works."
  },
  {
    name: "Performance Salmon Dinner",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "400g salmon fillets (skin on)",
      "300g sweet potatoes",
      "200g asparagus (or green beans)",
      "Simple seasoning: salt, pepper, garlic powder",
      "40g butter",
      "1 lemon",
      "Store-bought hollandaise sauce",
      "Fresh dill (optional)"
    ],
    instructions: [
      "FIRST: Cut sweet potatoes into 2cm chunks",
      "Boil sweet potatoes 12-15min until tender",
      "Meanwhile, pat salmon VERY dry (crucial step)",
      "Season skin AND flesh well",
      "Get pan hot - medium-high heat",
      "Add half butter, let it stop bubbling",
      "Place salmon SKIN DOWN - don't move!",
      "Cook 5min on skin side (important)",
      "Flip carefully, 2-3min other side",
      "Meanwhile, microwave asparagus 2min",
      "Finish asparagus in pan with remaining butter",
      "Rest salmon 2min before serving",
      "Squeeze lemon over everything",
      "Total time: 25min"
    ],
    notes: "Excellent post-evening training meal (within 90min). KEY POINTS: 1) Dry fish = crispy skin 2) Don't move salmon while skin crisps 3) Sweet potatoes should be fork-tender 4) Can use frozen salmon - just thaw completely. Double carbs for intensive training days."
  }
],
 // Day 6
 [
  {
    name: "North African Beef Breakfast",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g beef mince (80/20)",
      "4 large eggs",
      "2 store-bought flatbreads",
      "200g mixed peppers",
      "Simple spice mix: 2tsp paprika, 1tsp each cumin, cinnamon",
      "30g butter",
      "Store-bought harissa paste",
      "Natural yogurt for serving"
    ],
    instructions: [
      "FIRST: Let pan get very hot while preparing",
      "Mix spices in small bowl before starting",
      "Add beef to dry hot pan",
      "Break up well with wooden spoon",
      "IMPORTANT: Let beef brown properly (5min)",
      "Add spices, mix well",
      "Slice peppers while beef cooks",
      "Add peppers to beef mixture",
      "Push to one side of pan",
      "Add butter to empty side",
      "Crack eggs into butter",
      "COVER pan for 2-3min (runny yolks)",
      "Warm flatbreads in same pan 20sec each",
      "Total time: 20min"
    ],
    notes: "Perfect pre-training meal (2.5-3hrs before morning session). TIPS: 1) Don't rush the browning 2) If beef too lean, add extra butter 3) Harissa is spicy - adjust amount to taste 4) Any flatbread works fine. Eggs should still wobble slightly for perfect yolks."
  },
  {
    name: "Persian Style Chicken Rice",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 90,
    fats: 40,
    ingredients: [
      "350g chicken thighs (boneless)",
      "250g basmati rice",
      "200g frozen mixed vegetables",
      "Easy spice mix: 2tsp turmeric, 1tsp each cumin, black pepper",
      "40g butter",
      "2tbsp tomato paste",
      "Store-bought garlic sauce",
      "Handful of raisins (optional)"
    ],
    instructions: [
      "RICE FIRST: Rinse until water runs clear",
      "Start rice in pot or rice cooker",
      "Cut chicken into 3cm pieces (even size)",
      "Pat chicken VERY dry with paper towels",
      "Season with spice mix",
      "Get pan very hot",
      "Add half the butter",
      "Add chicken - DON'T overcrowd",
      "Leave to brown 4min before stirring",
      "Add tomato paste, stir well",
      "Add frozen veg directly",
      "Cook 5min more until chicken done",
      "Finish with remaining butter",
      "Total time: 30min (including rice)"
    ],
    notes: "Great post-workout meal (within 90min). IMPORTANT: 1) Thighs more forgiving than breast 2) Drying chicken helps browning 3) Don't stir too soon or won't brown 4) Rice can be made ahead. Double rice portion for intense sessions."
  },
  {
    name: "Mediterranean Lamb Bowl",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "300g lamb shoulder (diced)",
      "200g couscous (or bulgur wheat)",
      "200g mixed Mediterranean vegetables",
      "Basic marinade: 3tbsp olive oil, 2tsp mixed herbs",
      "35g pine nuts (or almonds)",
      "Store-bought tzatziki",
      "Fresh mint (optional)",
      "Lemon wedges"
    ],
    instructions: [
      "FIRST: Marinate lamb 10min (or overnight)",
      "Boil kettle for couscous",
      "Pour boiling water over couscous (1:1 ratio)",
      "Cover, leave 5min (set timer!)",
      "Meanwhile, get pan very hot",
      "Add lamb in single layer",
      "DON'T MOVE for 3min (good color)",
      "Stir and cook 2min more",
      "Remove lamb, keep warm",
      "Same pan: cook vegetables",
      "Fluff couscous with fork",
      "Toast nuts in dry pan until golden",
      "Combine everything, add tzatziki",
      "Total time: 25min"
    ],
    notes: "Perfect pre-evening training (2-3hrs before). KEY POINTS: 1) Don't overcook lamb - should be pink inside 2) Set timer for couscous or will be soggy 3) Watch nuts carefully - burn quick 4) Can use any quick-cook grain instead of couscous."
  },
  {
    name: "Power Steak and Mash",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "350g sirloin steak",
      "400g potatoes",
      "200g frozen peas",
      "Basic seasoning: salt, pepper",
      "50g butter",
      "3 cloves garlic (or 1tsp powder)",
      "Store-bought gravy",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "FIRST: Take steak out 1hr before",
      "Cut potatoes into even chunks",
      "Start potatoes in cold salted water",
      "Boil 15-20min until very tender",
      "Pat steak COMPLETELY dry",
      "Season generously both sides",
      "Get pan SMOKING hot",
      "Add steak to dry pan",
      "3-4min first side (don't touch!)",
      "Flip once, 3min other side",
      "Add butter and garlic last minute",
      "REST meat 5-10min (crucial)",
      "Meanwhile, drain and mash potatoes",
      "Microwave peas last minute",
      "Total time: 35min"
    ],
    notes: "Perfect post-evening training meal (within 90min). CRUCIAL: 1) Room temp steak cooks better 2) Dry meat = better crust 3) Don't skip resting time 4) Potatoes must be very tender for smooth mash 5) Use meat thermometer if unsure (63°C/145°F for medium-rare)."
  }
],
 // Day 7
 [
  {
    name: "Power Beef Breakfast Wraps",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g beef sirloin strips",
      "4 whole eggs",
      "2 large tortilla wraps",
      "200g mushrooms",
      "100g spinach",
      "Easy seasoning: salt, pepper, garlic powder",
      "35g butter",
      "Store-bought chipotle sauce",
      "Grated cheese (optional)"
    ],
    instructions: [
      "FIRST: Slice beef against grain into thin strips",
      "Pro tip: Freeze 15min for easier slicing",
      "Get pan VERY hot while prepping",
      "Season beef well with seasoning mix",
      "Add beef to dry hot pan in single layer",
      "DON'T TOUCH for 2min (crucial for color)",
      "Quick stir, cook 1min more only",
      "Remove beef, keep warm",
      "Same pan: add half butter, mushrooms",
      "DON'T stir mushrooms for 2min (golden)",
      "Add spinach until just wilted",
      "Push to side, add remaining butter",
      "Crack eggs, scramble until just set",
      "Warm wraps in same pan 20sec each",
      "Total time: 20min"
    ],
    notes: "Perfect pre-training meal (2.5-3hrs before morning session). IMPORTANT: 1) Thin slicing beef is crucial 2) Don't overcook beef - should be pink inside 3) Eggs should still be slightly glossy when done 4) Can prep ingredients night before. Double wrap portion for very intense sessions."
  },
  {
    name: "Asian Fusion Power Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 95,
    fats: 38,
    ingredients: [
      "350g salmon fillet",
      "250g white rice",
      "200g frozen edamame",
      "Simple sauce: 4tbsp soy sauce, 2tbsp honey, 1tbsp oil",
      "30g sesame oil",
      "Store-bought teriyaki sauce",
      "Sesame seeds",
      "Nori sheets (optional)"
    ],
    instructions: [
      "RICE FIRST: Rinse until clear",
      "Start rice (rice cooker or pot)",
      "Pat salmon VERY dry with paper towels",
      "Season skin well with salt",
      "Get pan hot - medium-high heat",
      "Add sesame oil to pan",
      "Place salmon SKIN DOWN",
      "DON'T MOVE for 5min (crispy skin)",
      "Flip carefully, 2min other side",
      "Meanwhile, microwave edamame",
      "Mix sauce ingredients well",
      "Break salmon into chunks",
      "Layer: rice, salmon, edamame",
      "Pour over sauce, add seeds",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal (within 90min). TIPS: 1) Dry fish = crispy skin 2) Don't move salmon while skin crisps 3) Rice can be made ahead 4) If sauce too thick, add splash water. Double carbs for intense training days."
  },
  {
    name: "Mediterranean Chicken Feast",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 70,
    carbs: 80,
    fats: 35,
    ingredients: [
      "400g chicken breast",
      "200g sweet potato",
      "200g mixed Mediterranean veg",
      "Simple marinade: 3tbsp olive oil, lemon, herbs",
      "30g olive oil",
      "Store-bought hummus",
      "2 pita breads",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "FIRST: Cut chicken horizontally (butterfly)",
      "Marinade chicken 10min (or overnight)",
      "Cut sweet potato into 2cm chunks",
      "Boil sweet potato 12-15min until tender",
      "Get pan very hot",
      "Add chicken - DON'T move for 6min",
      "Flip once, cook 4-5min other side",
      "Check: cut into thick part (no pink)",
      "Remove chicken, rest 5min",
      "Same pan: cook vegetables",
      "Warm pitas in same pan",
      "Slice chicken against grain",
      "Total time: 30min"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). CRUCIAL: 1) Butterflying ensures even cooking 2) Don't skip rest time 3) Sweet potato must be fork-tender 4) Can prep marinade night before. Double carbs if needed."
  },
  {
    name: "Elite Beef and Potato Hash",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 85,
    fats: 42,
    ingredients: [
      "350g ground beef (80/20)",
      "400g potatoes",
      "200g bell peppers",
      "Basic seasoning: salt, pepper, paprika",
      "40g butter",
      "3 eggs",
      "Store-bought hot sauce",
      "Green onions (optional)"
    ],
    instructions: [
      "FIRST: Cut potatoes into 1cm cubes",
      "Boil potatoes 5min only (par-boil)",
      "Drain VERY well, let steam dry",
      "Get large pan very hot",
      "Add beef, break up well",
      "Cook until well browned (7-8min)",
      "Remove beef, keep warm",
      "Same pan: add butter, potatoes",
      "DON'T stir potatoes for 5min (crust)",
      "Add peppers, stir gently",
      "Return beef, mix carefully",
      "Create wells for eggs",
      "Cover pan 3min for eggs",
      "Total time: 35min"
    ],
    notes: "Perfect post-evening training meal (within 90min). KEY POINTS: 1) Small potato cubes cook faster 2) Drying potatoes helps crisp 3) Don't stir too much - prevents crust 4) Eggs should still wobble. Great for next day too - just reheat and add fresh eggs."
  }
],
 // Day 8
 [
  {
    name: "Moroccan Lamb Breakfast Skillet",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g lamb mince",
      "4 large eggs",
      "2 wholemeal pita breads",
      "200g sweet potato",
      "Easy spice mix: 2tsp cumin, 1tsp each paprika, cinnamon",
      "35g butter",
      "Store-bought hummus",
      "Fresh mint (optional)"
    ],
    instructions: [
      "FIRST: Dice sweet potato very small (1cm)",
      "Microwave sweet potato 4min until soft",
      "Get pan very hot while potato cooks",
      "Add lamb to dry hot pan",
      "Break up well with wooden spoon",
      "Cook 5min until starting to brown",
      "Add spice mix, stir well",
      "Add cooked sweet potato",
      "Press mixture flat in pan",
      "Make 4 wells for eggs",
      "Add butter around edges",
      "Crack eggs into wells",
      "COVER pan 3min for runny yolks",
      "Warm pitas last minute",
      "Total time: 25min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). TIPS: 1) Small sweet potato cubes cook faster 2) Don't stir once eggs are in 3) Eggs done when whites set but yolks wobble 4) Can prep sweet potato night before. Double bread if very hungry."
  },
  {
    name: "Protein Pasta Power Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 95,
    fats: 38,
    ingredients: [
      "350g chicken breast",
      "250g penne pasta",
      "200g broccoli (fresh/frozen)",
      "Sauce: 3tbsp olive oil, 2 cloves garlic (or 1tsp powder)",
      "40g parmesan cheese",
      "Store-bought pesto",
      "Cherry tomatoes",
      "Red chili flakes (optional)"
    ],
    instructions: [
      "FIRST: Get pasta water boiling (well salted!)",
      "Cut chicken into 2cm strips (even size)",
      "Season chicken well with salt/pepper",
      "Start pasta when water boils",
      "Get pan very hot for chicken",
      "Add half the oil",
      "Cook chicken 3min first side",
      "Flip, cook 2min more",
      "Remove chicken, let rest",
      "Add broccoli to pasta last 3min",
      "Reserve 1 cup pasta water!",
      "Drain pasta and broccoli",
      "Return to pot, add pesto, oil",
      "Add pasta water until silky",
      "Slice chicken, mix through",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal (within 90min). IMPORTANT: 1) Don't overcook chicken 2) Pasta water is crucial for sauce 3) Can use any pasta shape 4) Test pasta 1min before pack time. Double pasta portion for intense sessions."
  },
  {
    name: "Spicy Beef Rice Skillet",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "300g beef strips (sirloin/flank)",
      "200g jasmine rice",
      "200g mixed peppers",
      "Easy sauce: 4tbsp soy sauce, 2tbsp honey",
      "35g oil",
      "Store-bought sweet chili sauce",
      "Green onions",
      "Sesame seeds"
    ],
    instructions: [
      "RICE FIRST: Start in rice cooker/pot",
      "Slice beef very thin against grain",
      "Pro tip: Freeze 15min for easier slicing",
      "Mix sauce ingredients in bowl",
      "Slice peppers into strips",
      "Get pan VERY hot",
      "Add oil, then beef in single layer",
      "DON'T MOVE for 1min (good crust)",
      "Quick stir, cook 30sec more",
      "Remove beef, keep warm",
      "Same pan: cook peppers 3min",
      "Return beef, add sauce",
      "Bubble 1min until sticky",
      "Total time: 25min (including rice)"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). KEY POINTS: 1) Thin beef slices crucial 2) Don't overcrowd pan 3) Sauce thickens quick - watch carefully 4) Rice can be made ahead. Double rice for intense training days."
  },
  {
    name: "Atlantic Salmon Potato Stack",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "400g salmon fillets",
      "350g potatoes",
      "200g asparagus (or green beans)",
      "Basic seasoning: salt, pepper, herbs",
      "45g butter",
      "1 lemon",
      "Store-bought tartare sauce",
      "Fresh dill (optional)"
    ],
    instructions: [
      "FIRST: Cut potatoes into thin rounds",
      "Boil potatoes 10min until just tender",
      "Pat salmon VERY dry with paper towels",
      "Season skin AND flesh well",
      "Get pan medium-hot (not smoking)",
      "Add half butter to pan",
      "Place salmon SKIN DOWN",
      "DON'T MOVE for 6min (crispy skin)",
      "Flip carefully, 2min other side",
      "Remove, rest while plating",
      "Same pan: add remaining butter",
      "Crisp potato rounds 2min each side",
      "Quick cook asparagus last minute",
      "Finish with lemon squeeze",
      "Total time: 30min"
    ],
    notes: "Perfect post-evening training meal (within 90min). CRUCIAL: 1) Dry salmon = crispy skin 2) Don't move fish while skin crisps 3) Potatoes should be slightly undercooked before pan 4) Watch heat - medium hot for salmon. Can substitute any fish."
  }
],
// Day 9
[
  {
    name: "Champion's Power Steak & Eggs",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g flank steak",
      "4 large eggs",
      "2 bagels",
      "200g mixed mushrooms",
      "Simple seasoning: salt, pepper, garlic powder",
      "35g butter",
      "Store-bought steak sauce",
      "Fresh parsley (optional)"
    ],
    instructions: [
      "FIRST: Take steak out 30min before cooking",
      "Score steak in diamond pattern both sides",
      "Season generously with salt/pepper/garlic",
      "Get pan SMOKING hot",
      "Cook steak 4min first side",
      "Flip once, 3min other side",
      "Remove, rest on warm plate",
      "Same pan: add butter, mushrooms",
      "DON'T MOVE mushrooms 3min (golden)",
      "Push to side, add remaining butter",
      "Crack eggs into space",
      "Cover 2min for runny yolks",
      "Toast bagels last minute",
      "Slice steak AGAINST grain",
      "Total time: 25min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). CRUCIAL: 1) Room temp steak cooks better 2) Scoring helps with tough cuts 3) Don't flip steak multiple times 4) Rest meat while eggs cook. Can use any bread if no bagels."
  },
  {
    name: "Mediterranean Chicken Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 90,
    fats: 40,
    ingredients: [
      "350g chicken thighs",
      "250g couscous",
      "200g mixed roasted vegetables (frozen ok)",
      "Easy marinade: 3tbsp olive oil, lemon, herbs",
      "40g pine nuts (or almonds)",
      "Store-bought tzatziki",
      "Cherry tomatoes",
      "Fresh mint (optional)"
    ],
    instructions: [
      "FIRST: Cut chicken into even chunks",
      "Mix marinade, coat chicken well",
      "Boil kettle for couscous",
      "Pour boiling water over couscous (1:1)",
      "Cover tight with wrap - set timer 5min!",
      "Get pan very hot",
      "Add chicken in single layer",
      "DON'T STIR for 4min (good color)",
      "Stir, cook 3min more",
      "Meanwhile: microwave frozen veg",
      "Toast nuts in dry pan (watch careful)",
      "Fluff couscous with fork",
      "Mix everything together",
      "Add tzatziki last",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal (within 90min). TIPS: 1) Thighs better than breast here 2) Don't peek at couscous 3) Nuts burn quick - watch carefully 4) Can prep chicken night before. Double couscous for intense sessions."
  },
  {
    name: "Teriyaki Salmon Rice Bowl",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "350g salmon fillet",
      "200g sushi rice (any rice works)",
      "200g broccoli (fresh/frozen)",
      "Easy sauce: 4tbsp soy sauce, 2tbsp honey",
      "35g sesame oil",
      "Store-bought teriyaki sauce",
      "Sesame seeds",
      "Green onions"
    ],
    instructions: [
      "RICE FIRST: Rinse until water clear",
      "Start rice (cooker or pot)",
      "Pat salmon VERY dry with paper towels",
      "Cut into large chunks (easier to flip)",
      "Mix sauce ingredients in bowl",
      "Get pan medium-hot",
      "Add oil, then salmon",
      "Cook 3min first side",
      "Carefully flip pieces",
      "Add sauce, bubble 2min",
      "Meanwhile: microwave broccoli",
      "Salmon done when flakes easily",
      "Build bowl: rice, veg, salmon",
      "Pour over pan sauce",
      "Total time: 25min"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). KEY POINTS: 1) Dry fish = better sear 2) Sauce thickens fast - watch it 3) Don't overcook salmon 4) Rice can be made ahead. Double carbs for intense days."
  },
  {
    name: "Arabian Spiced Lamb Rice",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 85,
    fats: 42,
    ingredients: [
      "400g lamb mince",
      "250g rice",
      "200g mixed vegetables",
      "Basic spices: cumin, coriander, cinnamon",
      "45g butter",
      "Store-bought hummus",
      "Plain yogurt",
      "Fresh mint (optional)"
    ],
    instructions: [
      "FIRST: Start rice (cooker or pot)",
      "Mix spices in small bowl",
      "Get large pan very hot",
      "Add lamb, break up well",
      "DON'T STIR for 4min (brown crust)",
      "Add spices, stir through",
      "Cook 3min more",
      "Add frozen veg directly",
      "Stir through butter at end",
      "Check rice - should be fluffy",
      "Layer: rice, then lamb mix",
      "Top with hummus, yogurt",
      "Finish with torn mint",
      "Total time: 30min"
    ],
    notes: "Perfect post-evening training meal (within 90min). IMPORTANT: 1) Don't rush the browning 2) Spices can burn - watch heat 3) Rice needs proper resting time 4) Can prep spice mix ahead. Great for next day too."
  }
],
// Day 10
[
  {
    name: "Turkish Style Beef Breakfast",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g beef strips (sirloin/flank)",
      "4 large eggs",
      "2 large flatbreads",
      "200g mixed peppers",
      "Simple spice mix: paprika, black pepper, garlic powder",
      "35g butter",
      "Store-bought chili sauce",
      "Plain yogurt"
    ],
    instructions: [
      "FIRST: Slice beef very thin against grain",
      "Pro tip: Freeze 15min for easier slicing",
      "Mix spices in small bowl",
      "Season beef well with spices",
      "Get pan SMOKING hot",
      "Add beef in single layer",
      "DON'T MOVE for 2min (good crust)",
      "Quick stir, 1min more only",
      "Remove beef, keep warm",
      "Same pan: add butter, peppers",
      "Cook peppers until charred edges",
      "Push aside, crack in eggs",
      "Cover pan 2-3min for runny yolks",
      "Warm flatbreads 30sec each side",
      "Total time: 20min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). CRUCIAL: 1) Thin slicing beef is key 2) Don't overcook beef - should be pink 3) Eggs should still wobble 4) Any flatbread works. Double bread for intense sessions."
  },
  {
    name: "Power Pasta Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 95,
    fats: 38,
    ingredients: [
      "350g chicken breast",
      "250g fusilli pasta",
      "200g frozen vegetable mix",
      "Simple sauce: olive oil, garlic, chili flakes",
      "40g parmesan cheese",
      "Store-bought pesto",
      "Cherry tomatoes",
      "Fresh basil (optional)"
    ],
    instructions: [
      "FIRST: Get large pot of water boiling",
      "Cut chicken into even strips",
      "Season well with salt/pepper",
      "Start pasta when water boils",
      "Get pan very hot for chicken",
      "Cook chicken 4min first side",
      "Flip, cook 3min more",
      "Remove chicken, let rest",
      "Microwave frozen veg",
      "Reserve 1 cup pasta water!",
      "Drain pasta when al dente",
      "Return to pot with pesto, oil",
      "Add pasta water until silky",
      "Slice chicken, mix through",
      "Total time: 25min"
    ],
    notes: "Great post-workout meal (within 90min). TIPS: 1) Salt pasta water well 2) Don't overcook chicken 3) Pasta water makes sauce creamy 4) Can use any pasta shape. Double portion for intense training."
  },
  {
    name: "Honey Soy Beef Bowl",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "300g beef mince",
      "200g jasmine rice",
      "200g broccoli (fresh/frozen)",
      "Easy sauce: 4tbsp soy sauce, 2tbsp honey",
      "35g sesame oil",
      "Store-bought sweet chili sauce",
      "2 eggs",
      "Green onions"
    ],
    instructions: [
      "RICE FIRST: Start in cooker/pot",
      "Mix sauce ingredients in bowl",
      "Get pan very hot",
      "Add beef, break up well",
      "DON'T STIR 4min (brown crust)",
      "Add sauce, stir through",
      "Cook 2min until sticky",
      "Remove beef, keep warm",
      "Same pan: cook eggs sunny side",
      "Meanwhile: microwave broccoli",
      "Build bowls: rice base",
      "Top with beef, eggs",
      "Finish with green onions",
      "Total time: 25min"
    ],
    notes: "Perfect pre-evening training (2-3hrs before). IMPORTANT: 1) Let beef brown properly 2) Sauce reduces quick - watch it 3) Eggs should have runny yolks 4) Rice can be made ahead. Great for next day too."
  },
  {
    name: "Mediterranean Lamb Feast",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "400g lamb chops",
      "300g sweet potatoes",
      "200g mixed Mediterranean veg",
      "Basic marinade: olive oil, garlic, rosemary",
      "40g butter",
      "Store-bought tzatziki",
      "1 lemon",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "FIRST: Marinate lamb 10min (or overnight)",
      "Cut sweet potatoes into wedges",
      "Boil sweet potatoes 10min only",
      "Pat lamb dry with paper towels",
      "Get pan VERY hot",
      "Cook lamb 4min first side",
      "Flip once, 3min other side",
      "Remove, rest 5min minimum",
      "Same pan: finish sweet potatoes",
      "Add butter, crisp them up",
      "Quick cook vegetables",
      "Squeeze lemon over all",
      "Serve with tzatziki",
      "Total time: 30min"
    ],
    notes: "Perfect post-evening training meal (within 90min). KEY POINTS: 1) Don't skip marinating 2) Par-boiled potatoes crisp better 3) Rest meat properly 4) Can prep potatoes ahead. Double carbs for intense sessions."
  }
],
// Day 11
[
  {
    name: "Power Shakshuka Breakfast",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g lean beef mince",
      "4 large eggs",
      "2 wholemeal pittas",
      "200g mixed peppers",
      "100g onions",
      "Basic spices: paprika, cumin, chili powder",
      "35g butter",
      "Store-bought tomato sauce",
      "Plain yogurt"
    ],
    instructions: [
      "FIRST: Chop onions and peppers",
      "Get pan hot while prepping",
      "Add beef, break up well",
      "Let brown 5min (don't stir too much)",
      "Add spices, stir through",
      "Add peppers and onions",
      "Cook 3min until softening",
      "Add tomato sauce, simmer 2min",
      "Make 4 wells in mixture",
      "Crack eggs into wells",
      "Cover pan 3-4min for eggs",
      "IMPORTANT: whites set, yolks runny",
      "Toast pittas last minute",
      "Finish with yogurt dollops",
      "Total time: 25min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). TIPS: 1) Don't rush the beef browning 2) Eggs cook from steam - keep covered 3) Check eggs early - they cook quick 4) Can prep veg night before. Double bread for bigger appetites."
  },
  {
    name: "Asian Fusion Steak Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 90,
    fats: 40,
    ingredients: [
      "350g flank steak",
      "250g rice noodles",
      "200g mixed Asian vegetables",
      "Easy sauce: soy sauce, honey, sesame oil",
      "35g peanut oil (or regular)",
      "Store-bought sweet chili sauce",
      "Crushed peanuts",
      "Green onions"
    ],
    instructions: [
      "FIRST: Put water on to boil",
      "Slice steak VERY thin against grain",
      "Pro tip: Freeze 15min for easier slicing",
      "Mix sauce ingredients in bowl",
      "Soak noodles in boiling water",
      "Get wok/pan SMOKING hot",
      "Add beef in batches (important!)",
      "30sec each batch - no more!",
      "Remove beef, keep warm",
      "Same pan: quick fry vegetables",
      "Drain noodles when just soft",
      "Return everything to pan",
      "Add sauce, toss until coated",
      "Top with peanuts, onions",
      "Total time: 20min"
    ],
    notes: "Perfect post-workout meal (within 90min). CRUCIAL: 1) Thin slicing is key 2) Don't overcook beef 3) Check noodles often - they cook quick 4) Can use any quick-cook noodles. Double carbs for intense sessions."
  },
  {
    name: "Mediterranean Chicken Pasta",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "350g chicken thighs",
      "200g penne pasta",
      "200g cherry tomatoes",
      "100g spinach",
      "Simple sauce: olive oil, garlic, herbs",
      "40g parmesan",
      "Store-bought pesto",
      "Fresh basil (optional)"
    ],
    instructions: [
      "FIRST: Get pasta water boiling",
      "Cut chicken into bite-size pieces",
      "Season well with salt/pepper",
      "Start pasta when water boils",
      "Get pan very hot",
      "Cook chicken 6-7min total",
      "Add tomatoes to same pan",
      "Cook until tomatoes burst",
      "Add spinach to wilt",
      "Save 1 cup pasta water!",
      "Drain pasta, back to pot",
      "Mix in pesto, cheese",
      "Add pasta water until silky",
      "Combine with chicken mix",
      "Total time: 25min"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). KEY POINTS: 1) Thighs more forgiving than breast 2) Don't overcook pasta 3) Pasta water makes sauce perfect 4) Can use any pasta shape. Double portion for intense days."
  },
  {
    name: "Power Beef Burrito Bowl",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 85,
    fats: 42,
    ingredients: [
      "400g beef strips",
      "250g rice",
      "200g mixed peppers",
      "Simple seasoning: cumin, paprika, garlic",
      "40g olive oil",
      "Store-bought guacamole",
      "Black beans (canned)",
      "Fresh lime"
    ],
    instructions: [
      "RICE FIRST: Start in cooker/pot",
      "Slice beef against grain thin",
      "Mix seasonings in bowl",
      "Slice peppers into strips",
      "Get pan VERY hot",
      "Cook beef in batches (!)",
      "2min per batch maximum",
      "Remove beef, keep warm",
      "Same pan: cook peppers",
      "Heat black beans in microwave",
      "Layer bowls: rice base",
      "Add beef, peppers, beans",
      "Top with guacamole",
      "Squeeze lime over all",
      "Total time: 30min"
    ],
    notes: "Perfect post-evening training meal (within 90min). IMPORTANT: 1) Thin beef slices cook better 2) Don't overcrowd pan 3) Rice can be made ahead 4) Beans add extra protein. Great for next day lunch too."
  }
],
 // Day 12
 [
  {
    name: "Ultimate Steak and Potato Hash",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g sirloin steak",
      "4 large eggs",
      "250g potatoes",
      "150g bell peppers",
      "Basic seasoning: salt, pepper, garlic powder",
      "35g butter",
      "Store-bought hot sauce",
      "Green onions"
    ],
    instructions: [
      "FIRST: Dice potatoes small (1cm cubes)",
      "Microwave potatoes 4min to par-cook",
      "Meanwhile, cut steak into 2cm cubes",
      "Get pan VERY hot",
      "Add steak cubes, don't move 2min",
      "Quick stir, cook 1min more",
      "Remove steak, keep warm",
      "Add butter, potatoes to pan",
      "DON'T STIR potatoes 5min (crispy!)",
      "Add peppers, quick stir",
      "Make 4 wells in mixture",
      "Crack eggs into wells",
      "Cover 3min for runny yolks",
      "Add steak back last minute",
      "Total time: 25min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). CRUCIAL: 1) Small potato cubes cook faster 2) Don't overcook steak 3) Let potatoes crisp undisturbed 4) Eggs done when whites set but yolks wobble. Can prep potatoes night before."
  },
  {
    name: "Mediterranean Power Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 90,
    fats: 40,
    ingredients: [
      "350g chicken breast",
      "250g couscous",
      "200g mixed Mediterranean veg",
      "Simple dressing: olive oil, lemon juice",
      "40g feta cheese",
      "Store-bought hummus",
      "Cherry tomatoes",
      "Olives (optional)"
    ],
    instructions: [
      "FIRST: Cut chicken into even strips",
      "Season well with salt/pepper/herbs",
      "Boil kettle for couscous",
      "Pour over couscous (1:1 ratio)",
      "Cover tight with wrap (5min timer!)",
      "Get pan very hot",
      "Cook chicken 4min first side",
      "Flip once, 3min second side",
      "Remove, let rest 5min",
      "Meanwhile: prep vegetables",
      "Fluff couscous with fork",
      "Mix in olive oil, lemon",
      "Slice chicken against grain",
      "Layer bowl, crumble feta on top",
      "Total time: 25min"
    ],
    notes: "Perfect post-workout meal (within 90min). TIPS: 1) Don't peek at couscous 2) Rest chicken for juiciness 3) Fluff couscous well to prevent clumps 4) Can use quinoa instead. Double grain portion for intense sessions."
  },
  {
    name: "Spicy Beef Noodle Bowl",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "300g beef mince",
      "200g egg noodles",
      "200g frozen Asian vegetables",
      "Easy sauce: soy sauce, sweet chili",
      "35g sesame oil",
      "Store-bought hoisin sauce",
      "Sesame seeds",
      "Green onions"
    ],
    instructions: [
      "FIRST: Boil water for noodles",
      "Mix sauce ingredients in bowl",
      "Get pan very hot",
      "Add beef, break up well",
      "DON'T STIR 4min (brown crust)",
      "Add sauce, stir through",
      "Meanwhile: cook noodles",
      "Microwave frozen veg",
      "Drain noodles well",
      "Add to beef with vegetables",
      "Toss everything together",
      "Taste - add more sauce if needed",
      "Top with seeds, onions",
      "Total time: 20min"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). KEY POINTS: 1) Let beef brown properly 2) Don't overcook noodles 3) Drain noodles well to prevent soggy bowl 4) Can use any noodles. Double carbs for intense days."
  },
  {
    name: "Grilled Lamb Feast",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "400g lamb chops",
      "300g sweet potatoes",
      "200g broccoli",
      "Basic marinade: olive oil, garlic, rosemary",
      "40g butter",
      "Store-bought mint sauce",
      "1 lemon",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "FIRST: Marinate lamb 10min minimum",
      "Cut sweet potatoes into wedges",
      "Boil sweet potatoes 10min only",
      "Pat lamb dry before cooking",
      "Get pan VERY hot",
      "Cook lamb 4min first side",
      "Flip once, 3min other side",
      "Remove, rest 5min minimum",
      "Same pan: crisp sweet potatoes",
      "Add butter, herbs if using",
      "Microwave broccoli until bright",
      "Finish broccoli in lamb pan",
      "Squeeze lemon over all",
      "Total time: 30min"
    ],
    notes: "Perfect post-evening training meal (within 90min). IMPORTANT: 1) Patting lamb dry helps browning 2) Don't skip resting time 3) Par-boiled potatoes crisp better 4) Can prep potatoes ahead. Great for next day too."
  }
],
  // Day 13
  [
      {
        name: "Middle Eastern Beef Breakfast",
        timing: "Early morning",
        calories: 850,
        protein: 65,
        carbs: 75,
        fats: 42,
        ingredients: [
          "300g beef striploin",
          "4 large eggs",
          "2 large wholemeal wraps",
          "200g mixed peppers",
          "Basic spice mix: cumin, paprika, black pepper",
          "35g butter",
          "Store-bought hummus",
          "Fresh parsley (optional)"
        ],
        instructions: [
          "FIRST: Cut beef into thin strips",
          "Pro tip: Freeze 15min for easier slicing",
          "Mix spices in small bowl",
          "Season beef well with spices",
          "Get pan SMOKING hot",
          "Add beef in batches (!)",
          "DON'T MOVE for 2min (browns better)",
          "Quick stir, 1min more only",
          "Remove beef, keep warm",
          "Add butter, peppers to pan",
          "Cook until edges charred",
          "Push aside, crack in eggs",
          "Cover 2-3min for runny yolks",
          "Warm wraps in same pan",
          "Total time: 25min"
        ],
        notes: "Perfect pre-training breakfast (2.5-3hrs before). CRUCIAL: 1) Thin slicing beef is key 2) Don't overcook beef - should be pink 3) Eggs should still wobble 4) Any large wraps work. Can prep beef night before."
      },
      {
        name: "Power Pasta Bowl",
        timing: "Late morning/lunch",
        calories: 900,
        protein: 65,
        carbs: 90,
        fats: 40,
        ingredients: [
          "350g chicken thighs",
          "250g rigatoni pasta",
          "200g cherry tomatoes",
          "100g baby spinach",
          "Simple sauce: olive oil, garlic, chili",
          "40g parmesan",
          "Store-bought pesto",
          "Fresh basil (optional)"
        ],
        instructions: [
          "FIRST: Get pasta water boiling",
          "Cut chicken into even chunks",
          "Season well with salt/pepper",
          "Start pasta when water boils",
          "Get pan very hot for chicken",
          "Cook chicken 6-7min total",
          "Remove chicken, let rest",
          "Same pan: burst tomatoes",
          "Add spinach to wilt",
          "Reserve 1 cup pasta water!",
          "Drain pasta when al dente",
          "Mix with pesto, cheese",
          "Add pasta water until silky",
          "Slice chicken, combine all",
          "Total time: 25min"
        ],
        notes: "Perfect post-workout meal (within 90min). TIPS: 1) Thighs stay juicier than breast 2) Salt pasta water well 3) Pasta water is key for sauce 4) Can use any pasta shape. Double portion for intense sessions."
      },
      {
        name: "Asian Salmon Rice Bowl",
        timing: "Mid-afternoon",
        calories: 850,
        protein: 60,
        carbs: 85,
        fats: 42,
        ingredients: [
          "350g salmon fillet",
          "200g jasmine rice",
          "200g mixed Asian vegetables",
          "Easy sauce: soy sauce, honey, ginger",
          "35g sesame oil",
          "Store-bought teriyaki sauce",
          "Sesame seeds",
          "Green onions"
        ],
        instructions: [
          "RICE FIRST: Start in cooker/pot",
          "Pat salmon VERY dry with paper",
          "Season skin well with salt",
          "Get pan medium-hot",
          "Add oil, then salmon skin down",
          "DON'T MOVE for 5min (crispy skin)",
          "Flip carefully, 2min other side",
          "Remove, let rest",
          "Same pan: cook vegetables",
          "Mix sauce ingredients",
          "Pour over hot vegetables",
          "Break salmon into chunks",
          "Layer: rice, veg, salmon",
          "Top with seeds, onions",
          "Total time: 25min"
        ],
        notes: "Great pre-evening training meal (2-3hrs before). IMPORTANT: 1) Dry fish = crispy skin 2) Don't move salmon while cooking 3) Sauce thickens quick - watch it 4) Rice can be made ahead. Double carbs for intense days."
      },
      {
        name: "Turkish Spiced Lamb Bowl",
        timing: "Evening/dinner",
        calories: 900,
        protein: 70,
        carbs: 80,
        fats: 45,
        ingredients: [
          "400g lamb mince",
          "250g bulgur wheat (or rice)",
          "200g mixed vegetables",
          "Basic spices: cumin, coriander, paprika",
          "40g butter",
          "Store-bought tzatziki",
          "Fresh mint",
          "1 lemon"
        ],
        instructions: [
          "FIRST: Boil kettle for bulgur",
          "Mix spices in small bowl",
          "Get pan very hot",
          "Add lamb, break up well",
          "Let brown 5min (don't stir)",
          "Add spices, mix through",
          "Meanwhile: pour boiling water over bulgur",
          "Cover bulgur (1:1 ratio)",
          "Set timer 10min - don't peek!",
          "Microwave frozen veg",
          "Add to lamb last few minutes",
          "Fluff bulgur with fork",
          "Layer: bulgur, lamb mix",
          "Top with tzatziki, mint",
          "Total time: 25min"
        ],
        notes: "Perfect post-evening training meal (within 90min). KEY POINTS: 1) Don't rush the browning 2) Let bulgur steam properly 3) Can use rice instead 4) Tzatziki adds good fats. Great for meal prep - stays good next day."
      }
    ],
    // Day 14
[
  {
    name: "Champion's Power Breakfast",
    timing: "Early morning",
    calories: 850,
    protein: 65,
    carbs: 75,
    fats: 42,
    ingredients: [
      "300g ribeye steak",
      "4 large eggs",
      "2 bagels",
      "200g mushrooms",
      "Basic seasoning: salt, pepper, garlic powder",
      "35g butter",
      "Store-bought steak sauce",
      "Fresh chives (optional)"
    ],
    instructions: [
      "FIRST: Take steak out 30min before",
      "Season steak generously both sides",
      "Get pan SMOKING hot",
      "Sear steak 4min first side",
      "Flip once, 3min other side",
      "Remove, rest on warm plate",
      "Add butter, mushrooms to pan",
      "DON'T STIR 3min (golden brown)",
      "Push to side, add more butter",
      "Crack eggs into empty space",
      "Cover 2-3min for runny yolks",
      "Meanwhile toast bagels",
      "Slice steak AGAINST grain",
      "Build: bagel, eggs, steak, mushrooms",
      "Total time: 25min"
    ],
    notes: "Perfect pre-training breakfast (2.5-3hrs before). CRUCIAL: 1) Room temp steak cooks better 2) Don't move steak while cooking 3) Let rest equal to cook time 4) Eggs should wobble slightly. Can substitute any good steak cut."
  },
  {
    name: "Ultimate Recovery Bowl",
    timing: "Late morning/lunch",
    calories: 900,
    protein: 65,
    carbs: 90,
    fats: 40,
    ingredients: [
      "350g chicken thighs",
      "250g sweet potato",
      "200g mixed vegetables",
      "Simple marinade: olive oil, lemon, herbs",
      "40g feta cheese",
      "Store-bought hummus",
      "Cherry tomatoes",
      "2 flatbreads"
    ],
    instructions: [
      "FIRST: Cut sweet potato in 2cm cubes",
      "Microwave potato 5min to start",
      "Meanwhile marinade chicken",
      "Cut chicken into even chunks",
      "Get pan very hot",
      "Add chicken in single layer",
      "Cook 4min first side (don't move!)",
      "Flip, cook 3min more",
      "Remove chicken, rest 5min",
      "Same pan: crisp sweet potatoes",
      "Add vegetables last few minutes",
      "Warm flatbreads in same pan",
      "Build bowl: potatoes, chicken, veg",
      "Top with feta, hummus",
      "Total time: 30min"
    ],
    notes: "Perfect post-workout meal (within 90min). TIPS: 1) Thighs more forgiving than breast 2) Small potato cubes cook faster 3) Don't crowd the pan 4) Can prep potatoes ahead. Double carbs for intense sessions."
  },
  {
    name: "Power Beef Rice Skillet",
    timing: "Mid-afternoon",
    calories: 850,
    protein: 60,
    carbs: 85,
    fats: 42,
    ingredients: [
      "300g beef strips",
      "200g basmati rice",
      "200g broccoli",
      "Easy sauce: soy sauce, honey, garlic",
      "35g sesame oil",
      "Store-bought teriyaki sauce",
      "2 eggs",
      "Green onions"
    ],
    instructions: [
      "RICE FIRST: Start in cooker/pot",
      "Slice beef very thin against grain",
      "Pro tip: Freeze 15min for slicing",
      "Mix sauce ingredients in bowl",
      "Get pan VERY hot",
      "Cook beef in batches (!)",
      "1min each side maximum",
      "Remove beef, keep warm",
      "Same pan: cook broccoli",
      "Push aside when almost done",
      "Crack eggs into empty space",
      "Cover 2min for runny yolks",
      "Add beef back, pour sauce",
      "Quick toss everything",
      "Total time: 25min"
    ],
    notes: "Great pre-evening training meal (2-3hrs before). KEY POINTS: 1) Thin beef slices crucial 2) Don't overcook beef 3) Sauce thickens fast - watch it 4) Rice can be made ahead. Double portion for intense training."
  },
  {
    name: "Champion's Feast",
    timing: "Evening/dinner",
    calories: 900,
    protein: 70,
    carbs: 80,
    fats: 45,
    ingredients: [
      "400g lamb chops",
      "300g potatoes",
      "200g asparagus",
      "Basic marinade: olive oil, rosemary, garlic",
      "40g butter",
      "Store-bought mint sauce",
      "1 lemon",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "FIRST: Marinate lamb 10min minimum",
      "Cut potatoes into even chunks",
      "Start potatoes in cold water",
      "Boil 15-20min until tender",
      "Pat lamb dry before cooking",
      "Get pan VERY hot",
      "Cook lamb 4min first side",
      "Flip once, 3min other side",
      "Remove, rest minimum 5min",
      "Drain potatoes well",
      "Return to pot, add butter",
      "Mash roughly for texture",
      "Same pan: quick cook asparagus",
      "Finish with lemon squeeze",
      "Total time: 35min"
    ],
    notes: "Perfect post-evening training meal (within 90min). CRUCIAL: 1) Don't skip marinating 2) Pat meat dry for better crust 3) Don't skip resting time 4) Test potatoes with fork. Great way to end the day and prepare for tomorrow's training."
  }
]
          ]
          }
          ];

  

 
 module.exports = { workoutPlans, dietPlans };