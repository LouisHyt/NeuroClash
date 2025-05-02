import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserPresenter from '#presenters/user_presenter'
import { inject } from '@adonisjs/core'

type MetaType = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPage_url: string
  nextPage_url: string | null
  previousPageUrl: string | null
}

@inject()
export default class UserApiController {
  constructor(protected usersPresenter: UserPresenter) {}

  public async getUsers(ctx: HttpContext) {
    const page = ctx.request.input('page', 1) || 1
    const limit = 10

    const users = await User.query()
      .preload('statistic')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
    return {
      meta: users.getMeta() as MetaType,
      users: this.usersPresenter.manyToJSON(users),
    }
  }
}
