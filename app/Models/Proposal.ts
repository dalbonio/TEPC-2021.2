import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import ResearchArea from './ResearchArea'
import Professor from './Professor'

export default class Proposal extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Student)
  public students: ManyToMany<typeof Student>

  @belongsTo(() => ResearchArea)
  public researchArea: BelongsTo<typeof ResearchArea>

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @column()
  public professorId: number

  @column()
  public description: String

  @column()
  public title: String

  @column()
  public researchAreaId: number
}
