import React, { useState } from 'react';
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff } from 'react-icons/io';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';

const SimpleVideoCall = ({ width, setWidth }) => {
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    const style = {
        width: width + 'px',
    };

    const handleCloseBtn = () => {
        setWidth(0);
    };

    return (
        <div style={style} className={`text-white bg-card/80 backdrop-blur duration-200 overflow-auto h-full`}>
            <div className='flex py-2 items-center justify-between px-5 pt-10'>
                <h1 className='text-2xl font-bold text-white'>Video Cam</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl text-white' onClick={handleCloseBtn} />
            </div>
            <div className='p-5 overflow-auto'>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video flex items-center justify-center'>
                    <div className='text-center'>
                        <div className='text-4xl mb-4'>📹</div>
                        <p className='text-lg'>Video call feature</p>
                        <p className='text-sm text-muted-foreground'>Coming soon...</p>
                    </div>
                </div>
            </div>
            <div className='z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black text-white py-3 outline-1 border-y-2 border-gray-500'>
                <button onClick={() => setMic(!micOn)} className='hover:cursor-pointer' disabled={!isConnected}>
                    {micOn ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button onClick={() => setCamera(!cameraOn)} className='hover:cursor-pointer text-3xl' disabled={!isConnected}>
                    {cameraOn ? <MdVideocam className='text-4xl' /> : <MdVideocamOff className='text-4xl' />}
                </button>
                <IoMdCall className={`${isConnected ? 'bg-red-700' : 'bg-green-700'} rounded-full hover:cursor-pointer`} onClick={() => setIsConnected(!isConnected)} />
            </div>
        </div>
    );
};

export default SimpleVideoCall; 