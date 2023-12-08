import React from 'react'
import {useSpring, animated} from 'react-spring'

const Auth = () => {
  const [containerSprings, containerAPI] = useSpring(()=>({
    from: {
      x: 0
    }
  }))
  const [signInSprings, signInAPI] = useSpring(()=>({
    from: {
      y: -500,
      opacity: 0
    }
  }))
  const [signUpSprings, signUpAPI] = useSpring(()=>({
    from: {
      y: 0,
      opacity: 1
    }
  }))

  const handleSignInAnimation = () => {

    signInAPI.start({
      from: {
        y: -500,
        opacity: 0
      },
      to: {
        y: 0,
        opacity: 1
      }
    })

    containerAPI.start({
      from: {
        x: 0
      },
      to: {
        x: 420
      }
    })

    signUpAPI.start({
      from: {
        y: 0,
        opacity: 1
      },
      to: {
        y: 500,
        opacity: 0
      }
    })
  }

  const handleSignUpAnimation = () => {

    signInAPI.start({
      from: {
        y: 0,
        opacity: 1
      },
      to: {
        y: -500,
        opacity: 0
      }
    })

    containerAPI.start({
      from: {
        x: 420
      },
      to: {
        x: 0
      }
    })

    signUpAPI.start({
      from: {
        y: 500,
        opacity: 0
      },
      to: {
        y: 0,
        opacity: 1
      }
    })
  }
  return (
    <div className='flex justify-center items-center h-[100%]'>
      <animated.div className='bg-[#111] flex justify-center items-center rounded-xl w-[50vh] h-[65vh] absolute left-[23%] overflow-hidden' style={{...containerSprings}}>
        <animated.div className='flex flex-col items-center p-10 absolute' style={{...signUpSprings}}>
          <h1 className='text-2xl m-3'>Sign Up</h1>
          <input type='email' placeholder='Email' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='text' placeholder='Username' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Confirm Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <button type='submit' className='rounded-full bg-[#C40234] py-3 px-5 m-3' onClick={() => alert('Sign Up Successful')}>Sign Up</button>
        </animated.div>
        <animated.div className='flex flex-col items-center p-10 absolute' style={{...signInSprings}}>
          <h1 className='text-2xl m-3'>Sign In</h1>
          <input type='email' placeholder='Email' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <input type='password' placeholder='Password' className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' />
          <button type='submit' className='rounded-full bg-[#C40234] py-3 px-5 m-3' onClick={() => alert('Sign In Successful')}>Sign In</button>
        </animated.div>
      </animated.div>
      <div className='flex justify-around items-center w-[60%] h-[50vh] bg-[#191919]'>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Don't have an account?</p>
          <button className='text-gray-800 bg-white py-3 px-5 m-3 rounded-xl' onClick={handleSignUpAnimation}>Sign Up</button>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Already have an account?</p>
          <button className='text-gray-800 bg-white py-2 px-5 m-3 rounded-xl' onClick={handleSignInAnimation}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Auth