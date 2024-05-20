import React, { useState, useRef, useEffect } from 'react'
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff, } from 'react-icons/io'
import { MdVideocamOff, MdVideocam } from 'react-icons/md';


function VideoCall({ width, setWidth }) {


    const style = {
        width: width + 'px',
    }

    const [mystream, setmystream] = useState(null);
    const [videoswitch, setvideo] = useState(true);
    const [audioswitch, setaudio] = useState(true);
    const [videoBtn, setvideobtn] = useState(false);

    const myvideo = useRef(null);


    useEffect(() => {
        if (videoBtn) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    myvideo.current.srcObject = stream;
                    myvideo.current.autoplay = true;
                    myvideo.current.muted = false;
                    setmystream(stream);
                    setaudio(true);
                    setvideo(true);
                });
        }
        else{
            mystream && mystream.getTracks().forEach((track) => track.stop());
            setaudio(false);
            setvideo(false);
            console.log('no hek')
        }

    }, [videoBtn])

    useEffect(() => {
        if(mystream && mystream.active){
            setaudio(true);
            setvideo(true);
            console.log(mystream);
            console.log('hek')
        }
    },[]);

    const handleWebCam = () => {

        setvideobtn(!videoBtn);

    }

    const handleVideo = () => {
        if (videoswitch) {
            setvideo(false);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" &&
                    track.kind === "video") {
                    track.enabled = false;
                }
            });
        } else {
            setvideo(true);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" &&
                    track.kind === "video") {
                    track.enabled = true;
                }
            });
        }
    };
    const handleAudio = () => {
        if (audioswitch) {
            setaudio(false);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" &&
                    track.kind === "audio") {
                    track.enabled = false;
                }
            });
        } else {
            setaudio(true);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" &&
                    track.kind === "audio") {
                    track.enabled = true;
                }
            });
        }
    };

    const handleCloseBtn = () => {
        setWidth(0);
    }

    return (
        <div style={style} className={` text-white bg-dark-blue-black h-full pt-10 duration-200 overflow-auto `}>

            <div className=' text-center bg-black p-2'>
                <h1 className=' text-3xl text-white font-bold'> Avialable soon</h1>
            </div>
            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className=' text-2xl font-bold text-light-bluish-green ' >Video Cam</h1>
                <IoIosCloseCircle className=' hover:cursor-pointer text-2xl' onClick={handleCloseBtn} />
            </div>

            <div className=' p-5 flex flex-col gap-5 overflow-y-auto'>
                <div className=' bg-dark-grayish-blue rounded-sm w-full aspect-video' >
                    <video ref={myvideo} autoPlay muted className=''></video> 
                </div>
            </div>

            <div className=' sticky bottom-1 z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black  text-white py-3 outline-1'>

                <button onClick={handleAudio} className=' hover:cursor-pointer'  disabled={!videoBtn}>
                    {audioswitch ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button onClick={handleVideo} className=' hover:cursor-pointer text-3xl' disabled={!videoBtn}>
                    {videoswitch ? <MdVideocam className=' text-4xl' /> : <MdVideocamOff className=' text-4xl' />}
                </button>

                <IoMdCall className={` ${mystream ? 'bg-red-700' : 'bg-green-700'} rounded-full hover:cursor-pointer`} onClick={handleWebCam} />
            </div>

        </div>
    )
}

export default VideoCall