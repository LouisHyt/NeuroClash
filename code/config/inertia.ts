import type User from '#models/user'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

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
        return Object.entries(flashes).map(([type, message]) => ({ type, message })) as Record<
          string,
          string
        >[]
      }),
    user: async (ctx) => {
      await ctx.auth?.user?.load('statistic')
      return ctx.auth?.user as User
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
