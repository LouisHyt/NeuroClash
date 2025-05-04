import type { HttpContext } from '@adonisjs/core/http'
import Theme from '#models/theme'
import Difficulty from '#models/difficulty'
import ThemesPresenter from '#presenters/themes_presenter'
import { inject } from '@adonisjs/core'
import DifficultiesPresenter from '#presenters/difficulty_presenter'
import { questionIdValidator, questionValidator } from '#validators/question'
import { attachmentManager } from '@jrmc/adonis-attachment'
import Question from '#models/question'
import Answer from '#models/answer'
import { cuid } from '@adonisjs/core/helpers'
import FlashKeys from '#enums/Flashes'

@inject()
export default class QuestionsController {
  constructor(
    protected themesPresenter: ThemesPresenter,
    protected difficultyPresenter: DifficultiesPresenter
  ) {}

  async showSuggestQuestion(ctx: HttpContext) {
    await ctx.auth.user?.load('suggestedQuestions')
    const user = ctx.auth.user!

    if (user.timeUntilNextSuggestion > 0) {
      ctx.session.flash(FlashKeys.WARNING, {
        W_NO_CHANGE: `You must wait ${user.timeUntilNextSuggestion} hours before submitting another question`,
      })
      return ctx.response.redirect().toRoute('dashboard.show')
    }

    const themes = await Theme.all()
    const difficulties = await Difficulty.all()

    return ctx.inertia.render('suggestQuestion', {
      themes: this.themesPresenter.toJSON(themes),
      difficulties: this.difficultyPresenter.toJSON(difficulties),
    })
  }

  async handleSuggestQuestion(ctx: HttpContext) {
    await ctx.auth.user?.load('suggestedQuestions')
    const user = ctx.auth.user!
    if (user.timeUntilNextSuggestion > 0) {
      ctx.session.flash(FlashKeys.WARNING, {
        W_NO_CHANGE: `You must wait ${user.timeUntilNextSuggestion} hours before submitting another question`,
      })
      return ctx.response.redirect().toRoute('dashboard.show')
    }
    const data = await ctx.request.validateUsing(questionValidator)

    if (data.image) {
      data.image.clientName = `${cuid()}.${data.image.extname}`
    }

    const question = await Question.create({
      userUuid: user.uuid,
      themeId: data.theme,
      difficultyId: data.difficulty,
      name: data.question,
      isApproved: user.isAdmin ? true : false,
      image: data.image ? await attachmentManager.createFromFile(data.image) : null,
    })

    await Answer.createMany(
      data.answers.map((answer) => ({
        name: answer.text,
        isCorrect: answer.isCorrect,
        slot: answer.slot,
        questionId: question.id,
      }))
    )

    user.isAdmin
      ? ctx.session.flash(FlashKeys.SUCCESS, {
          S_CREATED: 'Your question has been successfully submitted!',
        })
      : ctx.session.flash(FlashKeys.SUCCESS, {
          S_CREATED: 'Your question has been successfully submitted! An admin will check it soon.',
        })

    ctx.response.redirect().toRoute('dashboard.show')
  }

  async deleteQuestion(ctx: HttpContext) {
    const { questionId } = await ctx.request.validateUsing(questionIdValidator)
    const question = await Question.find(questionId)
    if (!question) {
      ctx.session.flash(FlashKeys.ERROR, {
        E_NO_QUESTION: "This question doesn't exists.",
      })
      return ctx.response.redirect().back()
    }
    await question.delete()
    ctx.session.flash(FlashKeys.SUCCESS, {
      S_DELETED: 'The question has been successfully deleted!',
    })
    return ctx.response.redirect().back()
  }

  async approveQuestion(ctx: HttpContext) {
    const { questionId } = await ctx.request.validateUsing(questionIdValidator)
    const question = await Question.find(questionId)
    if (!question) {
      ctx.session.flash(FlashKeys.ERROR, {
        E_NO_QUESTION: "This question doesn't exists.",
      })
      return ctx.response.redirect().back()
    }
    question.isApproved = true
    await question.save()
    ctx.session.flash(FlashKeys.SUCCESS, {
      S_APPROVED: 'The question has been successfully approved!',
    })
    return ctx.response.redirect().back()
  }
}
