const functions = require('firebase-functions');
const fetch = require('node-fetch');

// Use environment variable: set via Firebase functions config in production:
// firebase functions:config:set gemini.key="YOUR_KEY"
const GEMINI_KEY = process.env.GEMINI_API_KEY || (functions.config().gemini && functions.config().gemini.key) || '';

exports.chatWithGemini = functions.region(process.env.FUNCTIONS_REGION || 'asia-south1').https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  if (req.method === 'OPTIONS') return res.status(204).send('');

  try {
    const { message, context } = req.body || {};
    const userMessage = message || '';

    const systemPrompt = `You are Nour, a warm Emirati cultural assistant. Respond in a respectful, concise way. Provide cultural context, a simple Arabic phrase (with transliteration), and a short explanation in English and Urdu if asked. Keep replies short (2-4 lines). If user asks for translations, provide examples.`;

    const requestBody = {
      contents: [
        {
          role: 'system',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      // optional: set temperature / candidate count as needed
      temperature: 0.2
    };

    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await resp.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maazrat — I could not process that.';

    res.json({ reply });
  } catch (err) {
    console.error('Error in chatWithGemini:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
