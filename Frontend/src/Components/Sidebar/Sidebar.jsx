/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import { IoMdSettings, IoMdLink, IoMdDownload, IoMdVideocam, } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";
import Setting from '../Sidebar/Setting';
import ShareLink from '../Sidebar/ShareLink';
import Feedback from '../Sidebar/Feedback';
import VideoCallWrapper from '../Sidebar/VideoCallWrapper';
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

            <div className=' w-auto text-white min-h-screen bg-card/80 backdrop-blur border-border border-r text-center text-xl z-50'>
                <div className=''>
                    <div className=' flex justify-center border-border border-b p-4 hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group' onClick={() => setOpenCodeLinkBox(!openCodeLinkBox)}>
                        <IoMdLink className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                    </div>
                    <div className=' flex justify-center border-border border-b p-4  hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group'>
                        <SiLeetcode className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" onClick={ () => setLeetCodeProblemWidth( leetCodeProblemWidth == 0 ? 480 : 0)} />
                    </div>
                    <div className=' flex justify-center border-border border-b p-4  hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group' onClick={() => setVideoCallWidth(videoCallwidth == 0 ? 320 : 0)}>
                        <IoMdVideocam className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                    </div>
                    <div className=' flex justify-center border-border border-b p-4  hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group' onClick={handleDownload} >
                        <IoMdDownload className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                    </div>
                    <div className=' flex justify-center border-border border-b p-4  hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group' onClick={() => setSettingWidth(Settingwidth == 0 ? 320 : 0)} >
                        <IoMdSettings className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                    </div>
                    <div className=' flex justify-center border-border border-b p-4  hover:cursor-pointer hover:bg-accent/10 hover:scale-105 transition-all duration-200 group'>
                        <MdError className="text-white group-hover:text-accent group-hover:scale-110 transition-all duration-200" onClick={ () => setOpenFeedback(!openFeedback)} />
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
                <VideoCallWrapper width={videoCallwidth} setWidth={setVideoCallWidth} />
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