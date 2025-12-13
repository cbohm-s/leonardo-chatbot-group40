const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file (if needed later)
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;


// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // To parse JSON request bodies

//  Utility helpers
function escapeRegExp(str) {
  // Prevent regex crashes when keywords contain special chars
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pickRandomAvoidRepeat(options, lastValue) {
  if (!Array.isArray(options)) return options;
  if (options.length <= 1) return options[0];

  let choice;
  let guard = 0;
  do {
    choice = options[Math.floor(Math.random() * options.length)];
    guard++;
  } while (choice === lastValue && guard < 10);

  return choice;
}

// Persona route (frontend greeting, identity info)
app.get("/persona", (req, res) => {
  res.json({
    name: "Leonardo da Vinci",
    greeting: "Buongiorno! I am Leonardo da Vinci. Ask what you seek—paintings, invention, or the many mysteries of nature.",
    fallback: "A curious question! Yet I must reflect... Ask me of the Mona Lisa, flight, or the human form."
  });
});


// Health check 
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// --- Chatbot Logic ---

// Load Davinci script JSON
const scriptPath = path.join(__dirname, "davinci_script.json");
const chatbotScript = JSON.parse(fs.readFileSync(scriptPath, "utf-8"));

// Helper function: find matching response based on keywords
function getChatbotResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    for (const entry of chatbotScript) {
        // Use whole-word matching to avoid false positives
        const matched = entry.keywords.some(kw => {
            if (!kw || kw.trim() === "") return false;
            const pattern = new RegExp(`\\b${kw}\\b`, "i");
            return pattern.test(msg);
        });

        if (matched) {
            // Some responses are arrays — pick randomly
            if (Array.isArray(entry.response)) {
                return entry.response[Math.floor(Math.random() * entry.response.length)];
            }
            return entry.response;
        }
    }

    return "Hmm… I must ponder this further. Could you ask in another way?";
}

// Main chat route
app.post("/chat", (req, res) => {
    const userMessage = req.body.message;

    const chatbotResponse = getChatbotResponse(userMessage);

    // Simulate response delay
    setTimeout(() => {
        res.json({
            response: chatbotResponse,
            timestamp: new Date().toISOString()
        });
    }, 300);
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the backend at http://localhost:${PORT}`);
});
