const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const BOT_TOKEN = "7739943389:AAG-XaC2sJ7GPtLKKdNww3knIDS2zW72V8k";
const CHAT_ID = "-1002704437793";

app.post("/notify", async (req, res) => {
  const message = req.body.message || "🚨 إشعار بدون نص";

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "خطأ أثناء إرسال الإشعار", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Telegram Notifier يعمل على المنفذ ${port}`);
});
