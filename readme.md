🧠 React + Tauri Chat Interface with Abort Support for Ollama LLM
This project provides a lightweight desktop chat application built with React and Tauri, designed to interact with a local Ollama Large Language Model (LLM). It supports real-time messaging and the ability to cancel long-running requests.

![Easy Chat](https://raw.githubusercontent.com/otterdev0341/tauri_chat_with_local_ai/main/docs/p1.png)

⚙️ Configuration Notes
Before running the project, you must configure it correctly:

src-tauri/.env
Set your correct local address (e.g., http://127.0.0.1:11434) using either IPv4 or IPv6.

src-tauri/src/lib.rs

Implement the LlmVariant enum and to_str() function to match your local model.

Modify the talk_with_ai() function to use your custom model.

Run Process:
npm install 
npm run tauri dev

🚀 Features
🗨️ Chat Interface: Simple UI for sending messages to the local LLM.

⛔ Abort Request: Abort long-running LLM responses.

🦀 Tauri Integration: Desktop app powered by Rust backend.

🧰 Tech Stack
Frontend: React

Backend: Tauri (Rust)

LLM Engine: Ollama (runs locally)

📦 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)

Rust

Tauri CLI
Install it with:

bash
Copy
Edit
cargo install tauri-cli
Ollama installed and running locally

🔧 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/otterdev0341/tauri_chat_with_local_ai.git
cd tauri_chat_with_local_ai
Install frontend dependencies:

bash
Copy
Edit
cd frontend
npm install
Run the app:

bash
Copy
Edit
cd ..
tauri dev
💡 Usage
Send a Message: Type in the chat input and press Enter or click Send.

Abort Request: If the LLM is taking too long, click the Abort button to cancel the request.