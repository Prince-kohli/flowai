require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost origin (handles port 5173, 5174, etc.)
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', aiRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'FlowAI backend running ✅' }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
