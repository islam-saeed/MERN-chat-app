import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'
import {useSpring, animated} from 'react-spring'


const Sidebar = () => {
  const [user, setUser] = useContext(userContext)
  return (
    <>
    <div className='bg-[#222] text-white h-[100vh] w-[100%] flex items-center col-span-2'>
        <div className='w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded ml-8'>
          <div className='w-[100%] h-20 flex justify-start items-center'>
            <div className="rounded-full w-16 h-16 m-5 bg-gray-600 cursor-pointer"></div>
            <div>
              <h4 className='text-2xl'>{user?.data?.user.name}</h4>
              <h4 className='text-gray-200 cursor-pointer'>Edit</h4>
            </div>
          </div>
        </div>
    </div>
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

    </div>
    </>
  )
}

export default Sidebar