import React, { useEffect, useState } from 'react'
import bgv from '../Images/code-2858768_1280.png'
import Navbar from '../Components/Navbar.jsx'
import UseCaseCard from '../Components/UseCaseCard.jsx'
import LanguageCard from '../Components/LanguageCard.jsx'
import '../index.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();

    const [endurl,setendurl] = useState("");

    const handleClick = async () => {
        const result = await axios.get('http://localhost:3000/geturl');
        setendurl(result.data);  
    }
    
    useEffect(() => {
        endurl && navigate('/code/'+endurl);      
    },[endurl,navigate]);

    return (
        <div className=' text-white'>
            <div className='flex items-center'>
                <div className='py-52 px-20 bg-ba'>
                <h1 className=' text-5xl text-white font-bold '>Welcome to CodeLink: Your Real-Time Code Sharing Platform</h1>
                <h1 className=' py-5 text-xl'>Code together, in real-time, with anyone, anywhere</h1>
                <button className=' px-3 py-2 border-white border-2 rounded-sm mt-5 text-white' onClick={handleClick}>Share Now</button>
                <p  className=' pt-2 text-sm'>Share code for free.</p>
                </div>
                <div className=' p-20'>

                <img src={bgv} className=' grayscale-0'></img>
                </div>
            </div>

            <div className=' py-16 px-20'>
                <div>
                    <h1 className=' text-white text-5xl font-semibold text-center'>Why Code Link?</h1>
                    <h1 className=' text-white text-2xl text-justify py-5'>CodeLink is the ultimate platform for collaborating on code projects in real-time. Whether you're a developer, student, or team, CodeLink provides a seamless way to share code, discuss ideas, and work together instantly. Say goodbye to language barriers and hello to productive collaboration with CodeLink.</h1>
                </div>
            </div>
            <div className=' flex px-20 justify-between py-32'>
                <UseCaseCard />
                <UseCaseCard />
                <UseCaseCard />
            </div>

            <div className='   px-20 py-20'>
                <h1 className=' text-white text-3xl font-semibold pb-16 text-center'>
                    Supported Languages
                </h1>
                <div className=' grid grid-cols-8  gap-14   gap-y-10'>
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                <LanguageCard />
                </div>
            </div>
        </div>
    )
}

export default Home