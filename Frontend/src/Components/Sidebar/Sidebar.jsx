/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userSlice from '../../Store/UserSlice';
import { MdError } from "react-icons/md";
import { IoMdSettings, IoMdLink, IoMdDownload, IoMdVideocam, } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";
import Setting from '../Sidebar/Setting';
import VideoCall from '../Sidebar/VideoCall';
import ShareLink from '../Sidebar/ShareLink';
import Feedback from '../Sidebar/Feedback';
import NVideoCall from '../Sidebar/NVedioCall';
import fileExtensions from '../../Data/FileExtension';
import LeetCodeProblem from './LeetcodeProblemComponent/LeetCodeProblem';


function Sidebar({textData}) {

    const [Settingwidth, setSettingWidth] = useState(0);
    const [videoCallwidth, setVideoCallWidth] = useState(0);
    const [openCodeLinkBox, setOpenCodeLinkBox] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [leetCodeProblemWidth, setLeetCodeProblemWidth] = useState(0);
    const roomId = useParams().id;
    const selectedLanguage = useSelector( (state) => state.user.language);
    
    useEffect(() => {
        setSettingWidth(0);
        setVideoCallWidth(0);
        setLeetCodeProblemWidth(0);
    }, [])
    
    const handleDownload = () => {
        const blob = new Blob([textData], { type: 'text/plain' });
        
        const extension = fileExtensions.find( (language) => language.value === selectedLanguage).extension;
        console.log(extension);
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        a.download = Date.now().toString() + extension;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }



    return (
        <div className=' flex w-auto'>

            <div className=' w-auto text-white min-h-screen  bg-dark-grayish-blue  border-dark-blue-black border-t-2 text-center  text-xl z-50'>
                <div className=''>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4 hover:cursor-pointer' onClick={() => setOpenCodeLinkBox(!openCodeLinkBox)}>
                        <IoMdLink />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <SiLeetcode onClick={ () => setLeetCodeProblemWidth( leetCodeProblemWidth == 0 ? 480 : 0)} />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer ' onClick={() => setVideoCallWidth(videoCallwidth == 0 ? 320 : 0)}>
                        <IoMdVideocam />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer' onClick={handleDownload} >
                        <IoMdDownload />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer' onClick={() => setSettingWidth(Settingwidth == 0 ? 320 : 0)} >
                        <IoMdSettings />
                    </div>
                    <div className=' flex justify-center border-dark-blue-black border-b-2 p-4  hover:cursor-pointer'>
                        <MdError onClick={ () => setOpenFeedback(!openFeedback)} />
                    </div>
                </div>

            </div>
            <div>
                <Setting width={Settingwidth} setWidth={setSettingWidth} />
            </div>
            <div>
                <LeetCodeProblem width={leetCodeProblemWidth} setWidth={setLeetCodeProblemWidth} />
            </div>

            <div className=''>
                <NVideoCall width={videoCallwidth} setWidth={setVideoCallWidth} ></NVideoCall>
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