import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Proposals extends BaseSchema {
  protected tableName = 'proposals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table
        .integer('professor_id')
        .unsigned()
        .references('id')
        .inTable('professors')
        .onDelete('CASCADE')
      table.string('title')
      table.integer('research_area_id').unsigned().references('id').inTable('research_areas')
      table.string('description')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
