import DraftPhases from '#enums/DraftPhases'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type GameController from '#controllers/game_controller'

export type ThemeType = InferPageProps<GameController, 'showDraftGame'>['themes'][0]

export type PlayerType = InferPageProps<
  GameController,
  'showDraftGame'
>['players']['currentPlayer'] & {
  bannedThemes: (ThemeType | null)[]
}

export type DraftPhaseType =
  | DraftPhases.WAIT
  | DraftPhases.BAN1
  | DraftPhases.BAN2
  | DraftPhases.COMPLETE
