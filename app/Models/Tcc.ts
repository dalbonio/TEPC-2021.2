import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Professor from './Professor'
import ResearchArea from './ResearchArea'

export default class Tcc extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public resumo: string

  @column()
  public abstract: string

  @column()
  public filename: string

  @column()
  public file_content: Buffer

  @hasMany(() => Student)
  public students: HasMany<typeof Student>

  @column()
  public researchAreaId: number

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @belongsTo(() => ResearchArea)
  public researchArea: BelongsTo<typeof ResearchArea>

  @column()
  public professorId: number

  @column()
  public accepted: boolean
}
