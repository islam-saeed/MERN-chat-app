import React, { useContext, useRef, useState } from 'react'
import { userContext } from '../context/UserContext'
import {useSpring, animated} from 'react-spring'
import { FaCamera } from "react-icons/fa6";


const Sidebar = () => {
  const [user, setUser] = useContext(userContext)
  const sendData = async (fileObj) => {

    let formData = new FormData();

    formData.append('image',fileObj)

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    const response = await fetch('http://localhost:4000/api/images/', requestOptions)
    const data = await response.json()
  }
  const inputRef = useRef(null);

    // browse for the file on click
    const handleClick = () => {
    // open file input box on click of the button
    inputRef.current.click();
    };


    // get the file that was browsed and send it to the database
    const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
        return;
    }

    // reset file input
    event.target.value = null;

    sendData(fileObj);
    
    };
    
    // state to change the image-container style on drag
    const [dragActive, setDragActive] = useState(false);

    // tracks the file to see if it enters the image-container div
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };


      // sends the image to the database on drop
      const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            sendData(e.dataTransfer.files[0])
        }
      };
  const handleImageClick = () => {

  }
  return (
    <>
    <div className='bg-[#222] text-white h-[100vh] w-[100%] flex items-center col-span-2'>
        <div className='w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded ml-8'>
          <div className='w-[100%] h-20 flex justify-start items-center'>
            <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 cursor-pointer flex justify-center items-center">
              <FaCamera className='group-hover:block hidden' onClick={handleImageClick} />
            </div>
            <div>
              <h4 className='text-2xl'>{user?.data?.user.name}</h4>
              <h4 className='text-gray-200 cursor-pointer'>Edit</h4>
            </div>
          </div>
        </div>
    </div>
    <div className='absolute w-[80vw] h-[80vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' onDragEnter={handleDrag}>
        <div className="container">
            <h2>Upload Your Image</h2>
            <h4>File should be jpeg,png....</h4>
            <div 
                className="image-container"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={ dragActive ? {backgroundColor : "white"} : {} }
                >
                <img src='./image.svg' alt="image placeholder" className="placeholder" />
                <p>Drag & Drop your image here</p>
            </div>
            <p>or</p>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />

            <button onClick={handleClick}>Choose a file</button>
        </div>
    </div>
    </>
  )
}

export default Sidebar