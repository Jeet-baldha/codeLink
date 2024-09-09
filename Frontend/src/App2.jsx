import React from 'react'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import AgoraRTC, { AgoraRTCProvider,useRTCClient} from "agora-rtc-react";

function App2() {
    const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
    return (
        <>
            <div className=' h-screen'>
                <Navbar className= ' bg-dark-grayish-blue' />
                <AgoraRTCProvider client={agoraClient}>
                    <Outlet />
                </AgoraRTCProvider>
            </div>
        </>
    )
}

export default App2