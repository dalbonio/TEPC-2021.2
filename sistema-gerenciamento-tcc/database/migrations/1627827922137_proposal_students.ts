import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProposalStudents extends BaseSchema {
  protected tableName = 'proposal_students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
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
