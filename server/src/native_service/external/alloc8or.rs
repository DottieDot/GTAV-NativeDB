use std::collections::HashMap;

use serde::Deserialize;

pub type DocumentRoot = HashMap<String, Namespace>;

pub type Namespace = HashMap<String, Native>;

#[derive(Deserialize, Clone)]
pub struct Native {
  pub name:        String,
  pub jhash:       Option<String>,
  pub comment:     String,
  pub params:      Vec<NativeParam>,
  pub return_type: String,
  pub build:       String
}

#[derive(Deserialize, Clone)]
pub struct NativeParam {
  #[serde(alias = "type")]
  pub ty:   String,
  pub name: String
}
