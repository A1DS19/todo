pub mod handlers;
pub mod repositories;
pub mod entities;

use dotenv::dotenv;
use repositories::prelude::*;
use handlers::prelude::*;
use actix_web::{web::{self, Data}, App, HttpServer, middleware, http};
use sea_orm::DatabaseConnection;
use std::env;
use actix_cors::Cors;
use log::info;

#[derive(Debug, Clone)]
pub struct AppState {
    pub todos_repo: TodoRepository,
}

#[actix_web::main]
async fn main() -> std::io::Result<()>{
    std::env::set_var("RUST_LOG", "debug");
    dotenv::dotenv().ok();
    env_logger::init();
    let db_url = std::env::var("DATABASE_URL").expect("database url must be set");
    let db_conn = sea_orm::Database::connect(db_url).await.expect("database connection failed");
    let host = std::env::var("HOST").expect("host must be set");
    let port = std::env::var("PORT").expect("port must be set");
    let server_url = format!("{}:{}", host, port);
    let todos_repo = TodoRepository {
        db: db_conn.clone()
    };
    let state = AppState {
        todos_repo
    };
    let server = HttpServer::new(move || {
    let cors = Cors::default()
              .allowed_origin("http://localhost:1212")
              .allowed_methods(vec!["GET", "POST", "DELETE", "POST", "PUT"])
              .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
              .allowed_header(http::header::CONTENT_TYPE)
              .max_age(3600);

        App::new()
        .app_data(Data::new(state.clone()))
        .wrap(cors)
        .wrap(middleware::Logger::default())
        .configure(config)    
    }).bind(&server_url)?;
    info!("server running on {}", server_url);
    server.run().await?;
    Ok(())
}

fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(todos_handler());
}
