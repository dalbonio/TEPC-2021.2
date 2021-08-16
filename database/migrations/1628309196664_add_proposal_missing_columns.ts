import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tccs extends BaseSchema {
  protected tableName = 'tccs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('resumo')
      table.integer('research_area_id').unsigned().references('id').inTable('research_areas')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('resumo')
      table.dropColumn('research_area_id')
    })
  }
}
