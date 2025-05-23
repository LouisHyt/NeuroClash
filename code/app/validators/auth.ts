import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{field}} field is required.',
  'email': 'The value is not a valid email.',

  'password.confirmed': 'The passwords do not match.',
  'password.minLength': 'The password must be at least 12 characters.',
  'password.regex':
    'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
  'username.minLength': 'The username must be at least 3 characters.',
  'username.maxLength': 'The username must be at most 20 characters.',
  'approve_conditions.accepted': 'You must accept the terms and conditions.',
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
    password: vine
      .string()
      .trim()
      .minLength(12)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=;:'"\|,.?/+_]).{12,}$/)
      .confirmed({
        confirmationField: 'confirm_password',
      }),
    confirm_password: vine.string().trim(),
    approve_conditions: vine.accepted(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim(),
    remember_me: vine.boolean(),
  })
)
