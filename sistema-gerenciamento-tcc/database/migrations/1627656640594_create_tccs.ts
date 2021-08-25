import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tccs extends BaseSchema {
  protected tableName = 'tccs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('professor_id').unsigned().references('id').inTable('professors')
      table.boolean('accepted').notNullable()
      table.binary('file_content')
      table.string('filename')
      table.text('resumo')
      table.text('abstract')
      table.integer('research_area_id').unsigned().references('id').inTable('research_areas')
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
