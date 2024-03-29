import React, { useContext, useRef, useState } from 'react'
import { userContext } from '../context/UserContext';
import {animated} from 'react-spring'
import { IoClose } from "react-icons/io5";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UserEditForm = ({className, userContainerSprings, userContainerAPI}) => {

    // getting the cookie setter to update cookies on new user edits
    const [cookies, setCookie] = useCookies(["user"]);

    // getting current user
    const [user, setUser] = useContext(userContext)

    // states for form elements
    const [name, setName] = useState(user.user.name)
    const [email, setEmail] = useState(user.user.email)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    
    // handling form close animations
    const handleImageClose = () => {
      userContainerAPI.start({
        from: {
          y: 50,
          opacity: 1
        },
        to: {
          y: -1000,
          opacity: 0
        }
      })
    }

    // checking for password changes then sending the patch request and updating the user and cookies
    const handleSubmit = () => {
      if(password!==''){
        axios({
            url:`http://localhost:4000/user/bio/${user.user._id}`,
            method:'PATCH',
            data: {
                name: name,
                email: email,
                password: password
            }
        }).then( response => {
          setUser(response.data)
          let date = new Date();
          date.setTime(date.getTime()+(24*60*60*1000));
          setCookie("user", response.data, { path: "/", expires: date, sameSite:'none' });
          console.log('cookies updated successfully')
        })
      } else {
        axios({
            url:`http://localhost:4000/user/bio/${user.user._id}`,
            method:'PATCH',
            data: {
                name: name,
                email: email
            }
        }).then( response => {
          setUser(response.data)
          let date = new Date();
          date.setTime(date.getTime()+(24*60*60*1000));
          setCookie("user", response.data, { path: "/", expires: date, sameSite:'none' });
          console.log('cookies updated successfully')
        })
      }
    }
  return (
    <animated.div className={`${className}`} style={{...userContainerSprings}}>
        <div className='flex justify-center items-center flex-col w-[100%] text-2xl'>
        <div className='absolute top-1 right-5 rounded-full hover:bg-white hover:text-gray-800 w-10 h-10 flex justify-center items-center cursor-pointer' onClick={handleImageClose}><IoClose /></div>
            <label>Email : </label>
            <input type="text" className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>Name : </label>
            <input type="text" className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' value={name} onChange={(e)=>setName(e.target.value)}/>
            <label>Password : </label>
            <input type="password" className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <label>Confirm password : </label>
            <input type="password" className='bg-[#333] rounded-2xl py-2 px-4 m-2 focus:outline-none' value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
            <button className='rounded-full bg-[#C40234] py-3 px-5 m-3 mt-8' onClick={handleSubmit}>Submit</button>
        </div>
    </animated.div>
  )
}

export default UserEditForm