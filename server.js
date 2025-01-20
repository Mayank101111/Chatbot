const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1478", // Replace with your MySQL password
  database: "chatbot", // Database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Define predefined responses
const botTemplates = {
  "hello": "Hi, how can I assist you today?",
  "how are you": "I'm doing great, thank you for asking! How about you?",
  "bye": "Goodbye! Have a nice day!",
  "what is your name": "I am your friendly chatbot!",
  "help": "I am here to help! How can I assist you?",
  "thank you": "You're welcome! Let me know if you need anything else.",
  "good morning": "Good morning! How can I assist you today?",
  "good evening": "Good evening! How can I help you?",
  "how old are you": "I don't have an age, I'm a chatbot here to assist you!",
  "what can you do": "I can answer your questions, help you with tasks, and much more! Just ask me anything.",
  "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
  "what is the weather": "I don't have real-time weather data, but you can check a weather app or website for the latest updates.",
  "who are you": "I'm a chatbot created to assist you with any questions or tasks.",
  "what time is it": "I don't have access to the current time, but you can check your device for the time.",
  "sorry": "No problem at all! Let me know how I can assist you.",
  "thank you for your help": "You're very welcome! I'm always here to help.",
};

// API to save messages
app.post("/messages", (req, res) => {
  const { userMessage } = req.body;

  // Match user message with predefined bot templates
  const botMessage = botTemplates[userMessage.toLowerCase()] || "I'm currently under maintenance, please try again later.";

  const query = "INSERT INTO messages (user_message, bot_message) VALUES (?, ?)";
  db.query(query, [userMessage, botMessage], (err, result) => {
    if (err) throw err;
    res.send({ message: "Message saved!" });
  });
});

// API to fetch messages
app.get("/messages", (req, res) => {
  const query = "SELECT * FROM messages";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
