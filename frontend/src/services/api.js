import axios from 'axios';

const API = axios.create({ baseURL: 'https://flowai-backend-lwpj.onrender.com/api' });

export const askAI = async (prompt) => {
  const { data } = await API.post('/ask-ai', { prompt });
  return data.response;
};

export const saveConversation = async (prompt, response) => {
  const { data } = await API.post('/save', { prompt, response });
  return data;
};

export const getHistory = async () => {
  const { data } = await API.get('/history');
  return data;
};
