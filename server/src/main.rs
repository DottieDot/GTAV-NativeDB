mod game;
mod native_service;

use std::{env, sync::Arc};

use axum::{
  extract::{Host, Path, State},
  http::StatusCode,
  response::{Html, IntoResponse},
  routing::get,
  Router
};
use tower_http::services::{ServeDir, ServeFile};

use self::{game::Game, native_service::NativeService};

struct NativeData {
  gta5: NativeService,
  rdr3: NativeService
}

#[derive(Clone)]
struct AppState {
  natives: Arc<NativeData>
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  let spa_directory = env::var("SPA_DIR").unwrap_or_else(|_| "../build".to_owned());

  let serve_dir = ServeDir::new(&spa_directory)
    .not_found_service(ServeFile::new(format!("{spa_directory}/index.html")));

  let state = AppState {
    natives: Arc::new(NativeData {
      gta5: NativeService::new(Game::Gta5).await?,
      rdr3: NativeService::new(Game::Rdr3).await?
    })
  };

  let app = Router::new()
    .route("/gta5/natives/:native", get(serve_gta5_native))
    .route("/rdr3/natives/:native", get(serve_rdr3_native))
    .fallback_service(serve_dir)
    .with_state(state);

  let host = env::var("NDB_HOST").unwrap_or_else(|_| "0.0.0.0".to_owned());
  let port = env::var("NDB_PORT").unwrap_or_else(|_| "3000".to_owned());

  axum::Server::bind(&format!("{host}:{port}").parse()?)
    .serve(app.into_make_service())
    .await?;

  Ok(())
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
