import { defineConfig } from '@adonisjs/shield'
import env from '#start/env'

const shieldConfig = defineConfig({
  /**
   * Configure CSP policies for your app. Refer documentation
   * to learn more
   */
  csp: {
    enabled: false,
    directives: {
      defaultSrc: [`'self'`],
      fontSrc: [`'self'`, 'https://fonts.bunny.net'],
      scriptSrc: [`'self'`, `'unsafe-inline'`, `'unsafe-eval'`, 'https://cdnjs.cloudflare.com'],
      styleSrc: [`'self'`, `'unsafe-inline'`, 'https://fonts.bunny.net'],
      imgSrc: [
        `'self'`,
        'data:',
        'https://api.dicebear.com',
        'https://picsum.photos',
        'https://fastly.picsum.photos',
      ],
      connectSrc: [`'self'`, `ws://${env.get('HOST')}:*`, `wss://${env.get('HOST')}:*`],
    },
    reportOnly: false,
  },

  /**
   * Configure CSRF protection options. Refer documentation
   * to learn more
   */
  csrf: {
    enabled: true,
    exceptRoutes: [],
    enableXsrfCookie: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },

  /**
   * Control how your website should be embedded inside
   * iFrames
   */
  xFrame: {
    enabled: true,
    action: 'DENY',
  },

  /**
   * Force browser to always use HTTPS
   */
  hsts: {
    enabled: true,
    maxAge: '180 days',
  },

  /**
   * Disable browsers from sniffing the content type of a
   * response and always rely on the "content-type" header.
   */
  contentTypeSniffing: {
    enabled: true,
  },
})

export default shieldConfig
