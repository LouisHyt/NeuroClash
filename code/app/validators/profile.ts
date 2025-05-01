import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{field}} field is required.',
  'password.confirmed': 'The passwords do not match.',
  'username.minLength': 'The username must be at least 3 characters.',
  'username.maxLength': 'The username must be at most 20 characters.',
  'bio.maxLength': 'The bio must be at most 175 characters.',
  'current_password.invalid': 'The actual password is incorrect',
  'new_password.confirmed': 'The passwords do not match.',
})

export const updateProfileValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .maxLength(25)
      .minLength(3)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    bio: vine.string().maxLength(175).nullable(),
    avatar: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png', 'PNG', 'webp', 'WEBP'],
      })
      .nullable(),
  })
)

export const updateProfileVarientValidator = vine.compile(
  vine.object({
    username: vine.string().trim().maxLength(25).minLength(3),
    bio: vine.string().maxLength(175).nullable(),
    avatar: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png', 'PNG', 'webp', 'WEBP'],
      })
      .nullable(),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    current_password: vine.string().trim(),
    new_password: vine.string().trim().minLength(8).confirmed({
      confirmationField: 'confirm_password',
    }),
    confirm_password: vine.string().trim(),
  })
)
