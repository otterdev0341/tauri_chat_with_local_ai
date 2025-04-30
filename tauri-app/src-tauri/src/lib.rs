
use std::{default, env};
use ollama_rs::Ollama;
use ollama_rs::generation::chat::ChatMessage;
use ollama_rs::coordinator::Coordinator;
use dotenv::dotenv;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            talk_with_ai])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[tauri::command]
async fn talk_with_ai(message: String) -> String {
    
    dotenv::dotenv();
    let ollama_config = OllamaConfig::inject_env();
    let ollama = Ollama::new(ollama_config.host, ollama_config.port);
    let history = vec![];
    let tools = ollama_rs::tool_group![];

    let mut cordinator = Coordinator::new_with_tools(
        ollama,
        LlmVariant::SupachaiTyphoon.to_str(),
        history,
        tools,
    );
    
    let ur_chat_message = ChatMessage::user(message.to_owned());
    let resp = cordinator.chat(vec![ur_chat_message]).await.unwrap();
    let extract_result = resp.message.content;
    extract_result
}


pub struct OllamaConfig {
    pub host: String,
    pub port: u16,
}

impl OllamaConfig {
    pub fn inject_env() -> Self {
        dotenv().ok();

        let host = env::var("OLAMA_URL")
            .expect("Environment variable OLAMA_URL is not set. Please define it in your .env file or environment.");

        let port_str = env::var("OLAMA_PORT")
            .expect("Environment variable OLAMA_PORT is not set. Please define it in your .env file or environment.");

        let port = port_str
            .parse::<u16>()
            .expect("Environment variable OLAMA_PORT must be a valid u16 integer.");

        Self { host, port }
    }
}

pub enum LlmVariant {
    SupachaiTyphoon,
    MistralSmall,
    SqlCoder,
    TinyLlama
}

impl LlmVariant {
        pub fn to_str(&self) -> String {
            match self {
                Self::SupachaiTyphoon => "supachai/llama-3-typhoon-v1.5:latest".to_owned(),
                Self::MistralSmall => "mistral-small:latest".to_owned(),
                Self::SqlCoder => "sqlcoder:7b".to_owned(),
                Self::TinyLlama => "tinyllama:latest".to_owned()
            }
        }
}