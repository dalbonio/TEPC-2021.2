import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Trabalhos extends BaseSchema {
  protected tableName = 'tccs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('professor_id').unsigned().references('id').inTable('professors')
      table.boolean('accepted').notNullable()
      table.binary('file_content')
      table.string('filename')

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
