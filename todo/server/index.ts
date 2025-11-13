import { Hono } from 'hono'
import corsMiddleware from './middleware/cors'

const app = new Hono()

app.use('/*', corsMiddleware)
const router = app

.get('/', (c) => {
  return c.text('Hello Hono!')
})

.get('/api/people', c => {
  return c.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])
})

export type AppType = typeof router

export default app
