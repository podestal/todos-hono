import { authClient } from '@/lib/auth-client'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      console.log('Please enter an email and password')
      return
    }
    authClient.signIn.email({
      email,
      password,
    })
    .then((res) => {
      console.log(res)
      router.navigate({ to: '/todos' })
    })
    .catch((err) => {
      console.error(err)
    })
  }
  return (
  <div className='flex flex-col gap-4 w-96 mx-auto mt-10 bg-base-300 p-4 rounded-lg shadow-lg'>
    <h2 className=' text-center py-8 text-2xl font-semibold'>Login</h2>
    <form 
      className='flex flex-col gap-8 w-full'
      onSubmit={handleSubmit}
      >
      <div className='form-control'>
        <input 
          type='email' 
          placeholder='Email' 
          className='input input-bordered' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <input 
          type='password' 
          placeholder='Password' 
          className='input input-bordered' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <button type='submit' className='btn btn-primary'>Login</button>
      </div>
      <div className='form-control'>
        <p className='text-center text-sm text-gray-500 mt-4'>Don't have an account? <Link to='/signup' className='text-cyan-600 hover:text-cyan-700'>Signup</Link></p>
      </div>
    </form>
  </div>)
}
