use headless_chrome::{Browser, LaunchOptions};

use crate::native_service::Native;

pub struct NativePreviewService {
  browser: Browser
}

impl NativePreviewService {
  pub fn new() -> anyhow::Result<Self> {
    let options = LaunchOptions::default_builder().headless(true).build()?;

    Ok(Self {
      browser: Browser::new(options)?
    })
  }

  pub fn create_for_native(&self, native: Native) -> anyhow::Result<Vec<u8>> {
    let tab = self.browser.new_tab()?;

    let html = include_str!("./native_preview_service/preview.html");
    let json = serde_json::to_string(&native)?;

    let js = &format!(
      r#"
        (function() {{
        globalThis.native = {};
        let html = {};
        
        document.open();
        document.write(html);
        document.close();
        }})()
        "#,
      json,
      serde_json::to_string(&html)?
    );

    tab.evaluate(js, false)?;
    let png = tab.wait_for_element(".container")?.capture_screenshot(
      headless_chrome::protocol::cdp::Page::CaptureScreenshotFormatOption::Png
    )?;

    tab.close(false)?;

    Ok(png)
  }
}
