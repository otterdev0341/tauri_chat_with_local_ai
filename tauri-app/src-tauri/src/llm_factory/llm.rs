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