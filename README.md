# ⚡ FlowAI – Visual AI Workflow Builder

A full-stack modern web application that allows users to seamlessly connect UI nodes, input text prompts, and fetch intelligent responses from OpenRouter's AI models via a highly interactive visual flow interface.

---

## 🚀 Features

- **Interactive Node Architecture:** Drag, link, and visualize workflow connections using React Flow.
- **AI Integration:** Securely connected to OpenRouter's free-tier AI models via a custom Express API.
- **Glassmorphic & Premium Design:** Features a rich UI with glowing edges, micro-animations, and a responsive Dark Mode interface.
- **Conversation History panel:** Instant saving to MongoDB with a retractable side-panel to view logged exchanges.
- **Robust Error Handling & Model Fallbacks:** Employs array-based LLM fallback routing in the Node.js backend to guarantee an answer even if a specific free-tier AI model endpoint goes offline.

---

## 🛠️ Tech Stack (MERN + React Flow)

- **Frontend:** React 19, Vite, React Flow, CSS3 (Custom Glass UI)
- **Backend:** Node.js, Express.js, Axios
- **Database:** MongoDB (via Mongoose schema architecture)
- **AI Service:** OpenRouter API (`llama`, `gemma`, `mistral`, and custom routing)

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- Local MongoDB instance or MongoDB Atlas Setup (at `mongodb://localhost:27017/flowai`)
- Your OpenRouter API Key

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
API_KEY=your_openrouter_api_key
MONGODB_URI=mongodb://localhost:27017/flowai
PORT=5000
```

Start the backend server:
```bash
npm run dev
# The server will run on http://localhost:5000
```

### 2. Frontend Setup

In a new terminal, navigate to the frontend folder:

```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
# The frontend will run on http://localhost:5173
```

🎉 Open your browser to `http://localhost:5173` to start using the app!

---

## 📁 Submission Information
*(Developed as part of the MERN Developer Evaluation)*

- **Developer:** Prince Kumar
- **Architecture:** True MVC Backend & Hook-separated modular Frontend

---
*If you run into any permission or port issues during setup, verify that `5000` and `5173` are unblocked on your local environment.*
