pub use sea_orm_migration::prelude::*;

mod m20250219_154819_create_to_do_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250219_154819_create_to_do_table::Migration),
        ]
    }
}
