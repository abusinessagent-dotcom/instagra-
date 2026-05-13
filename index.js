const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "AiArtHub_123";

// ✅ Root route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Webhook verification (Meta)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
});

// ✅ Webhook receive (messages आएंगे यहाँ)
app.post("/webhook", (req, res) => {
  console.log("Webhook Data:", JSON.stringify(req.body, null, 2));
  res.status(200).send("EVENT_RECEIVED");
});

// ✅ Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
