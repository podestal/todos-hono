import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='bg-base-200 min-h-screen flex items-start justify-center'>
      <div className='card w-96 bg-base-300 shadow-xl mt-10'>
        <div className='card-body'>
          <h2 className='c text-center pt-8 text-2xl font-semibold'>Create an account</h2>
          <p className='text-center text-sm text-gray-500 mb-4'>Sign up to get started</p>
          <form className='flex flex-col gap-4'>
            <div className='form-control'>

              <input type='text' placeholder='Full Name' className='input input-bordered' />
            </div>
            <div className='form-control'>
              <input type='email' placeholder='Email' className='input input-bordered' />
            </div>
            <div className='form-control'>
              <input type='password' placeholder='Password' className='input input-bordered' />
            </div>
            <div className='form-control'>
              <input type='password' placeholder='Confirm Password' className='input input-bordered' />
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
