import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The field is required.',

  'theme.exists': 'This theme does not exist.',
  'difficulty.exists': 'This difficulty does not exist.',

  'string.minLength': 'This field must be at least {{min}} characters long.',
  'string.maxLength': 'This field cannot exceed {{max}} characters.',

  'number.min': 'This must be at least {{min}}.',
  'number.max': 'This field cannot exceed {{max}}.',
  'number.positive': 'This field must be a positive number.',

  'array.fixedLength': 'This field must have exactly {{length}} elements.',

  'answers.isCorrect': 'At least one answer must be marked as correct.',

  'file.size': 'The file size must not exceed {{size}}.',
  'file.extnames': 'The file must be of type {{extnames}}.',
})

export const questionValidator = vine.compile(
  vine.object({
    theme: vine
      .number()
      .withoutDecimals()
      .positive()
      .exists(async (db, value) => {
        const theme = await db.from('themes').where('id', value).first()
        return !!theme
      }),
    difficulty: vine
      .number()
      .withoutDecimals()
      .positive()
      .exists(async (db, value) => {
        const difficulty = await db.from('difficulties').where('id', value).first()
        return !!difficulty
      }),
    question: vine.string().minLength(10).maxLength(120),
    answers: vine
      .array(
        vine.object({
          text: vine.string().minLength(1).maxLength(30),
          isCorrect: vine.boolean(),
          slot: vine.number().min(0).max(3),
          id: vine.number().min(1).max(4),
        })
      )
      .fixedLength(4),
    image: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png', 'PNG', 'GIF', 'gif', 'webp', 'WEBP'],
      })
      .nullable(),
  })
)

export const questionIdValidator = vine.compile(
  vine.object({
    questionId: vine.number().positive(),
  })
)
