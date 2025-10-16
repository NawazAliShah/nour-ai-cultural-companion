# Nour-AI — UAE Cultural Companion 

## Overview
This repository is a minimal, ready-to-deploy starter for a multilingual AI Cultural Companion (English + Arabic + Urdu) using:
- Frontend: React (Vite)
- Backend: Firebase Functions (Node.js) — proxy to Gemini API
- Database: Firestore (optional)
- Hosting: Firebase Hosting or Vercel
- AI: Gemini 2.5 Flash (via Google AI Studio / Vertex API) — **DO NOT** commit your API key to the repo.

## What's included
- `functions/` : Firebase Cloud Function that securely calls Gemini.
- `src/` : React frontend (Vite) with Chat UI (English/Arabic/Urdu).
- `.env.example` : Example env file (place your keys here).
- `firebase.json` and `package.json` (root) to help deployment.

## Quick Start (Local)
1. Install Node.js v18+ and Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Clone/unzip this project and install dependencies:
   ```bash
   cd Nour-AI
   # functions deps
   cd functions
   npm install
   cd ..
   npm install
   ```
3. Set environment variables locally:
   - Copy `.env.example` to `.env.local` and add your GEMINI_API_KEY.
4. Initialize Firebase (one-time):
   ```bash
   firebase login
   firebase init functions hosting
   ```
   Choose the project you created on Firebase console.
5. Deploy functions:
   ```bash
   firebase deploy --only functions
   ```
6. Update the frontend `src/ChatBox.jsx` endpoint URL to your deployed function URL.
7. Deploy hosting:
   ```bash
   firebase deploy --only hosting
   ```

## Notes / Best Practices
- Keep your GEMINI API key secret; never push it to public repos.
- Use Firebase Functions environment config for production keys:
  `firebase functions:config:set gemini.key="YOUR_KEY"`
- This starter uses a simple system prompt; refine prompts for safety and cultural accuracy.
- You can use Google AI Studio (student plan) to test Gemini endpoints or Vertex AI for production.

## Files of interest
- `functions/index.js` : Backend proxy to Gemini
- `src/ChatBox.jsx` : Frontend chat UI
- `src/App.jsx` : Main app wrapper

Good luck — build fast, test with real users, and iterate.
