require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ FINAL CORS FIX
const allowedOrigins = [
  "https://flowai-frontend-seven.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);

    // exact match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ✅ allow all Vercel deployments (important)
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', aiRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'FlowAI backend running ✅' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
