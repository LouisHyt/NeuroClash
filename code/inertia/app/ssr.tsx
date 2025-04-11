import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const resolvedPages = pages[`../pages/${name}.tsx`]
      console.log('Page rendered on server');
      return resolvedPages
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}