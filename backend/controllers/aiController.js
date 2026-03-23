const axios = require('axios');
const Conversation = require('../models/Conversation');

// Try multiple free models in order of preference
const MODELS = [
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-2-9b-it:free',
  'mistralai/mistral-7b-instruct:free',
  'openrouter/auto' // This will auto-route to the best available free model if you have 0 balance
];

// POST /api/ask-ai
const askAI = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`🤖 Trying model: ${model}`);
      const { data } = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model,
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'FlowAI',
          },
          timeout: 30000,
        }
      );

      const response = data.choices[0].message.content;
      console.log(`✅ Response from ${model}`);
      return res.json({ response, model });
    } catch (err) {
      const errData = err.response?.data;
      console.error(`❌ Model ${model} failed:`, JSON.stringify(errData || err.message));
      lastError = errData?.error?.message || err.message;
    }
  }

  return res.status(500).json({
    error: 'All AI models failed.',
    detail: lastError,
  });
};

// POST /api/save
const saveConversation = async (req, res) => {
  const { prompt, response } = req.body;
  if (!prompt || !response) {
    return res.status(400).json({ error: 'Prompt and response are required.' });
  }
  try {
    const conversation = await Conversation.create({ prompt, response });
    return res.status(201).json({ message: 'Saved!', data: conversation });
  } catch (err) {
    console.error('Save Error:', err.message);
    return res.status(500).json({ error: 'Failed to save conversation.' });
  }
};

// GET /api/history
const getHistory = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ createdAt: -1 })
      .limit(20);
    return res.json(conversations);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch history.' });
  }
};

module.exports = { askAI, saveConversation, getHistory };
