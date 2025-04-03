# First-Time User Journey for Toasted Fitness App

## User Flow (Fixed & Correct)

1. **App Launch**
   - User opens the app for the first time
   - App shows loading screen
   - Detects no existing session
   - Redirects to Login screen

2. **Authentication (3 Options)**
   - **Email Registration**: User registers with email/password
   - **Google Sign-In**: User authenticates with Google
   - **Apple Sign-In**: User authenticates with Apple (iOS only)

3. **Plan Selection** (CRITICAL FIRST-TIME STEP)
   - After successful authentication, new users are **automatically** sent to the Plan Selection screen
   - This happens because:
     - The LoadingScreen checks if the user has active plans
     - New users have no plans, so they're directed to select them
     - This ensures all users have plans before using the app

4. **Plan Setup**
   - User selects their workout plan
   - User selects their diet plan
   - User confirms selection

5. **Main App Experience**
   - Only after plan selection is the user taken to the main app
   - They can now track progress, view workouts, etc.

## How This Works Technically

1. **Authentication**
   - User authenticates (email/Google/Apple)
   - Auth tokens are saved in AsyncStorage
   - Auth state is updated in the AuthContext

2. **Navigation Flow**
   - Auth success is detected by LoginScreen/RegisterScreen
   - Instead of going directly to MainTabs, it navigates to LoadingScreen
   - LoadingScreen checks if user has plans (via API)
   - If no plans exist, it navigates to PlanSelection
   - If plans exist, it navigates to MainTabs

3. **Plan Selection**
   - User selects and confirms plans
   - Backend saves plan selections
   - App navigates to MainTabs

## Returning User Flow

1. **App Launch**
   - User opens the app
   - Auth tokens found in AsyncStorage
   - Plans are verified on the backend
   - User is taken directly to MainTabs with today's plan 