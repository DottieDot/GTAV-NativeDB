#![feature(exit_status_error)]

use std::process::Command;

#[cfg(windows)]
pub const NPM: &'static str = "npm.cmd";

#[cfg(not(windows))]
pub const NPM: &'static str = "npm";

fn main() {
  println!("cargo:rerun-if-changed=build.rs");
  println!("cargo:rerun-if-changed=../src");
  println!("cargo:rerun-if-changed=../wasm-lib");
  println!("cargo:rerun-if-changed=../package.json");
  println!("cargo:rerun-if-changed=../package-lock.json");

  if !cfg!(debug_assertions) {
    Command::new(NPM)
      .arg("install")
      .current_dir("..")
      .spawn()
      .unwrap()
      .wait()
      .unwrap()
      .exit_ok()
      .unwrap();
    Command::new(NPM)
      .arg("run")
      .arg("build")
      .current_dir("..")
      .spawn()
      .unwrap()
      .wait()
      .unwrap()
      .exit_ok()
      .unwrap();
  }
}
