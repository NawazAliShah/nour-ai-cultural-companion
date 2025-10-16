# Firebase Functions
This function provides a secure proxy to call the Gemini API.
- Set your API key in environment variable GEMINI_API_KEY for local testing.
- For production, set via Firebase functions config:
  firebase functions:config:set gemini.key="YOUR_KEY"
- Deploy:
  cd functions
  npm install
  firebase deploy --only functions
