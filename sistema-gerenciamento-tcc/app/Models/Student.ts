import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Proposal from './Proposal'
import Tcc from './Tcc'
import User from './User'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public registrationNumber: String

  @belongsTo(() => Tcc)
  public tcc: BelongsTo<typeof Tcc>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => Proposal)
  public proposals: ManyToMany<typeof Proposal>

  @column()
  public tccId: number
}
