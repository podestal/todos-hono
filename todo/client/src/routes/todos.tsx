import { createFileRoute, redirect } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server/index.ts'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

const client = hc<AppType>('http://localhost:3000', {
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, { ...init, credentials: 'include' }),
  })

export const Route = createFileRoute('/todos')({
    beforeLoad: async () => {
        const { data: session } = await authClient.getSession()
        if (!session) {
            throw redirect({ to: '/signin' })
        }
        return { session }
    },
    component: RouteComponent,
})

function RouteComponent() {

    const { data: todos, isError, error, isSuccess, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const resp = await client.api.todos.$get()
            if (!resp.ok) {
                console.log(resp)
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
                    <li 
                        className="flex items-center gap-4"
                        key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => {}} className="checkbox checkbox-primary" />
                        <span className="text-lg text-white">{todo.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )

}
