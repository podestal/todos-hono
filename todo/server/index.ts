import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for all routes
app.use('/*', cors({
  origin: ['http://localhost:5000'], // Allow requests from your frontend
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  credentials: true,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/people', c => {
  return c.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])
})

export default app
