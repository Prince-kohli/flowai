const express = require('express');
const router = express.Router();
const { askAI, saveConversation, getHistory } = require('../controllers/aiController');

router.post('/ask-ai', askAI);
router.post('/save', saveConversation);
router.get('/history', getHistory);

module.exports = router;
