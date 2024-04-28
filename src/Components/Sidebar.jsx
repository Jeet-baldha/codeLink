import React from 'react'
import { IoMdSettings, IoMdLink,IoMdDownload, IoMdVideocam, } from "react-icons/io";
import { MdError } from "react-icons/md";

function Sidebar() {
    return (
        <div className=' flex w-14 text-white h-svh absolute justify-between flex-col bg-dark-grayish-blue  right-0 border-dark-blue-black border-t-2 text-center  text-xl z-50'>
                <div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4 hover:cursor-pointer'>
                        <IoMdLink />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <IoMdVideocam />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>    
                        <IoMdDownload />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <IoMdSettings />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <MdError />
                    </div>
                </div>
        </div>
    )
}

export default Sidebar