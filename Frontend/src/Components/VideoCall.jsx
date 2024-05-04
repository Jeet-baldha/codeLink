import React from 'react'
import { IoIosCloseCircle,IoIosMic,IoMdVideocam,IoMdCall } from 'react-icons/io'

function VideoCall({width,setWidth}) {

    const style = {
        width:width+'px',
    }
    return (
        <div style={style} className={` text-white bg-dark-blue-black h-full pt-10 duration-200 overflow-auto `}>

            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className=' text-2xl font-bold text-light-bluish-green ' >Video Cam</h1>
                <IoIosCloseCircle className=' hover:cursor-pointer text-2xl'  onClick={ () => setWidth(0)}/>
            </div>

            <div className=' p-5 flex flex-col gap-5 overflow-y-auto'>
                <div className=' bg-dark-grayish-blue h-40 rounded-sm' ></div>
                <div className=' bg-dark-grayish-blue h-40 rounded-sm' ></div>    
            </div>

            <div className=' sticky bottom-1 z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black  text-white py-3 outline-1'>
                <IoIosMic />
                <IoMdVideocam />
                <IoMdCall className='  bg-red-700 rounded-full' />
            </div>

        </div>
    )
}

export default VideoCall