import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('name').notNullable()
      table.json('image').nullable().defaultTo(null)
      table.uuid('user_uuid').nullable().references('users.uuid').onDelete('SET NULL')
      table.integer('theme_id').nullable().unsigned().references('themes.id').onDelete('SET NULL')
      table
        .integer('difficulty_id')
        .nullable()
        .unsigned()
        .references('difficulties.id')
        .onDelete('SET NULL')
      table.boolean('is_approved').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
