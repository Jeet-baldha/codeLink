import React, { useState, useRef, useEffect } from 'react';
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff } from 'react-icons/io';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';

const BasicVideoCall = ({ width, setWidth }) => {
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const style = {
        width: width + 'px',
    };

    const handleCloseBtn = () => {
        // Stop all tracks when closing
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setWidth(0);
    };

    // Initialize camera stream
    useEffect(() => {
        let mediaStream = null;
        
        const startStream = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: cameraOn, 
                    audio: micOn 
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.log('Error accessing camera:', err);
            }
        };

        if (width > 0) {
            startStream();
        }

        // Cleanup function
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [width, cameraOn, micOn]);

    return (
        <div style={style} className={`text-white bg-card/80 backdrop-blur duration-200 overflow-auto h-full`}>
            <div className='flex py-2 items-center justify-between px-5 pt-10'>
                <h1 className='text-2xl font-bold text-white'>Video Cam</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl text-white' onClick={handleCloseBtn} />
            </div>
            <div className='p-5 overflow-auto'>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video relative'>
                    {cameraOn ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className='w-full h-full object-cover rounded-sm'
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-800 rounded-sm'>
                            <div className='text-center'>
                                <MdVideocamOff className='text-6xl mx-auto mb-4 text-gray-400' />
                                <p className='text-gray-400'>Camera is off</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black text-white py-3 outline-1 border-y-2 border-gray-500'>
                <button 
                    onClick={() => {
                        setMic(!micOn);
                        // Update stream audio track
                        if (stream) {
                            const audioTrack = stream.getAudioTracks()[0];
                            if (audioTrack) {
                                audioTrack.enabled = !micOn;
                            }
                        }
                    }} 
                    className={`hover:cursor-pointer p-2 rounded transition-colors ${micOn ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`} 
                >
                    {micOn ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button 
                    onClick={() => {
                        setCamera(!cameraOn);
                        // Update stream video track
                        if (stream) {
                            const videoTrack = stream.getVideoTracks()[0];
                            if (videoTrack) {
                                videoTrack.enabled = !cameraOn;
                            }
                        }
                    }} 
                    className={`hover:cursor-pointer p-2 rounded transition-colors ${cameraOn ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`} 
                >
                    {cameraOn ? <MdVideocam className='text-4xl' /> : <MdVideocamOff className='text-4xl' />}
                </button>
                <button 
                    onClick={() => {
                        setIsConnected(!isConnected);
                        if (!isConnected) {
                            // Start call - show notification
                            alert('Call started! (This is a demo - no actual call connection)');
                        } else {
                            // End call
                            alert('Call ended!');
                        }
                    }} 
                    className={`p-2 rounded-full hover:cursor-pointer transition-colors ${isConnected ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'}`}
                >
                    <IoMdCall />
                </button>
            </div>
        </div>
    );
};

export default BasicVideoCall; 