mod game;
mod native_preview_service;
mod native_service;

use std::sync::Arc;

use axum::{
  extract::{Host, Path, State},
  http::StatusCode,
  response::{Html, IntoResponse},
  routing::get,
  Router
};
use reqwest::header;
use tower_http::services::{ServeDir, ServeFile};

use self::{
  game::Game, native_preview_service::NativePreviewService, native_service::NativeService
};

struct NativeData {
  gta5: NativeService,
  rdr3: NativeService
}

#[derive(Clone)]
struct AppState {
  natives:  Arc<NativeData>,
  previews: Arc<NativePreviewService>
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  let serve_dir =
    ServeDir::new("../build").not_found_service(ServeFile::new("../build/index.html"));

  let state = AppState {
    natives:  Arc::new(NativeData {
      gta5: NativeService::new(Game::Gta5).await?,
      rdr3: NativeService::new(Game::Rdr3).await?
    }),
    previews: Arc::new(NativePreviewService::new()?)
  };

  let app = Router::new()
    .route("/gta5/natives/:native", get(serve_gta5_native))
    .route("/rdr3/natives/:native", get(serve_rdr3_native))
    .route("/previews/gta5/natives/:native", get(serve_gta5_preview))
    .fallback_service(serve_dir)
    .with_state(state);

  axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
    .serve(app.into_make_service())
    .await?;

  Ok(())
}

async fn serve_gta5_preview(
  State(state): State<AppState>,
  Path(native_hash): Path<String>
) -> Result<impl IntoResponse, StatusCode> {
  serve_preview(Game::Gta5, state, native_hash).await
}

async fn serve_preview(
  game: Game,
  state: AppState,
  native_hash: String
) -> Result<impl IntoResponse, StatusCode> {
  let native_hash = native_hash.trim_end_matches(".png").to_owned();

  let native_service = match game {
    Game::Gta5 => &state.natives.gta5,
    Game::Rdr3 => &state.natives.rdr3
  };

  let Some(native) = native_service.native(&native_hash).await else {
    return Err(StatusCode::NOT_FOUND);
  };
  let png = match state.previews.create_for_native(native) {
    Ok(png) => png,
    Err(e) => {
      println!("ERROR!: {e:#?}");
      return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }
  };

  Ok((
    axum::response::AppendHeaders([(header::CONTENT_TYPE, "image/png")]),
    png
  ))
}

async fn serve_gta5_native(
  Host(hostname): Host,
  State(state): State<AppState>,
  Path(native_hash): Path<String>
) -> Result<impl IntoResponse, StatusCode> {
  serve_native(Game::Gta5, hostname, state, native_hash).await
}

async fn serve_rdr3_native(
  Host(hostname): Host,
  State(state): State<AppState>,
  Path(native_hash): Path<String>
) -> Result<impl IntoResponse, StatusCode> {
  serve_native(Game::Rdr3, hostname, state, native_hash).await
}

async fn serve_native(
  game: Game,
  hostname: String,
  state: AppState,
  native_hash: String
) -> Result<impl IntoResponse, StatusCode> {
  let index = load_index();

  let native_service = match game {
    Game::Gta5 => &state.natives.gta5,
    Game::Rdr3 => &state.natives.rdr3
  };

  let title = match game {
    Game::Gta5 => "GTA5 Native Reference",
    Game::Rdr3 => "RDR3 Native Reference"
  };

  let game_path = match game {
    Game::Gta5 => "gta5",
    Game::Rdr3 => "rdr3"
  };

  let Some(native) = native_service.native(&native_hash).await else {
    return Err(StatusCode::NOT_FOUND);
  };

  let url = format!("{hostname}/{game_path}/natives/{native_hash}");
  let image_url = format!("{hostname}/previews/{game_path}/natives/{native_hash}.png");

  let with_meta = index.replace(
    r#"<meta name="OG_SLOT">"#,
    &[
      format!("<meta property=\"og:title\" content=\"{}\">", native.name),
      "<meta property=\"og:type\" content=\"website\">".to_string(),
      format!(
        "<meta property=\"og:site_name\" content=\"{title} | {}\">",
        native.namespace
      ),
      format!("<meta property=\"og:url\" content=\"{url}\">"),
      format!(
        "<meta property=\"og:description\" content=\"{}\">",
        native.comment
      ),
      format!("<meta property=\"og:image\" content=\"{image_url}\">"),
      r#"<meta name="twitter:card" content="summary_large_image">"#.to_string()
    ]
    .join("")
  );

  Ok(Html(with_meta))
}

fn load_index() -> &'static str {
  let index = include_str!("../../build/index.html");

  index
}
