import React from 'react'
import { TbDeviceDesktopCode } from "react-icons/tb";

function UseCaseCard() {
    return (
        <div className=' bg-dark-blue-black text-white w-80 rounded-md shadow-xl'>
            <div className='  relative text-5xl bottom-10 bg-black left-5 items-center border-black border-8 rounded-full w-20 h-20 flex justify-center'>
                <TbDeviceDesktopCode />
            </div>
            <div className=' p-5'>
                <h1 className=' text-2xl font-bold pb-5'> Technical Interviews</h1>
                <p className='text-justify text-md'>
                    
CodeLink facilitates real-time collaboration for solving coding problems, whiteboarding algorithms, and discussing solutions, with integrated chat and video conferencing features, ideal for skill enhancement
                </p>
                <button className=' p-2 border-2 border-white mt-5 rounded-sm'>Start An Interviews</button>
            </div>
        </div>
    )
}

export default UseCaseCard