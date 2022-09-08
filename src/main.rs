use std::io::Read;

use actix_web::{
  dev::{ServiceRequest, ServiceResponse},
  get, web, App, HttpServer, Responder, HttpResponse
};

async fn spa_handler(req: ServiceRequest) -> Result<ServiceResponse, actix_web::Error> {
  let (http_req, _payload) = req.into_parts();

  let response = actix_files::NamedFile::open("./spa/build/index.html")?.into_response(&http_req);
  Ok(ServiceResponse::new(http_req, response))
}

#[get("/natives/{native}")]
async fn native_page_handler(native: web::Path<String>) -> actix_web::Result<impl Responder> {
  let mut file = actix_files::NamedFile::open("./spa/build/index.html")?;

  let mut html = String::default();
  file.read_to_string(&mut html)?;

  let og_tags = vec![
    format!("<title>{native}</title>"),
    format!("<meta property=\"og:title\" content=\"{native}\" />"),
    "<meta property=\"og:site_name\" content=\"GTA V NativeDB\" />".to_owned(),
    "<meta property=\"og:type\" content=\"website\" />".to_owned()
  ];

  let result = html.replace("<og-tags/>", &og_tags.join(""));

  Ok(HttpResponse::Ok().body(result))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  HttpServer::new(|| {
    App::new()
      .service(native_page_handler)
      .service(
        actix_files::Files::new("/", "./spa/build")
          .index_file("index.html")
          .default_handler(spa_handler)
      )
  })
  .bind(("127.0.0.1", 8080))?
  .run()
  .await
}
