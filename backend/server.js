require("dotenv").config({
    path: __dirname + "/.env"
});

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Starting CyberShield AI...");

console.log(
    "API key loaded:",
    process.env.OPENAI_API_KEY ? "YES" : "NO"
);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("CyberShield AI Backend is Running!");
});

app.post("/analyze", async (req, res) => {

    const message = req.body.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            threat: "Unknown",
            type: "Unknown",
            explanation: "No message was provided.",
            advice: "Please enter a message."
        });
    }

    try {

        console.log("Analyzing message with AI...");

        const response = await client.responses.create({

            model: "gpt-6-luna",

            instructions: `
You are CyberShield AI, a cybersecurity assistant.

Analyze the message provided by the user.

Look for signs of:
- phishing
- scams
- social engineering
- credential theft
- financial fraud
- suspicious requests
- malicious links
- urgency or pressure tactics

Return the answer exactly in this format:

Threat: High / Medium / Low
Type: short threat category
Explanation: short explanation
Advice: practical safety advice

Do not say a message is definitely malicious unless
there is strong evidence.
`,

            input: message
        });

        const aiText = response.output_text;

        console.log("AI RESPONSE:");
        console.log(aiText);

        const threatMatch = aiText.match(/Threat:\s*(.*)/i);
        const typeMatch = aiText.match(/Type:\s*(.*)/i);

        const explanationMatch = aiText.match(
            /Explanation:\s*([\s\S]*?)(?=\nAdvice:|$)/i
        );

        const adviceMatch = aiText.match(
            /Advice:\s*([\s\S]*)/i
        );

        res.json({
            threat: threatMatch
                ? threatMatch[1].trim()
                : "Unknown",

            type: typeMatch
                ? typeMatch[1].trim()
                : "Unknown",

            explanation: explanationMatch
                ? explanationMatch[1].trim()
                : aiText,

            advice: adviceMatch
                ? adviceMatch[1].trim()
                : "Be careful with unknown messages."
        });

    } catch (error) {

        console.error("AI ERROR:");
        console.error(error);

        res.status(500).json({
            threat: "Unknown",
            type: "AI Connection Error",
            explanation: "CyberShield could not connect to the AI service.",
            advice: "Check your API key and AI service."
        });
    }
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `CyberShield AI server running on port ${PORT}`
    );
});

server.on("error", (error) => {
    console.error("SERVER ERROR:");
    console.error(error);
});