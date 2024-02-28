# Chatbot Using Google Generative AI

This repository contains code for a chatbot implemented using Google's Generative AI model. The chatbot is built using Express.js and utilizes Google's Generative AI API for generating responses.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your Google Generative AI API key as follows:
   ```
   API_KEY=your_api_key_here
   ```
4. Start the server using `npm start`.
5. The server will be running on `localhost:3000`.

## Usage

To use the chatbot, send a POST request to `localhost:3000/generate-response` with a JSON body containing the `prompt` for the conversation. The chatbot will generate a response based on the prompt and return it in the response.

Example request:
```json
{
  "prompt": "Hello, how are you?"
}
```

Example response:
```json
{
  "response": "I'm doing well, thank you for asking."
}
```

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and use the code as per the terms of the license.

---

Feel free to contribute to this project by submitting issues or pull requests. If you have any questions or suggestions, please open an issue. Thank you!