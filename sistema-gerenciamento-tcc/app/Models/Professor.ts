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
} from '@ioc:Adonis/Lucid/Orm'
import Proposal from './Proposal'
import User from './User'

export default class Professor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Proposal)
  public proposals: HasMany<typeof Proposal>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId: number
}
