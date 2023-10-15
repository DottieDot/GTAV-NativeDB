mod external;
mod native;

use std::{collections::HashMap, sync::Arc, time::Duration};

pub use native::*;
use tokio::sync::RwLock;

use crate::game::Game;

use self::external::alloc8or;

pub struct NativeService {
  game:    Game,
  natives: Arc<RwLock<HashMap<String, Native>>>
}

impl NativeService {
  pub async fn new(game: Game) -> anyhow::Result<Self> {
    let natives = Arc::new(RwLock::new(load_natives(game).await?));

    let result = Self { game, natives };
    result.monitor();

    Ok(result)
  }

  pub async fn native(&self, hash: &String) -> Option<Native> {
    self.natives.read().await.get(hash).cloned()
  }

  fn monitor(&self) {
    let game = self.game;
    let natives = self.natives.clone();
    tokio::spawn(async move {
      loop {
        tokio::time::sleep(Duration::from_secs(3_600 /* 1 hour */)).await;
        if let Ok(new_natives) = load_natives(game).await {
          *natives.write().await = new_natives;
        }
      }
    });
  }
}

async fn load_natives(game: Game) -> anyhow::Result<HashMap<String, Native>> {
  let url = match game {
    Game::Gta5 => {
      "https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json"
    }
    Game::Rdr3 => {
      "https://raw.githubusercontent.com/alloc8or/rdr3-nativedb-data/master/natives.json"
    }
  };

  let root = reqwest::get(url)
    .await?
    .json::<alloc8or::DocumentRoot>()
    .await?;

  let data = root
    .into_iter()
    .flat_map(|(namespace, natives)| {
      natives.into_iter().map(move |(hash, native)| {
        (
          hash.clone(),
          Native {
            name: native.name,
            hash,
            namespace: namespace.clone(),
            jhash: native.jhash,
            comment: native.comment,
            params: native
              .params
              .into_iter()
              .map(|param| {
                NativeParam {
                  ty:   param.ty,
                  name: param.name
                }
              })
              .collect(),
            return_type: native.return_type,
            build: native.build
          }
        )
      })
    })
    .collect();

  Ok(data)
}
