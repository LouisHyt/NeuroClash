import Rank from '#models/rank'
import type User from '#models/user'
import { RankManager } from '#services/rank_manager'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

type UserSharedType = User & { rank: Rank }
type FlashType = {
  type: 'success' | 'error' | 'warning'
  message: {
    [key: string]: string
  }
}[]

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    flashes: (ctx) =>
      ctx.inertia.always(() => {
        const flashes = ctx.session?.flashMessages.all()
        if (!flashes) return [] as FlashType
        return Object.entries(flashes).map(([type, message]) => ({ type, message })) as FlashType
      }),
    user: async (ctx) => {
      if (!ctx.auth?.user) return null
      await ctx.auth?.user?.load('statistic')
      const rankManager = new RankManager()
      const rank = ctx.auth?.user
        ? await rankManager.getPlayerRank(ctx.auth?.user?.statistic?.elo)
        : null
      return {
        ...ctx.auth?.user?.toJSON(),
        rank: rank,
      } as UserSharedType
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
