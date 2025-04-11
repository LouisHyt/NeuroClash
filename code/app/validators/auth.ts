import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{field}} field is required.',
  'email': 'The value is not a valid email.',

  'password.confirmed': 'The passwords do not match.',
  'username.minLength': 'The username must be at least 3 characters.',
  'username.maxLength': 'The username must be at most 20 characters.',
})

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .maxLength(20)
      .minLength(3)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(8).confirmed({
      confirmationField: 'confirm_password',
    }),
    confirm_password: vine.string().trim(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim(),
  })
)
