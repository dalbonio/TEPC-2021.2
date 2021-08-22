import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Tcc from './Tcc'

export default class ResearchArea extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Tcc)
  public tccs: HasMany<typeof Tcc>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: String
}
