import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Statistic extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userUuid: string

  @column()
  declare victories: number

  @column()
  declare losses: number

  @column()
  declare questionsCorrect: number

  @column()
  declare questionsFailed: number

  @column()
  declare totalGames: number

  @column()
  declare streak: number

  @column()
  declare elo: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
