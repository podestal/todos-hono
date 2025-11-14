import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server/index.ts'
import { useQuery } from '@tanstack/react-query'

const client = hc<AppType>('http://localhost:3000')

export const Route = createFileRoute('/todos')({
  component: RouteComponent,
})

function RouteComponent() {
    const { data: todos, isError, error, isSuccess, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const resp = await client.api.todos.$get()
            if (!resp.ok) {
                throw new Error('Failed to fetch todos')
            }
            return resp.json()
        }
    })

    if (isLoading) return <p className="text-center text-xs text-gray-500 animate-pulse my-4">Loading...</p>
    if (isError) return <p className="text-center text-xs text-red-500 my-4">Error: {error.message}</p>
    if (isSuccess)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todos</h1>
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )

}
