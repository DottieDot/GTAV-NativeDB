use serde::Serialize;

#[derive(Clone, Serialize)]
pub struct Native {
  pub name:        String,
  pub namespace:   String,
  pub hash:        String,
  pub jhash:       Option<String>,
  pub comment:     String,
  pub params:      Vec<NativeParam>,
  pub return_type: String,
  pub build:       String
}

#[derive(Clone, Serialize)]
pub struct NativeParam {
  #[serde(rename(serialize = "type"))]
  pub ty:   String,
  pub name: String
}
