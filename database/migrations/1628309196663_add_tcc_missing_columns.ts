import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tccs extends BaseSchema {
  protected tableName = 'tccs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('title')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('title')
    })
  }
}
