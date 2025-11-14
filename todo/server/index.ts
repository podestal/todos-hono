import { Hono } from 'hono'
import corsMiddleware from './middleware/cors'
import { getTodos } from './db/queries'

const app = new Hono()

app.use('/*', corsMiddleware)
const router = app

.get('/api/todos', async (c) => {
  try {
    const todos = await getTodos()
    return c.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
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
