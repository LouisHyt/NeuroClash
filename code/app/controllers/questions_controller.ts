import type { HttpContext } from '@adonisjs/core/http'

export default class QuestionsController {



    async showSuggestQuestion(ctx: HttpContext) {

        return ctx.inertia.render('suggestQuestion')
    }

}