import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'
import {useSpring, animated} from 'react-spring'
import { FaCamera } from "react-icons/fa6";
import ImageUploadForm from './ImageUploadForm';


const Sidebar = () => {
  const [user, setUser] = useContext(userContext)
  const [containerSprings, containerAPI] = useSpring(()=>({
    from:{
      y: -1000,
      x: window.innerWidth/4,
      opacity: 0
    }
  }))
  
  const handleImageClick = () => {
    containerAPI.start({
      to: {
        y: 50,
        opacity: 1
      }
    })
  }
  return (
    <>
    <div className='bg-[#222] text-white h-[100vh] w-[100%] flex items-center col-span-2'>
        <div className='w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded ml-8'>
          <div className='w-[100%] h-20 flex justify-start items-center'>
            <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 cursor-pointer flex justify-center items-center"
              style={user?.user.img? {backgroundImage: user.user.img} : {}}
            >
              <FaCamera className='group-hover:block hidden' onClick={handleImageClick} />
            </div>
            <div>
              <h4 className='text-2xl'>{user?.user.name}</h4>
              <h4 className='text-gray-200 cursor-pointer'>Edit</h4>
            </div>
          </div>
        </div>
    </div>
    <ImageUploadForm className='absolute w-[50vw] h-[90vh] bg-black flex justify-center items-center z-50 rounded' containerSprings={containerSprings} containerAPI={containerAPI}/>
    </>
  )
}

export default Sidebar