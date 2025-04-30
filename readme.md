React Tauri Chat with Abort Feature for Ollama LLM Model
This project provides a simple chat interface using React and Tauri that allows users to interact with a local Ollama Large Language Model (LLM). The app has features to send messages to the LLM, display responses, and abort a long-running request if needed.

![tauri-app](tauri_chat_with_local_ai/docs/img/programphoto.png)

Features
Chat Interface: A simple interface for sending messages to a host LLM model.

Abort Request: Users can abort the LLM request if the response takes too long.

Tauri Integration: A local backend using Tauri to invoke Rust functions and interact with the LLM.

Tech Stack
Frontend: React

Backend: Tauri (Rust)

LLM: Ollama (Local LLM Model)

Getting Started
Follow the steps below to set up and run the project locally.

Prerequisites
Node.js: Ensure that you have Node.js (version 16 or higher) installed.

Rust: You need Rust installed for Tauri integration. Follow the Rust installation guide to get Rust up and running.

Tauri CLI: Install the Tauri CLI by running the following command:

bash
Copy
Edit
cargo install tauri-cli
Ollama Model: Ensure you have Ollama installed and running locally for the LLM interaction.

Install Dependencies
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
Install the frontend dependencies:

bash
Copy
Edit
cd frontend
npm install
Install Tauri dependencies:

bash
Copy
Edit
cd ..
tauri dev
Running the Application
Start the development environment:

bash
Copy
Edit
tauri dev
Open the application in your browser and you should be able to interact with the LLM via the chat interface. You can also click "Abort" to cancel a long-running request.

Usage
Ask AI: Type a message in the input box and click "Send". The message will be sent to the local LLM model and the response will be displayed.

Abort Request: If the request takes too long (for example, the response takes more than 10 minutes), you can click "Abort" to cancel the request.