/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@tuyau/inertia/react'
import { tuyau } from '~/utils/api'
import { router } from '@inertiajs/react'

//Prevent Cache Issues and Authentication persistence after logout
window.addEventListener('popstate', (e) => {
  e.stopImmediatePropagation()

  router.visit(window.location.href, {
    preserveState: false,
    preserveScroll: false,
    replace: true,
  })
})

const appName = import.meta.env.VITE_APP_NAME || 'NeuroClash'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )
    console.log('Page rendered on client')
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <>
        <TuyauProvider client={tuyau}>
          <App {...props} />
        </TuyauProvider>
      </>
    )
  },
})
