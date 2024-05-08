import React, { useEffect, useState } from 'react'
import { IoMdSettings, IoMdLink, IoMdDownload, IoMdVideocam, } from "react-icons/io";
import { MdError } from "react-icons/md";
import Setting from './Setting';
import VideoCall from './VideoCall';
import ShareLink from './ShareLink';
import { useParams } from 'react-router-dom';
import Feedback from './Feedback';

function Sidebar({textData}) {

    const [Settingwidth, setSettingWidth] = useState(0);
    const [videoCallwidth, setVideoCallWidth] = useState(0);
    const [openCodeLinkBox, setOpenCodeLinkBox] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);

    const roomId = useParams().id;

    useEffect(() => {
        setSettingWidth(0);
        setVideoCallWidth(0);
    }, [])

    const handleDownload = () => {
        const blob = new Blob([textData], { type: 'text/plain' });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }



    return (
        <div className=' flex w-auto'>

            <div className=' w-auto text-white h-svh  bg-dark-grayish-blue  border-dark-blue-black border-t-2 text-center  text-xl z-50'>
                <div className=''>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4 hover:cursor-pointer' onClick={() => setOpenCodeLinkBox(true)}>
                        <IoMdLink />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer ' onClick={() => setVideoCallWidth(320)}>
                        <IoMdVideocam />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer' onClick={handleDownload} >
                        <IoMdDownload />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer' onClick={() => setSettingWidth(320)} >
                        <IoMdSettings />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <MdError onClick={ () => setOpenFeedback(true)} />
                    </div>
                </div>

            </div>
            <div>
                <Setting width={Settingwidth} setWidth={setSettingWidth} />
            </div>
            <div>
                <VideoCall width={videoCallwidth} setWidth={setVideoCallWidth} ></VideoCall>
            </div>
            <div>
                {openCodeLinkBox && <ShareLink endUrl={roomId} setOpenCodeLinkBox={setOpenCodeLinkBox} />}
            </div>
            <div>
                {openFeedback && <Feedback setOpenFeedback={setOpenFeedback} />}
            </div>

        </div>
    )
}

export default Sidebar