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

// Coder-style names generator
const coderNames = [
    'CodeNinja', 'ByteMaster', 'DevGuru', 'SyntaxHero', 'PixelWizard',
    'BugHunter', 'StackOverflow', 'GitMaster', 'DebugKing', 'AlgorithmPro',
    'CodeCraft', 'BinaryBoss', 'ScriptSage', 'DataDragon', 'CloudChampion',
    'FrontendFury', 'BackendBoss', 'FullStack', 'ReactRanger', 'NodeNinja',
    'PythonPro', 'JavaJedi', 'SwiftSage', 'KotlinKing', 'RustRanger',
    'TypeScript', 'JavaScript', 'CSSMaster', 'HTMLHero', 'SQLSage'
];

const getRandomCoderName = () => {
    return coderNames[Math.floor(Math.random() * coderNames.length)];
};


function NVideoCall({ width, setWidth }) {
    

    // Agora ID
    const AgoraAppId = "e40e8edd38c147f59d5f65fa2def2f93";


    const channelName = useParams().id; // Extract the unique room ID from the URL


    // set the connection state
    const [activeConnection, setActiveConnection] = useState(false);

    // track the mic/video state - Turn on Mic and Camera On
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);

    // store random names for remote users
    const [remoteUserNames, setRemoteUserNames] = useState({});
    
    // track if call was ever started
    const [hasStartedCall, setHasStartedCall] = useState(false);

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
    
    // Assign random names to new remote users
    useEffect(() => {
        const newNames = {};
        remoteUsers.forEach(user => {
            if (!remoteUserNames[user.uid]) {
                newNames[user.uid] = getRandomCoderName();
            }
        });
        if (Object.keys(newNames).length > 0) {
            setRemoteUserNames(prev => ({ ...prev, ...newNames }));
        }
    }, [remoteUsers, remoteUserNames]);

    const style = {
        width: width + 'px',
    };


    const handleCloseBtn = () => {
        setWidth(0);
    };



    return (
        <div style={style} className={`text-white bg-card/80 backdrop-blur duration-200 overflow-auto h-full`}>
            <div className='flex py-2 items-center justify-between px-5 pt-10'>
                <h1 className='text-2xl font-bold text-white'>Video Call</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl text-white hover:text-red-400 transition-colors' onClick={handleCloseBtn} />
            </div>
            
            <div className='p-5 overflow-auto'>
                {/* Local Video */}
                <div className='mb-4'>
                    <h3 className='text-sm text-gray-400 mb-2 font-medium'>You</h3>
                    <div className='bg-card/60 backdrop-blur rounded-lg w-full aspect-video border border-border/50 overflow-hidden shadow-lg relative'>
                        {activeConnection ? (
                            <>
                                <LocalUser
                                    audioTrack={localMicrophoneTrack}
                                    videoTrack={localCameraTrack}
                                    cameraOn={cameraOn}
                                    micOn={micOn}
                                    playAudio={micOn}
                                    playVideo={cameraOn}
                                    className=''
                                />
                                
                                {/* Camera Off Overlay */}
                                {!cameraOn && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-gray-900/80'>
                                        <div className='text-center'>
                                            <MdVideocamOff className='text-4xl mx-auto mb-2 text-gray-400' />
                                            <p className='text-gray-400 text-sm'>Camera off</p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Status Indicators */}
                                <div className='absolute top-3 right-3 flex gap-1'>
                                    {!cameraOn && (
                                        <div className='bg-gray-800/80 rounded-full p-1'>
                                            <MdVideocamOff className='text-gray-400 text-sm' />
                                        </div>
                                    )}
                                    {!micOn && (
                                        <div className='bg-gray-800/80 rounded-full p-1'>
                                            <IoIosMicOff className='text-gray-400 text-sm' />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Call Not Active State */
                            <div className='absolute inset-0 flex items-center justify-center bg-gray-800/60'>
                                <div className='text-center'>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                                        hasStartedCall ? 'bg-gray-600' : 'bg-gradient-to-r from-primary to-accent'
                                    }`}>
                                        <IoMdCall className='text-xl text-white' />
                                    </div>
                                    <p className='text-gray-400 text-sm'>
                                        {hasStartedCall ? 'Call ended' : 'Ready to call'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Remote Users - Only show when call is active */}
                {activeConnection && remoteUsers.map((user) => (
                    <div key={user.uid} className='mb-4'>
                        <h3 className='text-sm text-gray-400 mb-2 font-medium'>
                            {remoteUserNames[user.uid] || 'Anonymous'}
                        </h3>
                        <div className='bg-card/60 backdrop-blur rounded-lg w-full aspect-video border border-border/50 overflow-hidden shadow-lg relative'>
                            <RemoteUser 
                                user={user} 
                                className='w-full h-full object-cover'
                            />
                            
                            {/* Camera Off Overlay */}
                            {!user.hasVideo && (
                                <div className='absolute inset-0 flex items-center justify-center bg-gray-900/80'>
                                    <div className='text-center'>
                                        <MdVideocamOff className='text-4xl mx-auto mb-2 text-gray-400' />
                                        <p className='text-gray-400 text-sm'>Camera off</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Status Indicators */}
                            <div className='absolute top-3 right-3 flex gap-1'>
                                {!user.hasVideo && (
                                    <div className='bg-gray-800/80 rounded-full p-1'>
                                        <MdVideocamOff className='text-gray-400 text-sm' />
                                    </div>
                                )}
                                {!user.hasAudio && (
                                    <div className='bg-gray-800/80 rounded-full p-1'>
                                        <IoIosMicOff className='text-gray-400 text-sm' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* No Remote Users Message */}
                {remoteUsers.length === 0 && activeConnection && (
                    <div className='text-center py-8'>
                        <div className='bg-card/40 backdrop-blur rounded-lg p-6 border border-border/30'>
                            <div className='w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                                <IoMdCall className='text-2xl text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>Waiting for others...</h3>
                            <p className='text-gray-400 text-sm'>Share this room link with others to start the call</p>
                        </div>
                    </div>
                )}

                {/* Call Not Started Message */}
                {!activeConnection && !hasStartedCall && (
                    <div className='text-center py-8'>
                        <div className='bg-card/40 backdrop-blur rounded-lg p-6 border border-border/30'>
                            <div className='w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                                <IoMdCall className='text-2xl text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>Ready to Call</h3>
                            <p className='text-gray-400 text-sm'>Click the call button to start a video call</p>
                        </div>
                    </div>
                )}

                {/* Call Ended Message */}
                {!activeConnection && hasStartedCall && (
                    <div className='text-center py-8'>
                        <div className='bg-card/40 backdrop-blur rounded-lg p-6 border border-border/30'>
                            <div className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <IoMdCall className='text-2xl text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>Call Ended</h3>
                            <p className='text-gray-400 text-sm'>Click the call button to start a new call</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Control Bar */}
            <div className='z-50 shadow-lg text-2xl flex justify-between px-8 bg-card/60 backdrop-blur text-white py-3 border-t border-border/50 sticky bottom-0'>
                <button 
                    onClick={() => setMic(!micOn)} 
                    className={`hover:cursor-pointer p-2 rounded-full transition-all duration-200 ${
                        micOn 
                            ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' 
                            : 'text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    }`} 
                    disabled={!activeConnection}
                >
                    {micOn ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                
                <button 
                    onClick={() => setCamera(!cameraOn)} 
                    className={`hover:cursor-pointer p-2 rounded-full transition-all duration-200 ${
                        cameraOn 
                            ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' 
                            : 'text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    }`} 
                    disabled={!activeConnection}
                >
                    {cameraOn ? <MdVideocam className='text-3xl' /> : <MdVideocamOff className='text-3xl' />}
                </button>
                
                <button 
                    onClick={() => {
                        if (!activeConnection) {
                            setHasStartedCall(true);
                        }
                        setActiveConnection(!activeConnection);
                    }}
                    className={`p-2 rounded-full hover:cursor-pointer transition-all duration-200 ${
                        activeConnection 
                            ? 'bg-red-600 hover:bg-red-700 shadow-lg' 
                            : 'bg-green-600 hover:bg-green-700 shadow-lg'
                    }`}
                >
                    <IoMdCall className='text-xl' />
                </button>
            </div>
        </div>
    );
}

export default NVideoCall;
