// Importing necessary modules
const express = require("express");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Creating an instance of Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Model initialization
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

// Arrays to maintain the history of the conversation
const conversationContext = [];
const currentMessages = [];

// Controller function to handle chat conversation
app.post("/generate-response", async (req, res) => {
    try {
        // Check if 'req.body' exists and if 'prompt' property is present
        console.log(req.body);
        if (!req.body || !req.body.prompt) {
            return res.status(400).json({ message: "Prompt is missing in request body" });      
        }
        const { prompt } = req.body;
    // Restore the previous context
    for (const [inputText, responseText] of conversationContext) {
      currentMessages.push({ role: "user", parts: inputText });
      currentMessages.push({ role: "model", parts: responseText });
    }

    // Start a chat with the model
    const chat = model.startChat({
      history: currentMessages,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    // Send a message to the model and get the response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Store the conversation
    conversationContext.push([prompt, responseText]);
    res.send({ response: responseText });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
