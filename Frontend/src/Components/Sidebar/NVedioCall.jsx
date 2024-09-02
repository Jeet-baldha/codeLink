import React, { useState, useRef, useEffect } from 'react';
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff } from 'react-icons/io';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from 'agora-rtc-react'


function NVideoCall({ width, setWidth }) {
    // const socket = io('http://localhost:3000');

    const AgoraAppId = "xxx";

    const channelName = useParams().id; // Extract the unique room ID from the URL


    // set the connection state
    const [activeConnection, setActiveConnection] = useState(true);

    // track the mic/video state - Turn on Mic and Camera On
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);

    // get local video and mic tracks
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    // to leave the call

    // Join the channel
    useJoin(
        {
            appid: AgoraAppId,
            channel: channelName,
            token: null,
        },
        activeConnection,
    );

    
    usePublish([localMicrophoneTrack, localCameraTrack]);

    //remote users
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    // play the remote user audio tracks
    audioTracks.forEach((track) => track.play());
    
    useEffect (() => {
        console.log(remoteUsers.length);
    })

    const style = {
        width: width + 'px',
    };


    const handleCloseBtn = () => {
        setWidth(0);
    };



    return (
        <div style={style} className={`text-white bg-dark-blue-black min-h-screen pt-10 duration-200 overflow-auto border-red-500 border-2`}>
            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className='text-2xl font-bold text-light-bluish-green'>Video Cam</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl' onClick={handleCloseBtn} />
            </div>
            <div className='p-5 flex flex-col gap-5'>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    <LocalUser
                        audioTrack={localMicrophoneTrack}
                        videoTrack={localCameraTrack}
                        cameraOn={cameraOn}
                        micOn={micOn}
                        playAudio={micOn}
                        playVideo={cameraOn}
                        className=''
                    />
                </div>
                    {
                        remoteUsers.map((user) => (
                            <div key={user.uid} className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                                <RemoteUser user={user} />
                            </div>
                        ))
                    }
                
            </div>
            <div className='z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black text-white py-3 outline-1 border-2 border-green-500'>
                <button onClick={() => setMic(!micOn)} className='hover:cursor-pointer'>
                    {micOn ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button onClick={() => setCamera(!cameraOn)} className='hover:cursor-pointer text-3xl' >
                    {cameraOn ? <MdVideocam className='text-4xl' /> : <MdVideocamOff className='text-4xl' />}
                </button>
                <IoMdCall className={` ${activeConnection ? ' bg-red-700 ' :  'bg-green-700' } rounded-full hover:cursor-pointer`}  onClick={ () => setActiveConnection(!activeConnection)}/>
            </div>
        </div>
    );
}

export default NVideoCall;
