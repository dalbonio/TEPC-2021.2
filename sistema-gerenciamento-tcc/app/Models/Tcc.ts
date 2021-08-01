import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
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

  @hasMany(() => Student)
  public students: HasMany<typeof Student>

  @hasOne(() => ResearchArea)
  public research_area: HasOne<typeof ResearchArea>

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @column()
  public denied: boolean
}
