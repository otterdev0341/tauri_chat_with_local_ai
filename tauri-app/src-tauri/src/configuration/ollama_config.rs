use std::{default, env};

use dotenv::dotenv;

pub struct OllamaConfig{
    pub host: String,
    pub port: u16
}

impl OllamaConfig {
    pub fn inject_env() -> Self {
        dotenv().ok();
        let host = std::env::var("OLAMA_URL").unwrap();
        let port = std::env::var("OLAMA_PORT").unwrap().parse().unwrap();
        Self { host: host, port: port }
    }
}