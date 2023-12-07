import React from 'react'

const Auth = () => {
  return (
    <div className='flex justify-center items-center h-[100%]'>
      <div className='bg-[#111] flex justify-center items-center rounded-xl w-[50vh] h-[65vh] absolute left-[25%]'>
        <div className='flex flex-col items-center p-10 '>
          <h1 className='text-2xl m-3'>Sign Up</h1>
          <input type='email' placeholder='Email' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='text' placeholder='Username' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Confirm Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <button type='submit' className='rounded-full bg-[#C40234] py-3 px-5 m-3' onClick={() => alert('Sign Up Successful')}>Sign Up</button>
        </div>
        <div className='flex flex-col items-center p-10 hidden'>
          <h1 className='text-2xl m-3'>Sign In</h1>
          <input type='email' placeholder='Email' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <button type='submit' className='rounded-full bg-[#C40234] py-3 px-5 m-3' onClick={() => alert('Sign In Successful')}>Sign In</button>
        </div>
      </div>
      <div className='flex justify-around items-center w-[60%] h-[50vh] bg-[#191919]'>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Don't have an account?</p>
          <button className='text-gray-800 bg-white py-3 px-5 m-3 rounded-xl'>Sign Up</button>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Already have an account?</p>
          <button className='text-gray-800 bg-white py-2 px-5 m-3 rounded-xl'>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Auth