import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ranks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable().unique()
      table.integer('elo_required').notNullable()
      table.json('icon_url').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          name: 'Bronze',
          elo_required: 500,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Silver',
          elo_required: 900,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gold',
          elo_required: 1200,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Platinium',
          elo_required: 1500,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diamond',
          elo_required: 1800,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Master',
          elo_required: 2100,
          icon_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
