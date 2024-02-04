import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserContext'
import {useSpring, animated} from 'react-spring'
import { FaCamera, FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import ImageUploadForm from './ImageUploadForm';
import { usersContext } from '../context/UsersContext';
import UserEditForm from './UserEditForm';


const Sidebar = () => {
  // getting current user
  const [user, setUser] = useContext(userContext)

  // getting active users
  const [users, setUsers] = useContext(usersContext)

  // state for the open/close button for the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log('users: ',users)

  // react-spring api for image upload form animation
  const [containerSprings, containerAPI] = useSpring(()=>({
    from:{
      y: -1000,
      x: window.innerWidth/4,
      opacity: 0
    }
  }))

  // react-spring api for user info form animation
  const [userContainerSprings, userContainerAPI] = useSpring(()=>({
    from:{
      y: -1000,
      x: window.innerWidth/4,
      opacity: 0
    }
  }))
  
  // handling the image upload form opening animation on the user image click
  const handleImageClick = () => {
    containerAPI.start({
      to: {
        y: 50,
        opacity: 1
      }
    })
  }
  
  // handling the user info form opening animation on the edit button click
  const handleEditClick = () => {
    userContainerAPI.start({
      to: {
        y: 50,
        opacity: 1
      }
    })
  }
  return (
    <>
    <div className={`bg-[#222] text-white h-[100vh] w-[300px] flex items-center absolute z-50 ${sidebarOpen? '' : 'left-[-300px]'}`}>
        <div className='w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded overflow-y-scroll'>
          <div className='w-[100%] h-20 flex justify-start items-center'>
            <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 cursor-pointer flex justify-center items-center bg-cover bg-no-repeat"
              style={user?.user.imgURL? {backgroundImage: `url(${user.user.imgURL})`} : {}}
              onClick={handleImageClick}
            >
              <FaCamera className='group-hover:block hidden' />
            </div>
            <div>
              <h4 className='text-2xl'>{user?.user.name}</h4>
              <h4 className='text-gray-200 cursor-pointer' onClick={handleEditClick}>Edit</h4>
            </div>
          </div>
          <hr className='w-[90%] mx-auto my-4'/>
          {users?.map((activeUser)=>{
            return(
              <div className='w-[100%] h-20 flex justify-start items-center' key={activeUser?.id}>
                <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 flex justify-center items-center bg-cover bg-no-repeat"
                  style={activeUser?.imgURL? {backgroundImage: `url(${activeUser.imgURL})`} : {}}
                >
                </div>
                <div>
                  <h4 className='text-2xl'>{activeUser?.username}</h4>
                </div>
              </div>
            )
          })}
        </div>
    </div>
    <div className={`h-[100px] w-5 bg-gray-800 hover:bg-gray-600 cursor-pointer absolute top-[calc(50%-50px)] flex justify-center items-center ${sidebarOpen? 'left-[300px]' : ''}`} onClick={()=>setSidebarOpen(prev=>!prev)}>
      {sidebarOpen? <FaChevronLeft /> : <FaChevronRight />}
    </div>
    <ImageUploadForm className='absolute w-[50vw] h-[90vh] bg-black flex justify-center items-center z-50 rounded' containerSprings={containerSprings} containerAPI={containerAPI}/>
    <UserEditForm className='absolute w-[50vw] h-[90vh] bg-black flex justify-center items-center z-50 rounded' userContainerSprings={userContainerSprings} userContainerAPI={userContainerAPI}/>
    </>
  )
}

export default Sidebar