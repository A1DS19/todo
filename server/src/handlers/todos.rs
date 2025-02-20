use crate::{entities::todo::Model as TodoModel, repositories::todos::TodoRequest, AppState};
use actix_web::{delete, get, post, put, web::{self, Json}, Error as ActixError, HttpResponse, Responder, Result as ActixResult, Scope};
use log::debug;
use sea_orm::{DeleteResult};
use serde_json::json;

#[get("")]
async fn get(state:web::Data<AppState>) -> ActixResult<impl Responder, ActixError> {
    let todos = state.todos_repo.get().await;
    Ok(web::Json(json!({ "result":todos })))
}

#[get("/{id}")]
async fn get_by_id(state:web::Data<AppState>, id:web::Path<i32>) -> ActixResult<impl Responder, ActixError> {
    let todos = state.todos_repo.get_by_id(id.into_inner()).await;
    Ok(web::Json(json!({ "result":todos })))
}

#[post("")]
async fn create(state:web::Data<AppState>, request:Json<TodoRequest>) -> ActixResult<impl Responder, ActixError> {
    let todos = state.todos_repo.create(request).await;
     Ok(web::Json(json!({ "result":todos })))
}

#[put("/{id}")]
async fn update(state:web::Data<AppState>, id: web::Path<i32>, request:Json<TodoRequest>) -> ActixResult<impl Responder, ActixError> {
    let todos = state.todos_repo.update(id.into_inner(), request).await;
    Ok(web::Json(json!({ "result":todos })))
}

#[delete("/{id}")]
async fn delete(state:web::Data<AppState>, id: web::Path<i32>) -> ActixResult<impl Responder, ActixError> {
    let todos = state.todos_repo.delete(id.into_inner()).await;
    Ok(web::Json(json!({ "result": todos.rows_affected })))
}

pub fn todos_handler() -> Scope {
    web::scope("/todos")
        .service(get)
        .service(get_by_id)
        .service(create)
        .service(update)
        .service(delete)
}
