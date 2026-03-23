require('dotenv').config();
const axios = require('axios');

async function testAPI() {
  console.log("Using API Key:", process.env.API_KEY ? "Loaded" : "Missing");
  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [{ role: 'user', content: 'Say hello' }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'FlowAI',
        },
      }
    );
    console.log("SUCCESS:");
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
const fs = require('fs');
    console.log("FAILED:");
    const errObj = err.response ? err.response.data : { message: err.message };
    fs.writeFileSync('error.json', JSON.stringify(errObj, null, 2));
    console.log('Error written to error.json');
  }
}

testAPI();
