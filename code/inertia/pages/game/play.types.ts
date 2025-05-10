import type GameController from '#controllers/game_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type Question from '#models/question'

export type PlayerType = InferPageProps<
  GameController,
  'showDraftGame'
>['players']['currentPlayer'] & {
  life: number
}

export type QuestionType = Question | null

export type QuestionPanelProps = {
  question: Question
  timeLeft: number
  maxTime: number
  damageMultiplier: number
  correctAnswerId: number | null
  selectedAnswer: number | null
  handleAnswer: (answerId: number) => void
}
