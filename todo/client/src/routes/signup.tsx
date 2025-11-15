import { createFileRoute, useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log('Passwords do not match')
      return
    }
    authClient.signUp.email({
      email,
      password,
      name,
    }).then((res) => {
      console.log(res)
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      router.navigate({ to: '/todos' })
    }).catch((err) => {
      console.error(err)
    })
  }
  return (
    <div className='bg-base-200 min-h-screen flex items-start justify-center'>
      <div className='card w-96 bg-base-300 shadow-xl mt-10'>
        <div className='card-body'>
          <h2 className='c text-center pt-8 text-2xl font-semibold'>Create an account</h2>
          <p className='text-center text-sm text-gray-500 mb-4'>Sign up to get started</p>
          <form 
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div className='form-control'>

              <input 
                type='text' 
                placeholder='Full Name' 
                className='input input-bordered' 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <input 
                type='password' 
                placeholder='Confirm Password' 
                className='input input-bordered' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='form-control text-center mt-4'>
              <button type='submit' className='btn btn-primary'>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
