import React, { useState, useRef, useEffect } from 'react';
import { IoIosCloseCircle, IoIosMic, IoMdCall, IoIosMicOff } from 'react-icons/io';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Peer } from 'peerjs';
import axios from 'axios';
import io from 'socket.io-client';


function NVideoCall({ width, setWidth }) {
    // const socket = io('http://localhost:3000');
    const style = {
        width: width + 'px',
    };

    const [mystream, setMystream] = useState(null);
    const [videoswitch, setVideoSwitch] = useState(true);
    const [audioswitch, setAudioSwitch] = useState(true);
    const [videoBtn, setVideoBtn] = useState(false);
    const { id: roomID } = useParams(); // Extract the unique room ID from the URL
    const [peerId, setPeerId] = useState('');
    const peerInstance = useRef(null);
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [remoteStreamData, setRemoteStreamData] = useState([])

    const peer = new Peer();
    useEffect(() => {
        // Ensure peer is initialized properly before sending 'sendPeer' event
        if (peer && roomID) {
            peer.on('open', (id) => {
                setPeerId(id);
                // socket.emit('sendPeer', roomID, id);
            });
    
            peer.on('call', (call) => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((mediaStream) => {
                        currentUserVideoRef.current.srcObject = mediaStream;
                        currentUserVideoRef.current.muted = false;
                        currentUserVideoRef.current.play();
                        call.answer(mediaStream);
                        call.on('stream', (remoteStream) => {
                            remoteVideoRef.current.srcObject = remoteStream;
                            setVideoBtn(true);
                        });
                    })
                    .catch((error) => {
                        console.error('Error accessing media devices:', error);
                    });
            });
    
            peerInstance.current = peer;
        }
    }, [roomID]);


    // useEffect(() => {
    //     // Event listener for 'sendPeer' event
    //     const handleSendPeer = (peerId) => {
    //         console.log('Received peerId:', peerId);
    //         // Handle peerId as needed
    //     };

    //     socket.on('codeChange', (newCode) => {
    //         console.log(newCode);
    //     });
    
    //     // Register event listener
    //     socket.on('sendPeer', handleSendPeer);
    
    //     // Clean up: Unregister event listener
    //     return () => {
    //         socket.off('sendPeer', handleSendPeer);
    //     };
    // }, [socket]);

 

    const callPeer = (remotePeerId) => {
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

                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream;
                    setRemoteStreamData([...remoteStreamData, remoteStream]);
                    setVideoBtn(true);
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
        }
    }, [videoBtn]);


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
    };

    const handleCloseBtn = () => {
        setWidth(0);
    };


    useEffect(() => {
        remoteStreamData.map((stream,index) => {
            const videoElement = document.getElementById(`video-${index}`);
            console.log(stream);
        if (videoElement) {
            videoElement.srcObject = stream;
        }
        })
    },[remoteStreamData])

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
                const remotePeerId = document.getElementById('peerIdInput').value;
                callPeer(remotePeerId);
            }}>Call Peer</button>
            <div className='p-5 flex flex-col gap-5 overflow-y-auto'>
                {/* <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    {remoteStreamData.map((strem, index) => {
                        <video
                            key={index}
                            id={`video-${index}`}
                            autoPlay
                            muted
                        />
                    })}
                </div> */}
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    <video ref={currentUserVideoRef} autoPlay muted className=''></video>
                </div>
                <div className='bg-dark-grayish-blue rounded-sm w-full aspect-video'>
                    <video ref={remoteVideoRef} autoPlay muted className=''></video>
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
