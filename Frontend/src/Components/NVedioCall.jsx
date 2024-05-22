import React, { useState, useRef, useEffect } from 'react';
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff } from 'react-icons/io';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Peer } from 'peerjs';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function NVideoCall({ width, setWidth }) {
    const style = {
        width: width + 'px',
    };

    const [mystream, setMystream] = useState(null);
    const [videoswitch, setVideoSwitch] = useState(true);
    const [audioswitch, setAudioSwitch] = useState(true);
    const [videoBtn, setVideoBtn] = useState(false);
    const [remotePeerId, setRemotePeerId] = useState(''); 
    const myVideoRef = useRef(null)

    const { id: roomID } = useParams(); // Extract the unique room ID from the URL
    const [peerId, setPeerId] = useState('');
    const peerInstance = useRef(null);
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on('open', (id) => {
            setPeerId(id)
            socket.emit('join-room',roomID);
            socket.emit('send-peer-id',roomID);
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia
                || navigator.webkitGetUserMedia
                || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.muted = false;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                    setVideoBtn(true);
                });
            });
        })
        peerInstance.current = peer;
    }, [])


    const callPeer = () => {
        console.log(remotePeerId);

        if(remotePeerId === ''){
            return
        }


        console.log(audioswitch, videoswitch);

            navigator.mediaDevices
            .getUserMedia({ video: videoswitch, audio: audioswitch })
            .then((stream) => {
                currentUserVideoRef.current.srcObject = stream;
                currentUserVideoRef.current.autoplay = true;
                currentUserVideoRef.current.muted = true;
                setMystream(stream);
                setVideoBtn(!videoBtn)
                currentUserVideoRef.current.play();

                const call = peerInstance.current.call(remotePeerId, stream);
    
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                    setVideoBtn(!videoBtn);
                });
            });
    };
    
    

    useEffect(() => {
        if (videoBtn) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    currentUserVideoRef.current.srcObject = stream;
                    currentUserVideoRef.current.autoplay = true;
                    currentUserVideoRef.current.muted = false;
                    setMystream(stream);
                    setAudioSwitch(true);
                    setVideoSwitch(true);
                });
        } else {
            console.log('no hek');
        }
    }, [videoBtn]);

    // useEffect(() => {
    //     if (mystream && mystream.active) {
    //         setAudioSwitch(true);
    //         setVideoSwitch(true);
    //         console.log(mystream);
    //         console.log('hek');
    //     }
    // }, []);

    const handleWebCam = () => {
        setVideoBtn(!videoBtn);
    };

    const handleVideo = () => {
        if (videoswitch) {
            setVideoSwitch(false);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === 'live' && track.kind === 'video') {
                    track.enabled = false;
                }
            });
        } else {
            setVideoSwitch(true);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === 'live' && track.kind === 'video') {
                    track.enabled = true;
                }
            });
        }

        callPeer();
    };
    const handleAudio = () => {
        if (audioswitch) {
            setAudioSwitch(false);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === 'live' && track.kind === 'audio') {
                    track.enabled = false;
                }
            });
        } else {
            setAudioSwitch(true);
            mystream.getTracks().forEach(function (track) {
                if (track.readyState === 'live' && track.kind === 'audio') {
                    track.enabled = true;
                }
            });
        }

        callPeer();
    };

    const handleCloseBtn = () => {
        setWidth(0);
    };

    return (
        <div style={style} className={`text-white bg-dark-blue-black h-full pt-10 duration-200 overflow-auto`}>
            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className='text-2xl font-bold text-light-bluish-green'>Video Cam</h1>
                <IoIosCloseCircle className='hover:cursor-pointer text-2xl' onClick={handleCloseBtn} />
            </div>
            <h1>Room ID: {roomID}</h1>
            <h2>My Peer ID: {peerId}</h2>
            <input type="text" id="peerIdInput" placeholder="Enter peer ID to call" />
            <button onClick={() => {
                const id = document.getElementById('peerIdInput').value;
                console.log(id);
                setRemotePeerId(id)
                callPeer(id);
            }}>Call Peer</button>
            <div className='p-5 flex flex-col gap-5 overflow-y-auto'>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    <video ref={remoteVideoRef} autoPlay muted className=''></video>
                </div>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    <video ref={currentUserVideoRef} autoPlay muted className=''></video>
                </div>
            </div>
            <div className='sticky bottom-1 z-50 shadow-lg text-3xl flex justify-between px-10 bg-dark-blue-black text-white py-3 outline-1'>
                <button onClick={handleAudio} className='hover:cursor-pointer' disabled={!videoBtn}>
                    {audioswitch ? <IoIosMic /> : <IoIosMicOff />}
                </button>
                <button onClick={handleVideo} className='hover:cursor-pointer text-3xl' disabled={!videoBtn} >
                    {videoswitch ? <MdVideocam className='text-4xl' /> : <MdVideocamOff className='text-4xl' />}
                </button>
                <IoMdCall className={` ${mystream ? 'bg-red-700' : 'bg-green-700'} rounded-full hover:cursor-pointer`} onClick={handleWebCam} />
            </div>
        </div>
    );
}

export default NVideoCall;
