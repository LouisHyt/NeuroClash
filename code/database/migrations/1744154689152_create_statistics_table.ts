import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'statistics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_uuid').notNullable().references('users.uuid').onDelete('CASCADE')
      table.integer('victories').unsigned().notNullable().defaultTo(0)
      table.integer('losses').unsigned().notNullable().defaultTo(0)
      table.integer('questions_correct').unsigned().notNullable().defaultTo(0)
      table.integer('questions_failed').unsigned().notNullable().defaultTo(0)
      table.integer('streak').unsigned().notNullable().defaultTo(0)
      table.integer('total_games').unsigned().notNullable().defaultTo(0)
      table.integer('elo').unsigned().notNullable().defaultTo(600)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
