import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  computed,
  hasMany,
  hasOne,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { randomUUID } from 'node:crypto'
import Statistic from '#models/statistic'
import Role from '#models/role'
import type { HasOne, HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Question from './question.js'
import Roles from '#enums/Roles'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @beforeCreate()
  static assignUuid(user: User) {
    user.uuid = randomUUID()
  }

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare bio: string | null

  @column()
  declare bannedUntil: DateTime | null

  @attachment({ folder: 'avatars', preComputeUrl: true })
  declare avatar: Attachment

  @computed()
  public get avatarUrl() {
    if (this.avatar) {
      return this.avatar.url
    }
    const eyesVariant = 'variant2W10,variant3W10,variant4W10,variant5W14,variant9W10'
    const mouthVariant = 'variant1,variant2,variant3'
    const shapeColors = '0a5b83,1c799f,69d2e7'
    const backgroundColors = 'b6e3f4,c0aede,d1d4f9,ffd5dc'
    return `https://api.dicebear.com/9.x/thumbs/svg?seed=${this.uuid}&scale=100&size=80&backgroundColor=${backgroundColors}&eyes=${eyesVariant}&mouth=${mouthVariant}&shapeColor=${shapeColors}`
  }

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  @computed()
  public get timeUntilNextSuggestion() {
    if (!this.suggestedQuestions || this.isAdmin) return 0
    const recentQuestion = this.suggestedQuestions.reduce((latest, current) => {
      return latest.createdAt > current.createdAt ? latest : current
    })

    const unlockTime = recentQuestion.createdAt.plus({ hours: 12 })

    if (unlockTime < DateTime.now()) return 0

    return Math.ceil(unlockTime.diff(DateTime.now(), 'hours').hours)
  }

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasOne(() => Statistic)
  declare statistic: HasOne<typeof Statistic>

  @hasMany(() => Question)
  declare suggestedQuestions: HasMany<typeof Question>
}
