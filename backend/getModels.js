const axios = require('axios');
const fs = require('fs');
(async () => {
    const { data } = await axios.get('https://openrouter.ai/api/v1/models');
    const freeModels = data.data.filter(m => m.pricing.prompt === '0').map(m => m.id);
    const geminiFree = freeModels.filter(m => m.includes('gemini'));
    const llamaFree = freeModels.filter(m => m.includes('llama') || m.includes('gemma'));
    const mistralFree = freeModels.filter(m => m.includes('mistral'));
    fs.writeFileSync('models.json', JSON.stringify({ geminiFree, llamaFree, mistralFree }, null, 2));
    console.log("Written to models.json");
})();
