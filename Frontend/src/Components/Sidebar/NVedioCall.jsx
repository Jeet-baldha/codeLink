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
    

    // Agora ID
    const AgoraAppId = "e40e8edd38c147f59d5f65fa2def2f93";


    const channelName = useParams().id; // Extract the unique room ID from the URL


    // set the connection state
    const [activeConnection, setActiveConnection] = useState(false);

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
    

    const style = {
        width: width + 'px',
    };


    const handleCloseBtn = () => {
        setWidth(0);
    };



    return (
        <div style={style} className={`text-white bg-dark-blue-black duration-200 overflow-auto h-full`}>
            <div className='flex py-2 items-center justify-between px-5 pt-10'>
                <h1 className='text-2xl font-bold text-light-bluish-green'>Video Cam</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl' onClick={handleCloseBtn} />
            </div>
            <div className='p-5 overflow-auto' >
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
                            <div key={user.uid} className='bg-dark-grayish-blue rounded-sm w-full aspect-video mt-5'>
                                <RemoteUser user={user} />
                            </div>
                        ))
                    }
                
            </div>
            <div className='  z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black text-white py-3 outline-1 border-y-2 border-gray-500'>
                <button onClick={() => setMic(!micOn)} className='hover:cursor-pointer' disabled={!activeConnection}>
                    {micOn ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button onClick={() => setCamera(!cameraOn)} className='hover:cursor-pointer text-3xl' disabled={!activeConnection} >
                    {cameraOn ? <MdVideocam className='text-4xl' /> : <MdVideocamOff className='text-4xl' />}
                </button>
                <IoMdCall className={` ${activeConnection ? ' bg-red-700 ' :  'bg-green-700' } rounded-full hover:cursor-pointer`}  onClick={ () => setActiveConnection(!activeConnection)}/>
            </div>
        </div>
    );
}

export default NVideoCall;
