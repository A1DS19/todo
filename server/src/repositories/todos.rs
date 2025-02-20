use crate::entities::{prelude::*, todo};
use actix_web::web::Json;
use log::debug;
use sea_orm::{DatabaseConnection, EntityTrait, Set, ActiveValue::NotSet};
use sea_orm::{entity::*, query::*, DeriveEntityModel, DeleteResult};
use sea_orm_migration::seaql_migrations::ActiveModel;
use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct TodoRequest {
    pub title: String,
    pub completed: bool
}

#[derive(Clone, Debug)]
pub struct TodoRepository {
    pub db: DatabaseConnection
}

impl TodoRepository {
    pub async fn get(&self) -> Vec<todo::Model> {
        Todo::find().all(&self.db).await.expect("failed to get todos")
    }
    pub async fn get_by_id(&self, id:i32) -> Option<todo::Model> {
        Todo::find_by_id(id).one(&self.db).await.expect("failed to get todo")
    }
    pub async fn create(&self, request:Json<TodoRequest>) -> Option<todo::Model> {
        let todo = todo::ActiveModel {
            id: NotSet,
            title: ActiveValue::Set(request.title.to_owned()),
            completed: ActiveValue::Set(request.completed.to_owned())
        };
        let todo: todo::Model = todo.insert(&self.db).await.unwrap();
        debug!("Created todo {}", todo.title);
        todo.into()
    }
    pub async fn update(&self, id:i32, request:Json<TodoRequest>) -> Option<todo::Model> {
       let mut todo: todo::ActiveModel = self.get_by_id(id).await.unwrap().into();
        todo.title = ActiveValue::Set(request.title.to_owned());
        todo.completed = ActiveValue::Set(request.completed.to_owned());
        let todo: todo::Model = todo.update(&self.db).await.unwrap();
        debug!("todo {} updated", todo.title);
        todo.into()
    }
    pub async fn delete(&self, id:i32) -> DeleteResult {
        Todo::delete_by_id(id).exec(&self.db).await.unwrap().into()
    }
}
