import { cors } from "hono/cors"

const corsMiddleware = cors({
  origin: ['http://localhost:5000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  credentials: true,
})

export default corsMiddleware