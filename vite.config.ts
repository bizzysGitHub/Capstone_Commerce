import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig } from 'vite'
import type { Connect, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { createCheckoutSession, getCheckoutSessionStatus, type CheckoutRequestItem } from './server/stripe/create-checkout-session'

const readJsonBody = async <T>(req: IncomingMessage): Promise<T> =>
  await new Promise<T>((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        resolve((body ? JSON.parse(body) : {}) as T)
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })

const sendJson = (res: ServerResponse, statusCode: number, payload: unknown) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const stripeCheckoutApiPlugin = (): Plugin => {
  const createRoute = '/api/stripe/create-checkout-session'
  const statusRoute = '/api/stripe/checkout-session'

  const handler: Connect.NextHandleFunction = async (req, res, next) => {
    try {
      const requestUrl = new URL(req.url ?? '/', 'http://localhost')

      if (requestUrl.pathname === createRoute) {
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Method not allowed.' })
          return
        }

        const { items } = await readJsonBody<{ items?: CheckoutRequestItem[] }>(req)

        if (!items || items.length === 0) {
          sendJson(res, 400, { error: 'Cart items are required.' })
          return
        }

        const origin =
          req.headers.origin ??
          `http://${req.headers.host}`

        const session = await createCheckoutSession({
          items,
          origin,
        })

        sendJson(res, 200, { sessionId: session.id })
        return
      }

      if (requestUrl.pathname === statusRoute) {
        if (req.method !== 'GET') {
          sendJson(res, 405, { error: 'Method not allowed.' })
          return
        }

        const sessionId = requestUrl.searchParams.get('session_id')

        if (!sessionId) {
          sendJson(res, 400, { error: 'Missing session_id.' })
          return
        }

        const session = await getCheckoutSessionStatus({ sessionId })
        sendJson(res, 200, session)
        return
      }

      next()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to process Stripe checkout request.'
      sendJson(res, 500, { error: message })
    }
  }

  return {
    name: 'stripe-checkout-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    'process.env': JSON.stringify({}),
  },
  plugins: [
    stripeCheckoutApiPlugin(),
    react(),
    svgr({
      svgrOptions: {
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "react-native": "react-native-web",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) {
            return 'firebase'
          }

          if (id.includes('node_modules/@stripe') || id.includes('/server/stripe/')) {
            return 'stripe'
          }

          if (id.includes('node_modules/tamagui') || id.includes('node_modules/@tamagui')) {
            return 'tamagui'
          }

          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-redux') ||
            id.includes('node_modules/@reduxjs')
          ) {
            return 'framework'
          }
        },
      },
    },
  },
})
