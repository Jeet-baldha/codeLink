import React, { useState } from 'react'
import { IoMdSettings, IoMdLink, IoMdDownload, IoMdVideocam, } from "react-icons/io";
import { MdError } from "react-icons/md";
import Setting from './Setting';
import VideoCall from './VideoCall';

function Sidebar() {

    const [Settingwidth,setSettingWidth] = useState(0);
    const [videoCallwidth,setVideoCallWidth] = useState(0);

    return (
        <div className=' flex w-auto'>

            <div className=' w-auto text-white h-svh  bg-dark-grayish-blue  border-dark-blue-black border-t-2 text-center  text-xl z-50'>
                <div className=''>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4 hover:cursor-pointer'>
                        <IoMdLink />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer '>
                        <IoMdVideocam onClick={ () => setVideoCallWidth(80)} />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <IoMdDownload />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <IoMdSettings onClick={ () => setSettingWidth(80)} />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <MdError />
                    </div>
                </div>

            </div>
            <div>
                <Setting width={Settingwidth} setWidth={setSettingWidth} />
            </div>
            <div>
                <VideoCall width={videoCallwidth} setWidth={setVideoCallWidth} ></VideoCall>
            </div>
        </div>
    )
}

export default Sidebar