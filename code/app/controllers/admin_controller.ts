import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserPresenter from '#presenters/user_presenter'
import QuestionPresenter from '#presenters/question_presenter'
import User from '#models/user'
import Question from '#models/question'

@inject()
export default class AdminController {
  constructor(
    protected userPresenter: UserPresenter,
    protected questionPresenter: QuestionPresenter
  ) {}

  async showDashboard({ inertia }: HttpContext) {
    const totalUsers = await User.query().count('*', 'total')
    const suggestedQuestions = await Question.query()
      .where('is_approved', false)
      .preload('author', (authorQuery) => authorQuery.preload('suggestedQuestions'))
      .preload('theme')
      .preload('difficulty')
      .preload('answers')

    return inertia.render('admin', {
      usersCount: Number(totalUsers[0].$extras.total),
      suggestedQuestions: this.questionPresenter.toJSON(suggestedQuestions),
      approvedQuestions: true,
    })
  }
}
