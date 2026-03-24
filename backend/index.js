require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ CORS FIX (Production Safe)
const allowedOrigins = [
  "https://prince-kohli-flowai.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', aiRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'FlowAI backend running ✅' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
