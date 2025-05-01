import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Theme from '#models/theme'
import Answer from '#models/answer'
import Difficulty from '#models/difficulty'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userUuid: string

  @column()
  declare themeId: number

  @column()
  declare difficultyId: number

  @column()
  declare name: string

  @attachment({ folder: 'questions' })
  declare image: Attachment | null

  @column()
  declare isApproved: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @belongsTo(() => Theme)
  declare theme: BelongsTo<typeof Theme>

  @belongsTo(() => Difficulty)
  declare difficulty: BelongsTo<typeof Difficulty>

  @hasMany(() => Answer)
  declare answers: HasMany<typeof Answer>
}
