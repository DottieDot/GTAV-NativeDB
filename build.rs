#![feature(exit_status_error)]

use std::process::Command;

#[cfg(windows)]
pub const NPM: &'static str = "npm.cmd";

#[cfg(not(windows))]
pub const NPM: &'static str = "npm";

fn main() {
  if !cfg!(debug_assertions) {
    Command::new(NPM)
      .arg("install")
      .current_dir("spa")
      .spawn()
      .unwrap()
      .wait()
      .unwrap()
      .exit_ok()
      .unwrap();
    Command::new(NPM)
      .arg("run")
      .arg("build")
      .current_dir("spa")
      .spawn()
      .unwrap()
      .wait()
      .unwrap()
      .exit_ok()
      .unwrap();
  }
}
