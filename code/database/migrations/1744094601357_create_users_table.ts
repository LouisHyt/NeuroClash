import Roles from '#enums/Roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').notNullable().primary()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(Roles.USER)
      table.string('username', 20).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('bio', 175).nullable().defaultTo(null)
      table.boolean('has_penalty').notNullable().defaultTo(false)
      table.datetime('banned_until').nullable().defaultTo(null)
      table.json('avatar').nullable().defaultTo(null)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
